import pino from 'pino';
import sanitizeFilename from 'sanitize-filename';
import fs, { mkdirSync } from 'fs';
import path from 'path';
import fetch, { Response } from 'node-fetch';
import delay from 'delay';

import { LoggerLevel, DEFAULT_LOGGER_OPTIONS } from './logger';
import {
  DownloadPlan,
  DownloadPlanItemType,
  hasKey,
  isDownloadPlanItemAudio,
  isDownloadPlanItemText,
  pathExists,
  pathIsDir,
  pathIsRw,
} from './utils';
import { promisify } from 'util';
import { pipeline } from 'stream';
import api from './api';

type MainParams = {
  lang: string;
  courseId: number;
  directory?: string;
  apiKey: string;
  logLevel: LoggerLevel;
  dryRun: boolean;
};

const FILE_EXT_TEXT = '.txt';

export async function main(params: MainParams) {
  const { lang, courseId, directory, apiKey, logLevel, dryRun } = params;
  const logger = pino({ ...DEFAULT_LOGGER_OPTIONS, level: logLevel });

  function ensureDir(path: string) {
    if (pathExists(path)) {
      if (!pathIsDir(path)) throw new Error(`Download path "${path}" is not a directory`);
      if (!pathIsRw(path)) throw new Error(`Download path "${path}" is not readable or writable`);
      return;
    }
    mkdirSync(path);
    logger.info(`Created directory: "${path}"`);
  }

  if (dryRun) {
    logger.warn('--------------------');
    logger.warn('Dry-run mode enabled');
    logger.warn('--------------------');
  }

  logger.info(`Language: ${lang}`);
  try {
    logger.info(`Fetching course [${courseId}] data`);
    const course = await api.fetchCourse(apiKey, { lang, id: courseId });
    // Print some info about the course
    logger.info(`Course title: ${course.title}`);
    logger.info(
      `Lessons: ${course.lessonsCount}${
        course.lessonsCount !== course.lessons.length ? ` (${course.lessons.length})` : ''
      }`,
    );
    const outputPath = path.resolve(directory ?? `${lang}_${course.pk}_${sanitize(course.title)}`);
    logger.info(`Download path: "${outputPath}"${directory == null ? ' (auto detected)' : ''}`);
    if (!dryRun) ensureDir(outputPath);

    // Now we can download all the files from the collection.

    // We will take file by file, fetching its content and writing in to the output dir.
    // The naming scheme should be:
    //   lang + course id + lesson number + lesson title + extension
    // so that a user could save different lessons in one directory and still have them properly sorted.

    // A utility function to download files
    function downloadFile(url: string, path: string) {
      return new Promise(async (resolve) => {
        const fileStream = fs.createWriteStream(path);
        function deleteFile() {
          return new Promise((r) =>
            fileStream.close(() => {
              fs.unlinkSync(path);
              r(1);
            }),
          );
        }
        let res: Response | null = null;
        let retriesLeft = 3;
        let success: boolean = false;
        while (retriesLeft > 0 && !success) {
          try {
            res = await fetch(url);
            success = true;
          } catch (err) {
            if (hasKey(err, 'message') && typeof err.message === 'string') {
              logger.warn(err.message);
            }
            await delay(1000);
            retriesLeft--;
            if (retriesLeft > 0) {
              logger.info('Retrying...');
            }
          }
        }
        if (!success && retriesLeft === 0) {
          await deleteFile();
        } else {
          if (res != null && res.body != null) {
            await promisify(pipeline)(res.body, fileStream);
            resolve(1);
          } else {
            logger.warn('Received no data, skipping');
            await deleteFile();
            resolve(1);
          }
        }
      });
    }

    logger.info(`Starting download`);

    // Calc max digits
    const lessonDigitsCount = (Math.log(course.lessons.length) * Math.LOG10E + 1) | 0;

    // Retrieve lessons

    const downloadPlan: DownloadPlan = [];

    for (let i = 0; i < course.lessons.length; i++) {
      const lesson = course.lessons[i];
      // Construct the name
      const extension = path.extname(lesson.audio);
      if (extension === '') {
        // Then we have problem as we don't know the codec.
        // TODO: guess the extension via http content and mime.
        logger.warn(`Audio file link doesn't have an extension, skipping it.`);
        logger.warn(`Link: "${lesson.audio}"`);
      }
      const lessonNum = `${(i + 1).toString().padStart(lessonDigitsCount, '0')}/${course.lessons.length}`;

      const fileNameDummy = `${lang}_${course.pk}_${sanitize(lessonNum)}_${sanitize(lesson.title)}_${sanitize(
        course.title,
      )}`;

      const fileNameAudio = `${fileNameDummy}${extension}`;
      const fileNameText = `${fileNameDummy}${FILE_EXT_TEXT}`;
      const filePathAudio = path.join(outputPath, fileNameAudio);
      const filePathText = path.join(outputPath, fileNameText);

      // Check if we have this audio file already
      if (pathExists(filePathAudio)) {
        // TODO: add an option to overwrite? E.g. --force|-f
        logger.info(`Skipping "${filePathAudio}" (already there).`);
      } else {
        downloadPlan.push({
          type: DownloadPlanItemType.AUDIO,
          lessonId: lesson.id,
          lessonNum,
          url: lesson.audio,
          title: lesson.title,
          filePath: filePathAudio,
        });
      }
      // Check if we have this text already
      if (pathExists(filePathText)) {
        // TODO: add an option to overwrite? E.g. --force|-f
        logger.info(`Skipping "${filePathText}" (already there).`);
      } else {
        downloadPlan.push({
          type: DownloadPlanItemType.TEXT,
          lessonId: lesson.id,
          lessonNum,
          title: lesson.title,
          filePath: filePathText,
        });
      }
    }

    if (downloadPlan.length !== 0) {
      for (let i = 0; i < downloadPlan.length; i++) {
        const item = downloadPlan[i];
        if (isDownloadPlanItemAudio(item)) {
          const { lessonId, lessonNum, url, title, filePath } = item;
          logger.info(`Downloading audio for lesson ${lessonNum}: "${title}" [id=${lessonId}]`);
          logger.debug(`URL: "${url}"`);
          if (!dryRun) await downloadFile(url, filePath);
        }
        if (isDownloadPlanItemText(item)) {
          // Retrieve the lesson from the API
          const { lessonId, lessonNum, title, filePath } = item;
          logger.info(`Retrieving text for lesson ${lessonNum}: "${title}" [id=${lessonId}]`);
          const lesson = await api.fetchLesson(apiKey, { lang, id: lessonId });
          // Fetch lesson text
          const text = lesson.tokenizedText.map((items) => items.map((item) => item.text).join('\n')).join('\n\n');
          if (!dryRun) fs.writeFileSync(filePath, text);
        }
      }
    } else {
      logger.info('There are no files to fetch.');
    }
  } catch (err) {
    if (hasKey(err, 'message') && typeof err.message === 'string') {
      logger.error(err.message);
    } else {
      console.error(err);
    }
  }
}

function sanitize(value: string) {
  return sanitizeFilename(value, {
    replacement: (s: string) => {
      if (s === '/') {
        return '-';
      } else {
        return '';
      }
    },
  });
}

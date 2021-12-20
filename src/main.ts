import pino from 'pino';
import sanitize from 'sanitize-filename';
import fs, { mkdirSync } from 'fs';
import path from 'path';
import fetch, { Response } from 'node-fetch';
import delay from 'delay';

import * as Runtime from '../api/runtime';
import * as Apis from '../api/apis';
import { LoggerLevel, DEFAULT_LOGGER_OPTIONS } from './logger';
import { hasKey, pathExists, pathIsDir, pathIsRw } from './utils';
import { promisify } from 'util';
import { pipeline } from 'stream';
import pEvent from 'p-event';

type MainParams = {
  lang: string;
  courseId: number;
  directory?: string;
  apiKey: string;
  logLevel: LoggerLevel;
};

export async function main(params: MainParams) {
  const { lang, courseId, directory, apiKey, logLevel } = params;
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

  logger.info(`Language: ${lang}`);
  try {
    logger.info(`Fetching course [${courseId}] data`);
    const req: Apis.LangCollectionsIdGetRequest = {
      lang: lang,
      id: courseId,
    };
    const configuration = new Runtime.Configuration({ apiKey: `Token ${apiKey}` });
    const apiItem = new Apis.DefaultApi(configuration);
    const course = await apiItem.langCollectionsIdGet(req);

    // Print some info about the course
    logger.info(`Course title: ${course.title}`);
    logger.info(
      `Lessons: ${course.lessonsCount}${
        course.lessonsCount !== course.lessons.length ? ` (${course.lessons.length})` : ''
      }`,
    );
    const outputPath = path.resolve(directory ?? sanitize(`${lang}-${course.pk}-${course.title}`));
    logger.info(`Download path: "${outputPath}"${directory == null ? ' (auto detected)' : ''}`);
    ensureDir(outputPath);

    // Now we can download all the files from the collection.

    // We will take file by file, fetching its content and writing in to the output dir.
    // The naming scheme should be:
    //   lang + course id + course title + number + extension
    // so that a user could save different lessons in one directory and still have them properly sorted.

    // A utility function to download files
    function downloadFile(url: string, path: string) {
      return new Promise(async (resolve, reject) => {
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

    logger.info('Starting download');

    // Calc max digits
    const lessonDigitsCount = (Math.log(course.lessons.length) * Math.LOG10E + 1) | 0;

    const downloadPlan: { url: string; filePath: string }[] = [];

    for (let i = 0; i < course.lessons.length; i++) {
      const url = course.lessons[i].audio;
      // Construct the name
      const extension = path.extname(url);
      if (extension === '') {
        // Then we have problem as we don't know the codec.
        // TODO: guess the extension via http content and mime.
        logger.warn(`Audio file link doesn't have an extension, skipping it.`);
        logger.warn(`Link: "${url}"`);
      }
      const fileName = `${lang}-${course.pk}-${(i + 1).toString().padStart(lessonDigitsCount, '0')}-${sanitize(
        course.title,
      )}${extension}`;
      const filePath = path.join(outputPath, fileName);

      // Check if we have this file already
      if (pathExists(filePath)) {
        // Option to overwrite?
        logger.info(`Skipping "${filePath}" (already there).`);
      } else {
        downloadPlan.push({ url, filePath });
      }
    }

    if (downloadPlan.length !== 0) {
      for (let i = 0; i < downloadPlan.length; i++) {
        const { url, filePath } = downloadPlan[i];
        logger.info(`Downloading "${filePath}"`);
        logger.debug(`URL: "${url}"`);
        await downloadFile(url, filePath);
      }
    } else {
      logger.info('There are no files to download.');
    }
  } catch (err) {
    if (hasKey(err, 'message') && typeof err.message === 'string') {
      logger.error(err.message);
    } else {
      console.error(err);
    }
  }
}

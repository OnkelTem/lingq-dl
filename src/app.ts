import fs, { Stats } from 'fs';
import yargs from 'yargs';
import findUp from 'find-up';
import { hideBin } from 'yargs/helpers';
import { readFileSync } from 'fs';
import { LoggerLevel, loggerLevels } from './logger';
import { main } from './main';

import fetch, { Headers, Request, Response } from 'node-fetch';

if (!globalThis.fetch) {
  // @ts-ignore
  globalThis.fetch = fetch;
  //   // @ts-ignore
  //   globalThis.Headers = Headers;
  //   // @ts-ignore
  //   globalThis.Request = Request;
  //   // @ts-ignore
  //   globalThis.Response = Response;
}

const API_KEY_FILENAME = '.lingq-dl.key';
const apiKeyFilePath = findUp.sync([API_KEY_FILENAME]);
const apiKeyFromFile = apiKeyFilePath != null ? readFileSync(apiKeyFilePath, 'utf8').trim() : undefined;

// function directoryExists(path: string) {
//   let info: Stats;
//   try {
//     info = fs.statSync(path);
//   } catch (err) {
//     throw new Error(`Directory ${path} not found.`);
//   }
//   if (!info.isDirectory()) {
//     throw new Error(`${path} is not a directory.`);
//   }
// }

const options = {
  apiKey: {
    alias: 't',
    description: `Your Lingq.com API key. Get it here: https://www.lingq.com/fr/accounts/apikey/. You can also put your API key in the '${API_KEY_FILENAME}' file.`,
    type: 'string',
  },
  dryRun: {
    alias: 'd',
    default: false,
    description: `Your Lingq.com API key. Get it here: https://www.lingq.com/fr/accounts/apikey/. You can also put your API key in the '${API_KEY_FILENAME}' file.`,
    type: 'boolean',
  },
} as const;
type OptionName = keyof typeof options;

yargs(hideBin(process.argv))
  .options(options)
  .demandCommand(1)
  .command(
    '$0 <lang> <courseId> [<directory>]',
    'the default download command',
    (yargs) =>
      yargs
        .positional('lang', {
          describe: 'Identifier of the course language: en, fr, etc',
          type: 'string',
          demandOption: true,
        })
        .positional('courseId', {
          describe: 'Identifier of a course you want to download',
          number: true,
          type: 'number',
          demandOption: true,
        })
        .positional('directory', {
          description: 'Target directory. Optional.',
          type: 'string',
        })
        .check((argv) => {
          if (argv.lang.length !== 2) {
            throw new Error(`Bad language code: ${argv.lang}`);
          }
          if (isNaN(argv.courseId)) {
            throw new Error(`Bad course id`);
          }
          // if (argv.directory != null) {
          //   directoryExists(argv.directory);
          // }
          const apiKey = argv.apiKey ?? apiKeyFromFile;
          if (apiKey == null || apiKey == '') {
            throw new Error(
              `Token cannot be empty. Either pass it via --token|-t param or put it in '${API_KEY_FILENAME}' file.`,
            );
          }
          return true;
        })
        .fail(function (msg, err, yargs) {
          //console.log(yargs.help());
          console.error('\n\x1b[31m%s\x1b[0m', msg);
          process.exit(1);
        })
        .usage('Usage: $0 [options] <course-id> [directory]')
        .example('$0 20000', 'download all audio from a course with id=20000')
        .count('verbose')
        .alias('v', 'verbose')
        .default('verbose', 0)
        .coerce('verbose', function (arg) {
          return getLoggerLevel(arg);
        }),
    async function (argv) {
      await main({
        lang: argv.lang,
        courseId: argv.courseId,
        directory: argv.directory,
        apiKey: (argv.apiKey ?? apiKeyFromFile)!,
        logLevel: argv.verbose!,
        dryRun: argv.dryRun,
      });
      process.exit(0);
    },
  )
  .help('h')
  .alias('h', 'help').argv;

function getLoggerLevel(count: number): LoggerLevel {
  // Zero amount of `-v` should result to 'info' log level, which corresponds to index = 3
  const index = count + 3;
  if (index > loggerLevels.length - 1) {
    return loggerLevels[loggerLevels.length - 1];
  } else {
    return loggerLevels[index];
  }
}

import { LoggerOptions as LoggerOptionsBase } from "pino";

export const loggerLevels = [
  "fatal",
  "error",
  "warn",
  "info",
  "debug",
  "trace",
] as const;
export type LoggerLevel = typeof loggerLevels[number];

export interface LoggerOptions extends Omit<LoggerOptionsBase, "level"> {
  level: LoggerLevel;
}

export function isEnvVar(envVar: any): boolean {
  return (
    envVar != null &&
    envVar !== "" &&
    envVar !== "false" &&
    envVar !== "0" &&
    envVar !== "none"
  );
}

export function isLoggerLevel(arg?: string): arg is LoggerLevel {
  return arg != null && loggerLevels.includes(arg as LoggerLevel);
}

export const DEFAULT_LOGGER_OPTIONS: LoggerOptions = {
  level: isLoggerLevel(process.env.LOGGER_LEVEL)
    ? process.env.LOGGER_LEVEL
    : "info",
  ...(isEnvVar(process.env.LOGGER_PRETTY) && {
    prettyPrint: {
      ignore: "pid,hostname",
      translateTime: "SYS:standard",
      // @ts-ignore
      singleLine: true,
    },
  }),
};

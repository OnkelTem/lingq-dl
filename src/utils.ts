// Sent by @webstrand
// Example: if (hasKeys(err, "message") && typeof err.message !== "undefined") ...
import fs, { Stats } from 'fs';

export function hasKeys<K extends PropertyKey>(o: unknown, ...keys: K[]): o is { [_ in K]: unknown } {
  if (typeof o !== 'object' || o === null) return false;
  for (const key of keys) {
    if (!(key in o)) return false;
  }
  return true;
}

// Sent by @webstrand
export function maybeHasKeys<K extends PropertyKey>(o: unknown, ...keys: K[]): o is { [_ in K]?: unknown } {
  return typeof o === 'object' && o !== null;
}

// My variations of the above functions but for a single key

export function hasKey<K extends PropertyKey>(o: unknown, key: K): o is { [_ in K]: unknown } {
  if (typeof o !== 'object' || o === null) return false;
  return key in o;
}

export function maybeHasKey<K extends PropertyKey>(o: unknown, key: K): o is { [_ in K]?: unknown } {
  return typeof o === 'object' && o !== null;
}

// Paths utils

export function pathExists(path: string) {
  try {
    fs.accessSync(path, fs.constants.F_OK);
  } catch {
    return false;
  }
  return true;
}

export function pathIsDir(path: string) {
  let stats: Stats;
  try {
    stats = fs.statSync(path);
  } catch (err) {
    throw new Error('Internal error: pathIsDir() is not existing paths only.');
  }
  return stats.isDirectory();
}

export function pathIsRw(path: string) {
  try {
    fs.accessSync(path, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
  } catch (err) {
    return false;
  }
  return true;
}

export enum DownloadPlanItemType {
  AUDIO = 'audio',
  TEXT = 'text',
}

export type DownloadPlanItem = {
  lessonId: number;
  lessonNum: string;
  title: string;
  filePath: string;
};

export type DownloadPlanItemAudio = DownloadPlanItem & {
  type: DownloadPlanItemType.AUDIO;
  url: string;
};

export function isDownloadPlanItemAudio(item: unknown): item is DownloadPlanItemAudio {
  return typeof item === 'object' && item != null && hasKey(item, 'type') && item.type === DownloadPlanItemType.AUDIO;
}

export type DownloadPlanItemText = DownloadPlanItem & {
  type: DownloadPlanItemType.TEXT;
};

export function isDownloadPlanItemText(item: unknown): item is DownloadPlanItemText {
  return typeof item === 'object' && item != null && hasKey(item, 'type') && item.type === DownloadPlanItemType.TEXT;
}

export type DownloadPlan = (DownloadPlanItemAudio | DownloadPlanItemText)[];

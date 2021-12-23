/* tslint:disable */
/* eslint-disable */
/**
 * Lingq.com API
 * HTTP API for lingq.com
 *
 * The version of the OpenAPI document: 0.0.1
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues, getByKey } from '../runtime';
import {
  CollectionAllOf,
  CollectionAllOfFromJSON,
  CollectionAllOfFromJSONTyped,
  CollectionAllOfToJSON,
} from './CollectionAllOf';
import {
  CollectionTeaser,
  CollectionTeaserFromJSON,
  CollectionTeaserFromJSONTyped,
  CollectionTeaserToJSON,
} from './CollectionTeaser';
import { LessonTeaser, LessonTeaserFromJSON, LessonTeaserFromJSONTyped, LessonTeaserToJSON } from './LessonTeaser';

/**
 *
 * @export
 * @interface Collection
 */
export interface Collection {
  /**
   *
   * @type {number}
   * @memberof Collection
   */
  pk: number;
  /**
   *
   * @type {string}
   * @memberof Collection
   */
  url: string;
  /**
   *
   * @type {string}
   * @memberof Collection
   */
  title: string;
  /**
   *
   * @type {string}
   * @memberof Collection
   */
  description: string;
  /**
   *
   * @type {string}
   * @memberof Collection
   */
  audio: string | null;
  /**
   *
   * @type {string}
   * @memberof Collection
   */
  image: string;
  /**
   *
   * @type {string}
   * @memberof Collection
   */
  imageUrl: string;
  /**
   *
   * @type {string}
   * @memberof Collection
   */
  originalImageUrl: string;
  /**
   *
   * @type {number}
   * @memberof Collection
   */
  completedRatio: number;
  /**
   *
   * @type {number}
   * @memberof Collection
   */
  completedTimes: number;
  /**
   *
   * @type {number}
   * @memberof Collection
   */
  lessonsCount: number;
  /**
   *
   * @type {number}
   * @memberof Collection
   */
  newWordsCount: number;
  /**
   *
   * @type {number}
   * @memberof Collection
   */
  difficulty: number;
  /**
   *
   * @type {string}
   * @memberof Collection
   */
  level: string;
  /**
   *
   * @type {number}
   * @memberof Collection
   */
  price: number;
  /**
   *
   * @type {string}
   * @memberof Collection
   */
  provider: string;
  /**
   *
   * @type {string}
   * @memberof Collection
   */
  providerImageUrl: string;
  /**
   *
   * @type {string}
   * @memberof Collection
   */
  sharedByName: string;
  /**
   *
   * @type {string}
   * @memberof Collection
   */
  sharedByImageUrl: string;
  /**
   *
   * @type {boolean}
   * @memberof Collection
   */
  sourceURLEnabled: boolean | null;
  /**
   *
   * @type {string}
   * @memberof Collection
   */
  sourceURL: string | null;
  /**
   *
   * @type {string}
   * @memberof Collection
   */
  tags: string;
  /**
   *
   * @type {string}
   * @memberof Collection
   */
  externalType: string | null;
  /**
   *
   * @type {number}
   * @memberof Collection
   */
  rosesCount: number;
  /**
   *
   * @type {boolean}
   * @memberof Collection
   */
  roseGiven: boolean;
  /**
   *
   * @type {string}
   * @memberof Collection
   */
  type: CollectionTypeEnum;
  /**
   *
   * @type {Array<LessonTeaser>}
   * @memberof Collection
   */
  lessons: Array<LessonTeaser>;
}

/**
 * @export
 * @enum {string}
 */
export enum CollectionTypeEnum {
  Collection = 'collection',
}

export function CollectionFromJSON(json: any): Collection {
  return CollectionFromJSONTyped(json, false);
}

export function CollectionFromJSONTyped(json: any, ignoreDiscriminator: boolean): Collection {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    pk: getByKey('Collection', json, 'pk', true, false),
    url: getByKey('Collection', json, 'url', true, false),
    title: getByKey('Collection', json, 'title', true, false),
    description: getByKey('Collection', json, 'description', true, false),
    audio: getByKey('Collection', json, 'audio', true, true),
    image: getByKey('Collection', json, 'image', true, false),
    imageUrl: getByKey('Collection', json, 'imageUrl', true, false),
    originalImageUrl: getByKey('Collection', json, 'originalImageUrl', true, false),
    completedRatio: getByKey('Collection', json, 'completedRatio', true, false),
    completedTimes: getByKey('Collection', json, 'completedTimes', true, false),
    lessonsCount: getByKey('Collection', json, 'lessonsCount', true, false),
    newWordsCount: getByKey('Collection', json, 'newWordsCount', true, false),
    difficulty: getByKey('Collection', json, 'difficulty', true, false),
    level: getByKey('Collection', json, 'level', true, false),
    price: getByKey('Collection', json, 'price', true, false),
    provider: getByKey('Collection', json, 'provider', true, false),
    providerImageUrl: getByKey('Collection', json, 'providerImageUrl', true, false),
    sharedByName: getByKey('Collection', json, 'sharedByName', true, false),
    sharedByImageUrl: getByKey('Collection', json, 'sharedByImageUrl', true, false),
    sourceURLEnabled: getByKey('Collection', json, 'sourceURLEnabled', true, true),
    sourceURL: getByKey('Collection', json, 'sourceURL', true, true),
    tags: getByKey('Collection', json, 'tags', true, false),
    externalType: getByKey('Collection', json, 'external_type', true, true),
    rosesCount: getByKey('Collection', json, 'rosesCount', true, false),
    roseGiven: getByKey('Collection', json, 'roseGiven', true, false),
    type: getByKey('Collection', json, 'type', true, false),
    lessons: (json['lessons'] as Array<any>).map(LessonTeaserFromJSON),
  };
}

export function CollectionToJSON(value?: Collection | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    pk: value.pk,
    url: value.url,
    title: value.title,
    description: value.description,
    audio: value.audio,
    image: value.image,
    imageUrl: value.imageUrl,
    originalImageUrl: value.originalImageUrl,
    completedRatio: value.completedRatio,
    completedTimes: value.completedTimes,
    lessonsCount: value.lessonsCount,
    newWordsCount: value.newWordsCount,
    difficulty: value.difficulty,
    level: value.level,
    price: value.price,
    provider: value.provider,
    providerImageUrl: value.providerImageUrl,
    sharedByName: value.sharedByName,
    sharedByImageUrl: value.sharedByImageUrl,
    sourceURLEnabled: value.sourceURLEnabled,
    sourceURL: value.sourceURL,
    tags: value.tags,
    external_type: value.externalType,
    rosesCount: value.rosesCount,
    roseGiven: value.roseGiven,
    type: value.type,
    lessons: (value.lessons as Array<any>).map(LessonTeaserToJSON),
  };
}

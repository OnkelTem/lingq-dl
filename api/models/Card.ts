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
import { CardsHint, CardsHintFromJSON, CardsHintFromJSONTyped, CardsHintToJSON } from './CardsHint';

/**
 *
 * @export
 * @interface Card
 */
export interface Card {
  /**
   *
   * @type {number}
   * @memberof Card
   */
  pk: number;
  /**
   *
   * @type {number}
   * @memberof Card
   */
  status: number;
  /**
   *
   * @type {Array<string>}
   * @memberof Card
   */
  tags?: Array<string>;
  /**
   *
   * @type {number}
   * @memberof Card
   */
  importance: number;
  /**
   *
   * @type {number}
   * @memberof Card
   */
  extendedStatus: number | null;
  /**
   *
   * @type {Array<string>}
   * @memberof Card
   */
  words: Array<string>;
  /**
   *
   * @type {Array<CardsHint>}
   * @memberof Card
   */
  hints: Array<CardsHint>;
  /**
   *
   * @type {string}
   * @memberof Card
   */
  term: string;
  /**
   *
   * @type {Date}
   * @memberof Card
   */
  srsDueDate: Date;
  /**
   *
   * @type {string}
   * @memberof Card
   */
  notes: string;
  /**
   *
   * @type {string}
   * @memberof Card
   */
  fragment: string;
}

export function CardFromJSON(json: any): Card {
  return CardFromJSONTyped(json, false);
}

export function CardFromJSONTyped(json: any, ignoreDiscriminator: boolean): Card {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    pk: getByKey('Card', json, 'pk', true, false),
    status: getByKey('Card', json, 'status', true, false),
    tags: getByKey('Card', json, 'tags', false, false),
    importance: getByKey('Card', json, 'importance', true, false),
    extendedStatus: getByKey('Card', json, 'extended_status', true, true),
    words: getByKey('Card', json, 'words', true, false),
    hints: (json['hints'] as Array<any>).map(CardsHintFromJSON),
    term: getByKey('Card', json, 'term', true, false),
    srsDueDate: new Date(json['srs_due_date']),
    notes: getByKey('Card', json, 'notes', true, false),
    fragment: getByKey('Card', json, 'fragment', true, false),
  };
}

export function CardToJSON(value?: Card | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    pk: value.pk,
    status: value.status,
    tags: value.tags,
    importance: value.importance,
    extended_status: value.extendedStatus,
    words: value.words,
    hints: (value.hints as Array<any>).map(CardsHintToJSON),
    term: value.term,
    srs_due_date: value.srsDueDate.toISOString(),
    notes: value.notes,
    fragment: value.fragment,
  };
}

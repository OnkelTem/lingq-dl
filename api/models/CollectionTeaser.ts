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

import { exists, mapValues } from '../runtime';
import {
    LessonTeaser,
    LessonTeaserFromJSON,
    LessonTeaserFromJSONTyped,
    LessonTeaserToJSON,
} from './';

/**
 * 
 * @export
 * @interface CollectionTeaser
 */
export interface CollectionTeaser {
    /**
     * 
     * @type {number}
     * @memberof CollectionTeaser
     */
    pk: number;
    /**
     * 
     * @type {string}
     * @memberof CollectionTeaser
     */
    url: string;
    /**
     * 
     * @type {string}
     * @memberof CollectionTeaser
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof CollectionTeaser
     */
    description: string;
    /**
     * 
     * @type {string}
     * @memberof CollectionTeaser
     */
    audio: string | null;
    /**
     * 
     * @type {string}
     * @memberof CollectionTeaser
     */
    image: string;
    /**
     * 
     * @type {string}
     * @memberof CollectionTeaser
     */
    imageUrl: string;
    /**
     * 
     * @type {string}
     * @memberof CollectionTeaser
     */
    originalImageUrl: string;
    /**
     * 
     * @type {number}
     * @memberof CollectionTeaser
     */
    completedRatio: number;
    /**
     * 
     * @type {number}
     * @memberof CollectionTeaser
     */
    completedTimes: number;
    /**
     * 
     * @type {number}
     * @memberof CollectionTeaser
     */
    lessonsCount: number;
    /**
     * 
     * @type {number}
     * @memberof CollectionTeaser
     */
    newWordsCount: number;
    /**
     * 
     * @type {number}
     * @memberof CollectionTeaser
     */
    difficulty: number;
    /**
     * 
     * @type {string}
     * @memberof CollectionTeaser
     */
    level: string;
    /**
     * 
     * @type {number}
     * @memberof CollectionTeaser
     */
    price: number;
    /**
     * 
     * @type {string}
     * @memberof CollectionTeaser
     */
    provider: string;
    /**
     * 
     * @type {string}
     * @memberof CollectionTeaser
     */
    providerImageUrl: string;
    /**
     * 
     * @type {string}
     * @memberof CollectionTeaser
     */
    sharedByName: string;
    /**
     * 
     * @type {string}
     * @memberof CollectionTeaser
     */
    sharedByImageUrl: string;
    /**
     * 
     * @type {boolean}
     * @memberof CollectionTeaser
     */
    sourceURLEnabled: boolean | null;
    /**
     * 
     * @type {string}
     * @memberof CollectionTeaser
     */
    sourceURL: string | null;
    /**
     * 
     * @type {string}
     * @memberof CollectionTeaser
     */
    tags: string;
    /**
     * 
     * @type {string}
     * @memberof CollectionTeaser
     */
    externalType: string | null;
    /**
     * 
     * @type {number}
     * @memberof CollectionTeaser
     */
    rosesCount: number;
    /**
     * 
     * @type {boolean}
     * @memberof CollectionTeaser
     */
    roseGiven: boolean;
    /**
     * 
     * @type {string}
     * @memberof CollectionTeaser
     */
    type: CollectionTeaserTypeEnum;
    /**
     * 
     * @type {Array<LessonTeaser>}
     * @memberof CollectionTeaser
     */
    lessons?: Array<LessonTeaser>;
}

/**
* @export
* @enum {string}
*/
export enum CollectionTeaserTypeEnum {
    Collection = 'collection'
}

export function CollectionTeaserFromJSON(json: any): CollectionTeaser {
    return CollectionTeaserFromJSONTyped(json, false);
}

export function CollectionTeaserFromJSONTyped(json: any, ignoreDiscriminator: boolean): CollectionTeaser {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'pk': json['pk'],
        'url': json['url'],
        'title': json['title'],
        'description': json['description'],
        'audio': json['audio'],
        'image': json['image'],
        'imageUrl': json['imageUrl'],
        'originalImageUrl': json['originalImageUrl'],
        'completedRatio': json['completedRatio'],
        'completedTimes': json['completedTimes'],
        'lessonsCount': json['lessonsCount'],
        'newWordsCount': json['newWordsCount'],
        'difficulty': json['difficulty'],
        'level': json['level'],
        'price': json['price'],
        'provider': json['provider'],
        'providerImageUrl': json['providerImageUrl'],
        'sharedByName': json['sharedByName'],
        'sharedByImageUrl': json['sharedByImageUrl'],
        'sourceURLEnabled': json['sourceURLEnabled'],
        'sourceURL': json['sourceURL'],
        'tags': json['tags'],
        'externalType': json['external_type'],
        'rosesCount': json['rosesCount'],
        'roseGiven': json['roseGiven'],
        'type': json['type'],
        'lessons': !exists(json, 'lessons') ? undefined : ((json['lessons'] as Array<any>).map(LessonTeaserFromJSON)),
    };
}

export function CollectionTeaserToJSON(value?: CollectionTeaser | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'pk': value.pk,
        'url': value.url,
        'title': value.title,
        'description': value.description,
        'audio': value.audio,
        'image': value.image,
        'imageUrl': value.imageUrl,
        'originalImageUrl': value.originalImageUrl,
        'completedRatio': value.completedRatio,
        'completedTimes': value.completedTimes,
        'lessonsCount': value.lessonsCount,
        'newWordsCount': value.newWordsCount,
        'difficulty': value.difficulty,
        'level': value.level,
        'price': value.price,
        'provider': value.provider,
        'providerImageUrl': value.providerImageUrl,
        'sharedByName': value.sharedByName,
        'sharedByImageUrl': value.sharedByImageUrl,
        'sourceURLEnabled': value.sourceURLEnabled,
        'sourceURL': value.sourceURL,
        'tags': value.tags,
        'external_type': value.externalType,
        'rosesCount': value.rosesCount,
        'roseGiven': value.roseGiven,
        'type': value.type,
        'lessons': value.lessons === undefined ? undefined : ((value.lessons as Array<any>).map(LessonTeaserToJSON)),
    };
}


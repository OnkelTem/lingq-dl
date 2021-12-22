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
    Card,
    CardFromJSON,
    CardFromJSONTyped,
    CardToJSON,
    CollectionTeaser,
    CollectionTeaserFromJSON,
    CollectionTeaserFromJSONTyped,
    CollectionTeaserToJSON,
    LessonAllOf,
    LessonAllOfFromJSON,
    LessonAllOfFromJSONTyped,
    LessonAllOfToJSON,
    LessonTeaser,
    LessonTeaserFromJSON,
    LessonTeaserFromJSONTyped,
    LessonTeaserToJSON,
    TokenizedTextItem,
    TokenizedTextItemFromJSON,
    TokenizedTextItemFromJSONTyped,
    TokenizedTextItemToJSON,
    Word,
    WordFromJSON,
    WordFromJSONTyped,
    WordToJSON,
} from './';

/**
 * 
 * @export
 * @interface Lesson
 */
export interface Lesson {
    /**
     * 
     * @type {number}
     * @memberof Lesson
     */
    id: number;
    /**
     * 
     * @type {number}
     * @memberof Lesson
     */
    contentId: number;
    /**
     * 
     * @type {number}
     * @memberof Lesson
     */
    collectionId: number;
    /**
     * 
     * @type {string}
     * @memberof Lesson
     */
    collectionTitle: string;
    /**
     * 
     * @type {string}
     * @memberof Lesson
     */
    url: string;
    /**
     * 
     * @type {string}
     * @memberof Lesson
     */
    originalUrl: string | null;
    /**
     * 
     * @type {string}
     * @memberof Lesson
     */
    imageUrl: string;
    /**
     * 
     * @type {string}
     * @memberof Lesson
     */
    originalImageUrl: string;
    /**
     * 
     * @type {string}
     * @memberof Lesson
     */
    providerImageUrl: string;
    /**
     * 
     * @type {string}
     * @memberof Lesson
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof Lesson
     */
    description: string;
    /**
     * 
     * @type {number}
     * @memberof Lesson
     */
    duration: number;
    /**
     * 
     * @type {string}
     * @memberof Lesson
     */
    audio: string;
    /**
     * 
     * @type {boolean}
     * @memberof Lesson
     */
    audioPending: boolean;
    /**
     * 
     * @type {Date}
     * @memberof Lesson
     */
    pubDate: Date;
    /**
     * 
     * @type {Date}
     * @memberof Lesson
     */
    sharedDate: Date | null;
    /**
     * 
     * @type {string}
     * @memberof Lesson
     */
    sharedByName: string;
    /**
     * 
     * @type {string}
     * @memberof Lesson
     */
    giveRoseUrl: string;
    /**
     * 
     * @type {number}
     * @memberof Lesson
     */
    wordCount: number;
    /**
     * 
     * @type {number}
     * @memberof Lesson
     */
    uniqueWordCount: number;
    /**
     * 
     * @type {string}
     * @memberof Lesson
     */
    externalType: string | null;
    /**
     * 
     * @type {string}
     * @memberof Lesson
     */
    type: LessonTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof Lesson
     */
    status: string;
    /**
     * 
     * @type {number}
     * @memberof Lesson
     */
    pos: number;
    /**
     * 
     * @type {number}
     * @memberof Lesson
     */
    price: number;
    /**
     * 
     * @type {boolean}
     * @memberof Lesson
     */
    opened: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Lesson
     */
    completed: boolean;
    /**
     * 
     * @type {number}
     * @memberof Lesson
     */
    percentCompleted: number;
    /**
     * 
     * @type {number}
     * @memberof Lesson
     */
    newWordsCount: number;
    /**
     * 
     * @type {number}
     * @memberof Lesson
     */
    difficulty: number;
    /**
     * 
     * @type {string}
     * @memberof Lesson
     */
    providerName: string;
    /**
     * 
     * @type {string}
     * @memberof Lesson
     */
    providerDescription: string;
    /**
     * 
     * @type {Date}
     * @memberof Lesson
     */
    lastRoseReceived: Date;
    /**
     * 
     * @type {number}
     * @memberof Lesson
     */
    lessonRating: number;
    /**
     * 
     * @type {number}
     * @memberof Lesson
     */
    lessonVotes: number;
    /**
     * 
     * @type {number}
     * @memberof Lesson
     */
    audioRating: number;
    /**
     * 
     * @type {number}
     * @memberof Lesson
     */
    audioVotes: number;
    /**
     * 
     * @type {number}
     * @memberof Lesson
     */
    rosesCount: number;
    /**
     * 
     * @type {boolean}
     * @memberof Lesson
     */
    isFavorite: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Lesson
     */
    isOverLimit: boolean | null;
    /**
     * 
     * @type {string}
     * @memberof Lesson
     */
    level: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof Lesson
     */
    tags: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof Lesson
     */
    providerUrl: string;
    /**
     * 
     * @type {number}
     * @memberof Lesson
     */
    readTimes: number;
    /**
     * 
     * @type {number}
     * @memberof Lesson
     */
    listenTimes: number;
    /**
     * 
     * @type {boolean}
     * @memberof Lesson
     */
    roseGiven: boolean;
    /**
     * 
     * @type {Date}
     * @memberof Lesson
     */
    openDate: Date;
    /**
     * 
     * @type {number}
     * @memberof Lesson
     */
    viewsCount: number;
    /**
     * 
     * @type {number}
     * @memberof Lesson
     */
    isProtected: number | null;
    /**
     * 
     * @type {string}
     * @memberof Lesson
     */
    notes: string | null;
    /**
     * 
     * @type {CollectionTeaser}
     * @memberof Lesson
     */
    collection: CollectionTeaser;
    /**
     * 
     * @type {Array<Array<TokenizedTextItem>>}
     * @memberof Lesson
     */
    tokenizedText: Array<Array<TokenizedTextItem>>;
    /**
     * 
     * @type {string}
     * @memberof Lesson
     */
    classicUrl: string;
    /**
     * 
     * @type {number}
     * @memberof Lesson
     */
    timestamp: number;
    /**
     * 
     * @type {string}
     * @memberof Lesson
     */
    sharedByImageUrl: string;
    /**
     * 
     * @type {boolean}
     * @memberof Lesson
     */
    sharedByIsFriend: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Lesson
     */
    promotedCourse: boolean;
    /**
     * 
     * @type {string}
     * @memberof Lesson
     */
    printUrl: string;
    /**
     * 
     * @type {boolean}
     * @memberof Lesson
     */
    canEdit: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Lesson
     */
    canEditSentence: boolean;
    /**
     * 
     * @type {number}
     * @memberof Lesson
     */
    nextLessonId: number;
    /**
     * 
     * @type {number}
     * @memberof Lesson
     */
    previousLessonId: number;
    /**
     * 
     * @type {string}
     * @memberof Lesson
     */
    videoUrl: string | null;
    /**
     * 
     * @type {number}
     * @memberof Lesson
     */
    cardsCount: number;
    /**
     * 
     * @type {object}
     * @memberof Lesson
     */
    bookmark: object;
    /**
     * 
     * @type {boolean}
     * @memberof Lesson
     */
    isLegacy: boolean;
    /**
     * 
     * @type {{ [key: string]: Word; }}
     * @memberof Lesson
     */
    words: { [key: string]: Word; };
    /**
     * 
     * @type {{ [key: string]: Card; }}
     * @memberof Lesson
     */
    cards: { [key: string]: Card; };
}

/**
* @export
* @enum {string}
*/
export enum LessonTypeEnum {
    Lesson = 'lesson'
}

export function LessonFromJSON(json: any): Lesson {
    return LessonFromJSONTyped(json, false);
}

export function LessonFromJSONTyped(json: any, ignoreDiscriminator: boolean): Lesson {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'contentId': json['contentId'],
        'collectionId': json['collectionId'],
        'collectionTitle': json['collectionTitle'],
        'url': json['url'],
        'originalUrl': json['originalUrl'],
        'imageUrl': json['imageUrl'],
        'originalImageUrl': json['originalImageUrl'],
        'providerImageUrl': json['providerImageUrl'],
        'title': json['title'],
        'description': json['description'],
        'duration': json['duration'],
        'audio': json['audio'],
        'audioPending': json['audioPending'],
        'pubDate': (new Date(json['pubDate'])),
        'sharedDate': (json['sharedDate'] === null ? null : new Date(json['sharedDate'])),
        'sharedByName': json['sharedByName'],
        'giveRoseUrl': json['giveRoseUrl'],
        'wordCount': json['wordCount'],
        'uniqueWordCount': json['uniqueWordCount'],
        'externalType': json['external_type'],
        'type': json['type'],
        'status': json['status'],
        'pos': json['pos'],
        'price': json['price'],
        'opened': json['opened'],
        'completed': json['completed'],
        'percentCompleted': json['percentCompleted'],
        'newWordsCount': json['newWordsCount'],
        'difficulty': json['difficulty'],
        'providerName': json['providerName'],
        'providerDescription': json['providerDescription'],
        'lastRoseReceived': (new Date(json['lastRoseReceived'])),
        'lessonRating': json['lessonRating'],
        'lessonVotes': json['lessonVotes'],
        'audioRating': json['audioRating'],
        'audioVotes': json['audioVotes'],
        'rosesCount': json['rosesCount'],
        'isFavorite': json['isFavorite'],
        'isOverLimit': json['isOverLimit'],
        'level': json['level'],
        'tags': json['tags'],
        'providerUrl': json['providerUrl'],
        'readTimes': json['readTimes'],
        'listenTimes': json['listenTimes'],
        'roseGiven': json['roseGiven'],
        'openDate': (new Date(json['openDate'])),
        'viewsCount': json['viewsCount'],
        'isProtected': json['isProtected'],
        'notes': json['notes'],
        'collection': CollectionTeaserFromJSON(json['collection']),
        'tokenizedText': json['tokenizedText'],
        'classicUrl': json['classicUrl'],
        'timestamp': json['timestamp'],
        'sharedByImageUrl': json['sharedByImageUrl'],
        'sharedByIsFriend': json['sharedByIsFriend'],
        'promotedCourse': json['promotedCourse'],
        'printUrl': json['printUrl'],
        'canEdit': json['canEdit'],
        'canEditSentence': json['canEditSentence'],
        'nextLessonId': json['nextLessonId'],
        'previousLessonId': json['previousLessonId'],
        'videoUrl': json['videoUrl'],
        'cardsCount': json['cardsCount'],
        'bookmark': json['bookmark'],
        'isLegacy': json['isLegacy'],
        'words': (mapValues(json['words'], WordFromJSON)),
        'cards': (mapValues(json['cards'], CardFromJSON)),
    };
}

export function LessonToJSON(value?: Lesson | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'contentId': value.contentId,
        'collectionId': value.collectionId,
        'collectionTitle': value.collectionTitle,
        'url': value.url,
        'originalUrl': value.originalUrl,
        'imageUrl': value.imageUrl,
        'originalImageUrl': value.originalImageUrl,
        'providerImageUrl': value.providerImageUrl,
        'title': value.title,
        'description': value.description,
        'duration': value.duration,
        'audio': value.audio,
        'audioPending': value.audioPending,
        'pubDate': (value.pubDate.toISOString()),
        'sharedDate': (value.sharedDate === null ? null : value.sharedDate.toISOString()),
        'sharedByName': value.sharedByName,
        'giveRoseUrl': value.giveRoseUrl,
        'wordCount': value.wordCount,
        'uniqueWordCount': value.uniqueWordCount,
        'external_type': value.externalType,
        'type': value.type,
        'status': value.status,
        'pos': value.pos,
        'price': value.price,
        'opened': value.opened,
        'completed': value.completed,
        'percentCompleted': value.percentCompleted,
        'newWordsCount': value.newWordsCount,
        'difficulty': value.difficulty,
        'providerName': value.providerName,
        'providerDescription': value.providerDescription,
        'lastRoseReceived': (value.lastRoseReceived.toISOString()),
        'lessonRating': value.lessonRating,
        'lessonVotes': value.lessonVotes,
        'audioRating': value.audioRating,
        'audioVotes': value.audioVotes,
        'rosesCount': value.rosesCount,
        'isFavorite': value.isFavorite,
        'isOverLimit': value.isOverLimit,
        'level': value.level,
        'tags': value.tags,
        'providerUrl': value.providerUrl,
        'readTimes': value.readTimes,
        'listenTimes': value.listenTimes,
        'roseGiven': value.roseGiven,
        'openDate': (value.openDate.toISOString()),
        'viewsCount': value.viewsCount,
        'isProtected': value.isProtected,
        'notes': value.notes,
        'collection': CollectionTeaserToJSON(value.collection),
        'tokenizedText': value.tokenizedText,
        'classicUrl': value.classicUrl,
        'timestamp': value.timestamp,
        'sharedByImageUrl': value.sharedByImageUrl,
        'sharedByIsFriend': value.sharedByIsFriend,
        'promotedCourse': value.promotedCourse,
        'printUrl': value.printUrl,
        'canEdit': value.canEdit,
        'canEditSentence': value.canEditSentence,
        'nextLessonId': value.nextLessonId,
        'previousLessonId': value.previousLessonId,
        'videoUrl': value.videoUrl,
        'cardsCount': value.cardsCount,
        'bookmark': value.bookmark,
        'isLegacy': value.isLegacy,
        'words': (mapValues(value.words, WordToJSON)),
        'cards': (mapValues(value.cards, CardToJSON)),
    };
}


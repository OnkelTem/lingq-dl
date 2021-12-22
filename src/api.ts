import * as Apis from '../api/apis';
import * as Runtime from '../api/runtime';
import { Collection, Lesson } from '../api';
import { hasKey } from './utils';

const api = {
  fetchCourse: async (apiKey: string, params: { lang: string; id: number }): Promise<Collection> => {
    const req: Apis.LangCollectionsIdGetRequest = {
      lang: params.lang,
      id: params.id,
    };
    try {
      return await getApiItem(apiKey).langCollectionsIdGet(req);
    } catch (err) {
      if (hasKey(err, 'message') && typeof err.message === 'string') {
        console.error('API Error [langCollectionsIdGet]', err);
        throw new Error('API Error: ' + err.message);
      } else {
        console.error('API Error', err);
        throw new Error('API Error');
      }
    }
  },
  fetchLesson: async (apiKey: string, params: { lang: string; id: number }): Promise<Lesson> => {
    const req: Apis.LangLessonsIdGetRequest = {
      lang: params.lang,
      id: params.id,
    };
    try {
      return await getApiItem(apiKey).langLessonsIdGet(req);
    } catch (err) {
      if (hasKey(err, 'message') && typeof err.message === 'string') {
        console.error('API Error [langLessonsIdGet]', err);
        throw new Error('API Error: ' + err.message);
      } else {
        console.error('API Error', err);
        throw new Error('API Error');
      }
    }
  },
} as const;
export type Api = typeof api;

function getApiItem(apiKey: string) {
  const configuration = new Runtime.Configuration({ apiKey: `Token ${apiKey}` });
  return new Apis.DefaultApi(configuration);
}

function runApiMethod(method: any, param: any) {
  try {
    method(param);
  } catch (err) {
    //
  }
}

export default api;

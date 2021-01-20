import {api, getStartCursorPosition, joinColumnsWithDataInResponse, prepareArrayDataBySchema} from 'api';
import {INews} from '../types';
import {IGetNewsParams, INewsApiModel} from './apiTypes';
import {newsSchema} from './schemas';

/** Получить новости биржи */
export const getNews = ({lang, page = 1} = {} as IGetNewsParams): Promise<INews[]> => {
  return api
    .get<INewsApiModel[]>('/sitenews.json', {
      params: {start: getStartCursorPosition(page, 50), lang},
      transformResponse: joinColumnsWithDataInResponse('sitenews'),
    })
    .then(prepareArrayDataBySchema<INewsApiModel, INews, typeof newsSchema>(newsSchema));
};

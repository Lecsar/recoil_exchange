import {api, getStartCursorPosition, joinColumnsWithDataInResponse, prepareArrayDataBySchema} from 'api';
import {changeDataKeys} from 'helpers/changeDataKeys';
import {INews, IShortNews} from '../types';
import {IGetNewsParams, IShortNewsApiModel, INewsApiModel} from './apiTypes';
import {shortNewsSchema, newsSchema} from './schemas';

/** Получить конкретную новость биржи */
export const getNews = (newsId: number): Promise<INews> => {
  return api
    .get<[INewsApiModel]>(`sitenews/${newsId}.json`, {
      transformResponse: joinColumnsWithDataInResponse('content'),
    })
    .then(({data: [news]}) => changeDataKeys<INewsApiModel, INews, typeof newsSchema>(news, newsSchema));
};

/** Получить новости биржи */
export const getListNews = ({lang, page = 1} = {} as IGetNewsParams): Promise<IShortNews[]> => {
  return api
    .get<IShortNewsApiModel[]>('/sitenews.json', {
      params: {start: getStartCursorPosition(page, 50), lang},
      transformResponse: joinColumnsWithDataInResponse('sitenews'),
    })
    .then(prepareArrayDataBySchema<IShortNewsApiModel, IShortNews, typeof shortNewsSchema>(shortNewsSchema));
};

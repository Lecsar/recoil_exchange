import {ISecurityApiModel, IGetSecuritiesParams} from './apiTypes';
import {api, joinColumnsWithDataInResponse, prepareArrayDataBySchema} from 'api';
import {ISecurity} from '../types';
import {securitySchema} from './schemas';

/** Список бумаг торгуемых на московской бирже */
export const getSecurities = (p: IGetSecuritiesParams = {}): Promise<ISecurity[]> => {
  const page = p.page;
  const perPage = p.perPage;

  let start = 0;

  if (page !== undefined && perPage !== undefined) {
    start = page * perPage - perPage;
  }

  return api
    .get<ISecurityApiModel[]>('/securities.json', {
      transformResponse: joinColumnsWithDataInResponse('securities'),
      params: {q: p.query, lang: p.lang, group_by_filter: p.groupByFilter, limit: perPage, start},
    })
    .then(prepareArrayDataBySchema<ISecurityApiModel, ISecurity, typeof securitySchema>(securitySchema));
};

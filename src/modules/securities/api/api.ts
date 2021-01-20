import {ISecurityApiModel, IGetSecuritiesParams} from './apiTypes';
import {api, getStartCursorPosition, joinColumnsWithDataInResponse, prepareArrayDataBySchema} from 'api';
import {ISecurity} from '../types';
import {securitySchema} from './schemas';

/** Список бумаг торгуемых на московской бирже */
export const getSecurities = (p: IGetSecuritiesParams = {}): Promise<ISecurity[]> => {
  return api
    .get<ISecurityApiModel[]>('/securities.json', {
      transformResponse: joinColumnsWithDataInResponse('securities'),
      params: {
        q: p.query,
        lang: p.lang,
        group_by_filter: p.groupByFilter,
        limit: p.perPage,
        start: getStartCursorPosition(p.page, p.perPage),
      },
    })
    .then(prepareArrayDataBySchema<ISecurityApiModel, ISecurity, typeof securitySchema>(securitySchema));
};

import {api, joinColumnsWithDataInResponse} from 'api';
import {changeDataKeys} from 'helpers/changeDataKeys';

import {ISecurityType, IEngine, IMarket, IBoard} from './types';
import {IBoardApiModel, IEngineApiModel, IMarketApiModel, ISecurityTypeApiModel} from './apiTypes';
import {boardSchema, marketSchema} from './schemas';

/** Типы ценных бумаг */
export const getSecurityTypes = (params?: {lang?: 'ru' | 'eng'}) =>
  api
    .get<ISecurityTypeApiModel[]>('/securitytypes.json', {
      params,
      transformResponse: joinColumnsWithDataInResponse('securitytypes'),
    })
    .then(({data}): ISecurityType[] => data);

/** Список доступных торговых систем */
export const getEngines = (params?: {lang?: 'ru' | 'eng'}) =>
  api
    .get<IEngineApiModel[]>('/engines.json', {
      params,
      transformResponse: joinColumnsWithDataInResponse('engines'),
    })
    .then(({data}): IEngine[] => data);

/** Получить глобальные справочники */
export const getGlobalDictionaries = (params?: {lang?: 'ru' | 'eng'}) =>
  api
    .get<{markets: IMarketApiModel[]; boards: IBoardApiModel[]}>('/index.json', {
      params,
      transformResponse: joinColumnsWithDataInResponse(),
    })
    .then(({data: {markets, boards}}): {markets: IMarket[]; boards: IBoard[]} => {
      return {
        markets: markets.map((market) =>
          changeDataKeys<IMarketApiModel, IMarket, typeof marketSchema>(market, marketSchema)
        ),
        boards: boards.map((board) => changeDataKeys<IBoardApiModel, IBoard, typeof boardSchema>(board, boardSchema)),
      };
    });

import {api, joinColumnsWithDataInResponse} from 'api';
import {changeDataKeys} from 'helpers/changeDataKeys';

import {ISecurityType, IEngine, IMarket, IBoard, ISecurityGroup} from './types';
import {
  IBoardApiModel,
  IEngineApiModel,
  IMarketApiModel,
  ISecurityGroupApiModel,
  ISecurityTypeApiModel,
} from './apiTypes';
import {boardSchema, marketSchema, securityGroupSchema} from './schemas';

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
    .get<{markets: IMarketApiModel[]; boards: IBoardApiModel[]; securitygroups: ISecurityGroupApiModel[]}>(
      '/index.json',
      {
        params,
        transformResponse: joinColumnsWithDataInResponse(),
      }
    )
    .then(({data: {markets, boards, securitygroups}}): {
      markets: IMarket[];
      boards: IBoard[];
      securityGroups: ISecurityGroup[];
    } => {
      return {
        markets: markets.map((i) => changeDataKeys<IMarketApiModel, IMarket, typeof marketSchema>(i, marketSchema)),
        boards: boards.map((i) => changeDataKeys<IBoardApiModel, IBoard, typeof boardSchema>(i, boardSchema)),
        securityGroups: securitygroups.map((i) =>
          changeDataKeys<ISecurityGroupApiModel, ISecurityGroup, typeof securityGroupSchema>(i, securityGroupSchema)
        ),
      };
    });

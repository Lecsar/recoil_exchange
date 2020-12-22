import {api, joinColumnsWithDataInResponse} from 'api';
import {ISecurityType, IEngine} from './types';
import {IEngineApiModel, ISecurityTypeApiModel} from './apiTypes';

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

import {changeDataKeys} from 'helpers/changeDataKeys';
import {ISecurityApiModel, IGetSecuritiesParams} from './apiTypes';
import {api} from 'api';
import {ISecurity} from '../types';

/** Список бумаг торгуемых на московской бирже */
export const getSecurities = (p: IGetSecuritiesParams = {}) => {
  const page = p.page;
  const perPage = p.perPage;

  let start = 0;

  if (page !== undefined && perPage !== undefined) {
    start = page * perPage - perPage;
  }

  return api
    .get<ISecurityApiModel[]>('/securities.json', {
      params: {
        q: p.query,
        lang: p.lang,
        group_by_filter: p.groupByFilter,
        limit: perPage,
        start,
      },
    })
    .then(({data}): ISecurity[] => {
      const schema = {
        emitent_id: 'emitentId' as const,
        emitent_inn: 'emitentInn' as const,
        emitent_okpo: 'emitentOkpo' as const,
        emitent_title: 'emitentTitle' as const,
        gosreg: 'gosReg' as const,
        is_traded: {name: 'isTraded' as const, converter: (apiValue: 0 | 1) => Boolean(apiValue)},
        marketprice_boardid: 'marketPriceBoardid' as const,
        primary_boardid: 'primaryBoardid' as const,
        regnumber: 'regNumber' as const,
        shortname: 'shortName' as const,
      };

      return data.map((apiModel) => changeDataKeys<ISecurityApiModel, ISecurity, typeof schema>(apiModel, schema));
    });
};

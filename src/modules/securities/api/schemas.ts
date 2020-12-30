import {converterString, TApiBoolean} from 'api';

export const securitySchema = {
  emitent_id: 'emitentId' as const,
  emitent_inn: 'emitentInn' as const,
  emitent_okpo: 'emitentOkpo' as const,
  emitent_title: 'emitentTitle' as const,
  gosreg: 'gosReg' as const,
  is_traded: {name: 'isTraded' as const, converter: (apiValue: TApiBoolean) => Boolean(apiValue)},
  marketprice_boardid: {name: 'marketPriceBoardId' as const, converter: converterString},
  group: {name: 'group' as const, converter: converterString},
  primary_boardid: {name: 'primaryBoardId' as const, converter: converterString},
  regnumber: 'regNumber' as const,
  shortname: 'shortName' as const,
};

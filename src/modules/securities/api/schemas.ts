export const securitySchema = {
  emitent_id: 'emitentId' as const,
  emitent_inn: 'emitentInn' as const,
  emitent_okpo: 'emitentOkpo' as const,
  emitent_title: 'emitentTitle' as const,
  gosreg: 'gosReg' as const,
  is_traded: {name: 'isTraded' as const, converter: (apiValue: 0 | 1) => Boolean(apiValue)},
  marketprice_boardid: {name: 'marketPriceBoardId' as const, converter: (value: string | null) => value || undefined},
  primary_boardid: 'primaryBoardId' as const,
  regnumber: 'regNumber' as const,
  shortname: 'shortName' as const,
};

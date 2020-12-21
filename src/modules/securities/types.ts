export interface ISecurity {
  id: number;
  secid: string;
  shortName: string;
  regNumber: string;
  name?: string;
  isin?: string;
  isTraded: boolean;
  emitentId: number;
  emitentTitle: string;
  emitentInn: string;
  emitentOkpo: string;
  gosReg: string;
  type: string;
  group: string;
  primaryBoardid: string;
  marketPriceBoardid: string;
}

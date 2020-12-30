import {IBoard, ISecurityGroup, ISecurityType} from 'modules/dictionary';

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
  type: ISecurityType['name'];
  group: ISecurityGroup['name'] | undefined;
  primaryBoardId: IBoard['boardId'] | undefined;
  marketPriceBoardId: IBoard['boardId'] | undefined;
}

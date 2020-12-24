import {GetDenormalizationShemaType} from 'helpers/makeDenormalizeFilter';
import {IBoard, ISecurityGroup, ISecurityType} from 'modules/dictionary';

export type TSecurityDenormalizationSchema = {
  type: {
    model: ISecurityType;
    key: 'name';
  };
  group: {
    model: ISecurityGroup;
    key: 'name';
  };
  primaryBoardId: {
    model: IBoard;
    key: 'boardId';
  };
  marketPriceBoardId: {
    model: IBoard;
    key: 'boardId';
  };
};

export const securityDenormalizationSchema: GetDenormalizationShemaType<TSecurityDenormalizationSchema> = {
  group: 'name',
  type: 'name',
  marketPriceBoardId: 'boardId',
  primaryBoardId: 'boardId',
};

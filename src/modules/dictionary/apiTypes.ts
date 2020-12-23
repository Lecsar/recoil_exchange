export type TApiBoolean = 1 | 0;

export interface ISecurityTypeApiModel {
  id: number;
  name: string;
  title: string;
}

export interface IEngineApiModel {
  id: number;
  name: string;
  title: string;
}

export interface IMarketApiModel {
  id: number;
  trade_engine_id: number;
  trade_engine_name: string;
  trade_engine_title: string;
  market_name: string;
  market_title: string;
  market_id: number;
  marketplace: string;
}

export interface IBoardApiModel {
  id: number;
  board_group_id: number;
  engine_id: number;
  market_id: number;
  boardid: string;
  board_title: string;
  is_traded: TApiBoolean;
  has_candles: TApiBoolean;
  is_primary: TApiBoolean;
}

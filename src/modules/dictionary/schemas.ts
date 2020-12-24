import {TApiBoolean} from './apiTypes';

const convertFromApiBoolean = (value: TApiBoolean) => Boolean(value);

export const marketSchema = {
  trade_engine_id: 'tradeEngineId' as const,
  trade_engine_name: 'tradeEngineName' as const,
  trade_engine_title: 'tradeEngineTitle' as const,
  market_name: 'marketName' as const,
  market_title: 'marketTitle' as const,
  market_id: 'marketId' as const,
  marketplace: 'marketPlace' as const,
};

export const boardSchema = {
  board_group_id: 'boardGroupId' as const,
  boardid: 'boardId' as const,
  engine_id: 'engineId' as const,
  market_id: 'marketId' as const,
  board_title: 'boardTitle' as const,
  is_traded: {name: 'isTraded' as const, converter: convertFromApiBoolean},
  has_candles: {name: 'hasCandles' as const, converter: convertFromApiBoolean},
  is_primary: {name: 'isPrimary' as const, converter: convertFromApiBoolean},
};

export const securityGroupSchema = {
  is_hidden: {name: 'isHidden' as const, converter: convertFromApiBoolean},
};

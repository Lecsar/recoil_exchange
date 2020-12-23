/** Тип ценной бумаги */
export interface ISecurityType {
  id: number;
  name: string;
  title: string;
}

/** Торговая система */
export interface IEngine {
  id: number;
  name: string;
  title: string;
}

/** Доступный рынок */
export interface IMarket {
  id: number;
  tradeEngineId: number;
  tradeEngineName: string;
  tradeEngineTitle: string;
  marketName: string;
  marketTitle: string;
  marketId: number;
  marketPlace: string;
}

/** Режим торгов */
export interface IBoard {
  id: number;
  boardGroupId: number;
  engineId: number;
  marketId: number;
  boardId: string;
  boardTitle: string;
  isTraded: boolean;
  hasCandles: boolean;
  isPrimary: boolean;
}

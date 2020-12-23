export interface ISecurityApiModel {
  id: number;
  secid: string;
  shortname: string;
  regnumber: string;
  name: string;
  isin: string;
  is_traded: 1 | 0;
  emitent_id: number;
  emitent_title: string;
  emitent_inn: string;
  emitent_okpo: string;
  gosreg: string;
  type: string;
  group: string;
  primary_boardid: string;
  marketprice_boardid: string | null;
}

export interface IGetSecuritiesParams {
  /** Поиск инструмента по части Кода, Названию, ISIN, Идентификатору Эмитента, Номеру гос.регистрации. */
  query?: string;
  /** Язык результата: ru или en */
  lang?: 'ru' | 'en';
  /** Количество выводимых инструментов (5, 10, 20, 100) */
  perPage?: number;
  /** Фильтровать по типам group или type */
  groupByFilter?: string;
  /** Номер строки (отсчет с нуля), с которой следует начать порцию возвращаемых данных */
  page?: number;
}

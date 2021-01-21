export interface INewsApiModel {
  id: number;
  title: string;
  published_at: string;
  body: string;
}

export interface IShortNewsApiModel {
  id: number;
  tag: string;
  title: string;
  published_at: string;
  modified_at: string;
}

export interface IGetNewsParams {
  /** Язык результата: ru или en */
  lang?: 'ru' | 'en';
  /** Страницы новостей */
  page?: number;
}

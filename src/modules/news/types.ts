export interface INews {
  id: number;
  title: string;
  publishedAt: string;
  body: string;
}

export interface IShortNews extends Omit<INews, 'body'> {
  tag: string;
  modifiedAt: string;
}

import {atom, selector, selectorFamily} from 'recoil';
import {getListNews, getNews} from './api';
import {IShortNews} from './types';

export const getNewsQuery = selectorFamily({
  key: 'getNewsQuery',
  get: (newsId: number) => async () => {
    const news = await getNews(newsId);
    return news;
  },
});

const newsPage = atom({key: 'newsPage', default: 1});
export const newsListState = atom<IShortNews[]>({key: 'newsListState', default: []});

export const getNewsListQuery = selector({
  key: 'getNewsListQuery',
  get: async ({get}) => {
    const listNews = await getListNews({page: get(newsPage)});
    return listNews;
  },
});

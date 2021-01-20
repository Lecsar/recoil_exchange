import {atom, selector} from 'recoil';
import {getNews} from './api';
import {INews} from './types';

const newsPage = atom({key: 'newsPage', default: 1});

export const newsState = atom<INews[]>({key: 'newsState', default: []});

export const getNewsQuery = selector({
  key: 'getNewsQuery',
  get: async ({get}) => {
    const news = await getNews({page: get(newsPage)});
    return news;
  },
});

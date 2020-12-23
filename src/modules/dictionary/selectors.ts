import {selector} from 'recoil';
import {getSecurityTypes, getEngines, getGlobalDictionaries} from './api';

const getSecurityTypesQuery = selector({
  key: 'dictionary/getSecurityTypesQuery',
  get: async () => {
    return await getSecurityTypes();
  },
});

const getEnginesQuery = selector({
  key: 'dictionary/getEngines',
  get: async () => {
    return await getEngines();
  },
});

const getGlobalDictionariesQuery = selector({
  key: 'dictionary/getGlobalDictionariesQuery',
  get: async () => {
    return await getGlobalDictionaries();
  },
});

const getMarkets = selector({
  key: 'dictionary/getMarkets',
  get: ({get}) => {
    return get(getGlobalDictionariesQuery).markets;
  },
});

const getBoards = selector({
  key: 'dictionary/getBoards',
  get: ({get}) => {
    return get(getGlobalDictionariesQuery).boards;
  },
});

export const dicrionarySelectors = {
  securityType: getSecurityTypesQuery,
  engines: getEnginesQuery,
  markets: getMarkets,
  boards: getBoards,
};

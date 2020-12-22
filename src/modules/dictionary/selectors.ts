import {selector} from 'recoil';
import {getSecurityTypes, getEngines} from './api';

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

export const dicrionarySelectors = {
  securityType: getSecurityTypesQuery,
  engines: getEnginesQuery,
};

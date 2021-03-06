import {atom, selector} from 'recoil';

import {securityDenormalizationSchema, TSecurityDenormalizationSchema} from './denormalizationSchema';
import {boardFilterState, securityTypeFilterState, securityGroupFilterState} from './SecuritiesFilters';
import {getSecurities} from './api';
import {ISecurity} from './types';
import {makeFilter} from 'helpers/makeDenormalizeFilter';

export const pageState = atom({key: 'page', default: 1});

const searchState = atom({key: 'search', default: ''});
export const getSearchState = selector<string>({
  key: 'getSearchState',
  get: ({get}) => get(searchState),
  set: ({set, get}, newSearch) => {
    if (get(pageState) !== 1) {
      set(pageState, 1);
    }

    set(searchState, newSearch);
  },
});

const perPageState = atom({key: 'perPage', default: 5});
export const getPerPageState = selector<number>({
  key: 'getPerPageState',
  get: ({get}) => get(perPageState),
  set: ({set, get}, newPage) => {
    if (get(pageState) !== 1) {
      set(pageState, 1);
    }

    set(perPageState, newPage);
  },
});

const securitiesListState = atom<ISecurity[]>({
  key: 'securitiesListState',
  default: [],
});

export const getSecuritiesListState = selector<ISecurity[]>({
  key: 'getSecuritiesListState',
  get: ({get}) => get(securitiesListState),
  set: ({get, set}, newSecurities) => {
    if (get(pageState) > 1) {
      set(securitiesListState, (prev) => [...prev, ...(newSecurities as ISecurity[])]);
    } else {
      set(securitiesListState, newSecurities);
    }
  },
});

export const getSecuritiesQuery = selector({
  key: 'getSecuritiesQuery',
  get: async ({get}) => {
    const securitiesList = await getSecurities({
      query: get(getSearchState),
      perPage: get(getPerPageState),
      page: get(pageState),
    });

    return securitiesList;
  },
});

export const hasLoadMoreButtonState = selector({
  key: 'hasLoadMoreButton',
  get: ({get}) => {
    const perPage = get(getPerPageState);
    const page = get(pageState);
    const amountSecurities = get(getSecuritiesListState).length;

    return amountSecurities >= perPage * page;
  },
});

const applySecurityListFilter = makeFilter<TSecurityDenormalizationSchema>(securityDenormalizationSchema);

export const securityFilteredListState = selector({
  key: 'securityFilteredListState',
  get: ({get}) => {
    const securitiesList = get(getSecuritiesListState);

    return securitiesList
      .filter(applySecurityListFilter('type', get(securityTypeFilterState)))
      .filter(applySecurityListFilter('primaryBoardId', get(boardFilterState)))
      .filter(applySecurityListFilter('group', get(securityGroupFilterState)));
  },
});

export const amountSecurityFilteredElementsState = selector({
  key: 'amountSecurityFilteredElementsState',
  get: ({get}) => get(securityFilteredListState).length,
});

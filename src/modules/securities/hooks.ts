import {makeFilter} from 'helpers/makeDenormalizeFilter';
import {useEffect} from 'react';
import {selector, useRecoilValue, useRecoilValueLoadable, useSetRecoilState} from 'recoil';
import {securityDenormalizationSchema, TSecurityDenormalizationSchema} from './denormalizationSchema';

import {boardFilterState, securityTypeFilterState, securityGroupFilterState} from './SecuritiesFilters';

import {getSecuritiesListState, getSecuritiesQuery} from './selectors';

const applySecurityListFilter = makeFilter<TSecurityDenormalizationSchema>(securityDenormalizationSchema);

const securityFilteredListState = selector({
  key: 'securityFilteredListState',
  get: ({get}) => {
    const securitiesList = get(getSecuritiesListState);

    return securitiesList
      .filter(applySecurityListFilter('type', get(securityTypeFilterState)))
      .filter(applySecurityListFilter('primaryBoardId', get(boardFilterState)))
      .filter(applySecurityListFilter('group', get(securityGroupFilterState)));
  },
});

export const useLoadSecuritiesList = () => {
  const securitiesLoadable = useRecoilValueLoadable(getSecuritiesQuery);
  const setSecurities = useSetRecoilState(getSecuritiesListState);

  const securityFilteredList = useRecoilValue(securityFilteredListState);

  useEffect(() => {
    if (securitiesLoadable.state === 'hasValue') {
      setSecurities(securitiesLoadable.contents);
    }
  }, [securitiesLoadable.contents, securitiesLoadable.state, setSecurities]);

  const isLoading = securitiesLoadable.state === 'loading';
  const isInitialLoading = isLoading && securityFilteredList.length === 0;

  return {isInitialLoading, isLoading, securityList: securityFilteredList};
};

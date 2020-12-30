import {useEffect} from 'react';
import {useRecoilValue, useRecoilValueLoadable, useSetRecoilState} from 'recoil';

import {getSecuritiesListState, getSecuritiesQuery, securityFilteredListState} from './selectors';

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

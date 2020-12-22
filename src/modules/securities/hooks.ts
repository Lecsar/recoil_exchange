import {useEffect} from 'react';
import {useRecoilState, useRecoilValueLoadable} from 'recoil';
import {getSecuritiesListState, getSecuritiesQuery} from './selectors';

export const useLoadSecuritiesList = () => {
  const securitiesLoadable = useRecoilValueLoadable(getSecuritiesQuery);
  const [securityList, setSecurities] = useRecoilState(getSecuritiesListState);

  useEffect(() => {
    if (securitiesLoadable.state === 'hasValue') {
      setSecurities(securitiesLoadable.contents);
    }
  }, [securitiesLoadable.contents, securitiesLoadable.state, setSecurities]);

  const isLoading = securitiesLoadable.state === 'loading';
  const isInitialLoading = isLoading && securityList.length === 0;

  return {isInitialLoading, isLoading, securityList};
};

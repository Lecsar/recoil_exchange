import {useEffect} from 'react';
import {useRecoilValue, useRecoilState} from 'recoil';
import {getSecuritiesQuery, getSecuritiesListState, pageState} from './selectors';

export const SecuritiesList = () => {
  const page = useRecoilValue(pageState);

  const securitiesResponse = useRecoilValue(getSecuritiesQuery);
  const [securityList, setSecurities] = useRecoilState(getSecuritiesListState);

  useEffect(() => {
    setSecurities(securitiesResponse);
  }, [securitiesResponse, setSecurities]);

  return securityList.length ? (
    <ul>
      <h1>{page}</h1>
      {securityList.map(({id, name}, index) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  ) : (
    <p>not found</p>
  );
};

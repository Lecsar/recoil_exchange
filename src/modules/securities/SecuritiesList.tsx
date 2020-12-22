import {useLoadSecuritiesList} from './hooks';
import {useGetDictionaryEntitities} from 'modules/dictionary/hooks';

export const SecuritiesList = () => {
  const {isInitialLoading, securityList} = useLoadSecuritiesList();
  const securityTypesDictionary = useGetDictionaryEntitities(
    'securityType',
    'name',
    securityList.map((i) => i.type!)
  );

  if (isInitialLoading) {
    return <p>Initial loading...</p>;
  }

  return securityList.length ? (
    <ul>
      {securityList.map(({id, name, type}) => (
        <li key={id}>
          <p>{name}</p>
          <h4>{securityTypesDictionary[type].title}</h4>
          <hr />
        </li>
      ))}
    </ul>
  ) : (
    <p>not found</p>
  );
};

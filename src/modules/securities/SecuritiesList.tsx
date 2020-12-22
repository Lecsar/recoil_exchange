import {useLoadSecuritiesList} from './hooks';

export const SecuritiesList = () => {
  const {isInitialLoading, securityList} = useLoadSecuritiesList();

  if (isInitialLoading) {
    return <p>Initial loading...</p>;
  }

  return securityList.length ? (
    <ul>
      {securityList.map(({id, name}) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  ) : (
    <p>not found</p>
  );
};

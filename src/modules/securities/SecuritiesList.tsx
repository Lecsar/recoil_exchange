import {useLoadSecuritiesList} from './hooks';
import {useGetDictionaryEntitities} from 'modules/dictionary/hooks';

export const SecuritiesList = () => {
  const {isInitialLoading, securityList} = useLoadSecuritiesList();
  const securityTypesDictionary = useGetDictionaryEntitities('securityType', 'name');
  const boardsDcitionary = useGetDictionaryEntitities('boards', 'boardId');
  const securityGroupsDictionary = useGetDictionaryEntitities('securityGroups', 'name');

  if (isInitialLoading) {
    return <p>Initial loading...</p>;
  }

  return securityList.length ? (
    <ul>
      {securityList.map(({id, name, type, primaryBoardId, marketPriceBoardId, group}) => {
        return (
          <li key={id}>
            <p>{name}</p>
            <h4>securityTypeTitle: {securityTypesDictionary[type].title}</h4>
            <h4>boardTitle: {boardsDcitionary[primaryBoardId].boardTitle}</h4>
            <h4>securityGroupName: {securityGroupsDictionary[group].title}</h4>
            {marketPriceBoardId && <h4>marketPriceBoardTitle: {boardsDcitionary[marketPriceBoardId].boardTitle}</h4>}
            <hr />
          </li>
        );
      })}
    </ul>
  ) : (
    <p>not found</p>
  );
};

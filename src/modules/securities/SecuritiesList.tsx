import {useLoadSecuritiesList} from './hooks';
import {useGetDictionaryEntitities} from 'modules/dictionary/hooks';

export const SecuritiesList = () => {
  const {isInitialLoading, securityList} = useLoadSecuritiesList();
  const securityTypesDictionary = useGetDictionaryEntitities('securityType', 'name');
  const boards = useGetDictionaryEntitities('boards', 'boardId');

  if (isInitialLoading) {
    return <p>Initial loading...</p>;
  }

  return securityList.length ? (
    <ul>
      {securityList.map(({id, name, type, primaryBoardId, marketPriceBoardId}) => {
        return (
          <li key={id}>
            <p>{name}</p>
            <h4>securityTypeTitle: {securityTypesDictionary[type].title}</h4>
            <h4>boardTitle: {boards[primaryBoardId].boardTitle}</h4>
            {marketPriceBoardId && <h4>marketPriceBoardTitle: {boards[marketPriceBoardId].boardTitle}</h4>}
            <hr />
          </li>
        );
      })}
    </ul>
  ) : (
    <p>not found</p>
  );
};

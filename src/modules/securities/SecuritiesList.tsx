import {useRecoilValue} from 'recoil';

import {useGetDictionaryEntitities} from 'modules/dictionary/hooks';
import {useLoadRecoilData} from 'hooks';

import {getSecuritiesListState, getSecuritiesQuery, securityFilteredListState} from './selectors';

export const SecuritiesList = () => {
  const {isLoading} = useLoadRecoilData(getSecuritiesListState, getSecuritiesQuery);
  const securityFilteredList = useRecoilValue(securityFilteredListState);

  const securityTypesDictionary = useGetDictionaryEntitities('securityType', 'name');
  const boardsDcitionary = useGetDictionaryEntitities('boards', 'boardId');
  const securityGroupsDictionary = useGetDictionaryEntitities('securityGroups', 'name');

  if (isLoading && securityFilteredList.length === 0) {
    return <p>Initial loading...</p>;
  }

  return securityFilteredList.length ? (
    <ul>
      {securityFilteredList.map(({id, name, type, primaryBoardId, marketPriceBoardId, group}) => {
        return (
          <li key={id}>
            <p>{name}</p>
            <h4>securityTypeTitle: {securityTypesDictionary[type].title}</h4>
            {primaryBoardId && <h4>boardTitle: {boardsDcitionary[primaryBoardId].boardTitle}</h4>}
            {group && <h4>securityGroupName: {securityGroupsDictionary[group].title}</h4>}
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

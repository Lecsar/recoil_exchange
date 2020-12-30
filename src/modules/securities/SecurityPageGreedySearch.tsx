import {Button} from 'components/Button';
import {useCallback, useEffect, useRef, useState} from 'react';
import {useRecoilState, useRecoilValue, useRecoilValueLoadable} from 'recoil';

import {amountSecurityFilteredElementsState, getPerPageState, pageState, getSecuritiesQuery} from './selectors';

const useGreedySearch = (maxAmountRetries: number = 5) => {
  const [needStartSearch, setNeedStartSearch] = useState(false);

  const amountRetries = useRef(0);

  const amountElements = useRecoilValue(amountSecurityFilteredElementsState);
  const perPage = useRecoilValue(getPerPageState);
  const [page, setPage] = useRecoilState(pageState);
  const {state} = useRecoilValueLoadable(getSecuritiesQuery);

  const isEnoughtElements = amountElements >= perPage;
  const isAvailableRetry = maxAmountRetries > amountRetries.current;
  const isLoading = state === 'loading';

  const canStartSearch = needStartSearch && !isEnoughtElements && isAvailableRetry && !isLoading;

  useEffect(() => {
    if (canStartSearch) {
      setPage(page + 1);
      amountRetries.current++;
    }
  }, [canStartSearch, page, setPage]);

  const startSearch = useCallback(() => {
    setNeedStartSearch(true);
  }, []);

  const stopSearch = useCallback(() => {
    amountRetries.current = 0;
    setNeedStartSearch(false);
  }, []);

  useEffect(() => {
    if (!isAvailableRetry) {
      stopSearch();
    }
  }, [isAvailableRetry, stopSearch]);

  return {
    isDisabled: canStartSearch || needStartSearch,
    isSearching: needStartSearch,
    amountElements,
    startSearch,
    stopSearch,
  };
};

export const SecurityPageGreedySearch = () => {
  const {startSearch, stopSearch, isSearching, amountElements, isDisabled} = useGreedySearch(50);

  return (
    <div>
      <Button style={{marginRight: 10}} text="Найти" isDisabled={isDisabled} onClick={startSearch} />
      <Button text="Остановить" isDisabled={!isSearching} onClick={stopSearch} />
      {isSearching && <p>Найдено: {amountElements}</p>}
    </div>
  );
};

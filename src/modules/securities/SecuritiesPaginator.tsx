import {Button} from 'components/Button';
import {useCallback} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {hasLoadMoreButtonState, pageState} from './selectors';

export const SecuritiesPaginator = () => {
  const [page, setPage] = useRecoilState(pageState);
  const hasLoadMoreButton = useRecoilValue(hasLoadMoreButtonState);

  const handleLoadNextPage = useCallback(() => {
    setPage((prevPage) => ++prevPage);
  }, [setPage]);

  return (
    <>
      <br />
      <br />
      {hasLoadMoreButton && <Button text="Load more..." onClick={handleLoadNextPage} />}
      <br />
      <h1>Page: {page}</h1>
    </>
  );
};

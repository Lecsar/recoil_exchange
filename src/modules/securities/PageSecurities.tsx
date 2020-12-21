import {Suspense} from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {SecuritiesList} from './SecuritiesList';
import {getSearchState, getPerPageState, pageState} from './selectors';

export const PageSecurities = () => {
  const [search, setSearch] = useRecoilState(getSearchState);
  const [limit, setLimit] = useRecoilState(getPerPageState);
  const setPage = useSetRecoilState(pageState);

  return (
    <div>
      <input style={{marginRight: 5}} value={search} onChange={({target}) => setSearch(target.value)} />
      <select value={limit} onChange={({target: {value}}) => setLimit(Number(value))}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="100">100</option>
      </select>

      <br />
      <br />

      <button onClick={() => setPage((prevPage) => ++prevPage)}>Load more...</button>

      <br />
      <br />
      <Suspense fallback="Loading...">
        <SecuritiesList />
      </Suspense>
    </div>
  );
};

import {Input} from 'components/Input';
import {Select} from 'components/Select';
import {useRecoilState} from 'recoil';
import {useDebouncedCallback} from 'use-debounce/lib';
import {SecuritiesList} from './SecuritiesList';
import {SecuritiesPaginator} from './SecuritiesPaginator';
import {getSearchState, getPerPageState} from './selectors';

export const SecuritiesPage = () => {
  const [search, setSearch] = useRecoilState(getSearchState);
  const [perPage, setPerPage] = useRecoilState(getPerPageState);

  const {callback: debouncedSetSearch} = useDebouncedCallback(setSearch, 150);

  return (
    <div>
      <h2>Параметры запроса</h2>
      <Input style={{marginRight: 5}} initialValue={search} onChange={debouncedSetSearch} />
      <Select selectedOption={perPage} options={[5, 10, 20, 100]} onChange={setPerPage} />
      <hr />

      <h2>Фильтры</h2>
      <hr />

      <SecuritiesPaginator />
      <SecuritiesList />
    </div>
  );
};

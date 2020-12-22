import {Input} from 'components/Input';
import {Select} from 'components/Select';
import {useRecoilState} from 'recoil';
import {useDebouncedCallback} from 'use-debounce/lib';
import {SecuritiesList} from './SecuritiesList';
import {SecuritiesPaginator} from './SecuritiesPaginator';
import {getSearchState, getPerPageState} from './selectors';

export const PageSecurities = () => {
  const [search, setSearch] = useRecoilState(getSearchState);
  const [perPage, setPerPage] = useRecoilState(getPerPageState);

  const {callback: debouncedSetSearch} = useDebouncedCallback(setSearch, 150);

  return (
    <div>
      <Input style={{marginRight: 5}} initialValue={search} onChange={debouncedSetSearch} />
      <Select selectedOption={perPage} options={[5, 10, 20, 100]} onChange={setPerPage} />

      <SecuritiesPaginator />
      <SecuritiesList />
    </div>
  );
};

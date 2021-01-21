import {useLoadRecoilData} from 'hooks';

import {NewsList} from './components/NewsList';
import {newsListState, getNewsListQuery} from './selectors';

export const NewsPage = () => {
  const {data: newsList, isLoading} = useLoadRecoilData(newsListState, getNewsListQuery);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{width: 300, margin: 'auto'}}>
      <NewsList newsList={newsList} />
    </div>
  );
};

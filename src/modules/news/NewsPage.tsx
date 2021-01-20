import {useEffect} from 'react';
import {useRecoilState, useRecoilValueLoadable} from 'recoil';
import {newsState, getNewsQuery} from './selectors';

export const NewsPage = () => {
  const [news, setNews] = useRecoilState(newsState);
  const valueLoadable = useRecoilValueLoadable(getNewsQuery);

  useEffect(() => {
    if (valueLoadable.state === 'hasValue') {
      setNews(valueLoadable.contents);
    }
  }, [setNews, valueLoadable.contents, valueLoadable.state]);

  if (valueLoadable.state === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {news.map(({id, title}) => (
        <li key={id}>
          <h3>{id}</h3>
          <p>{title}</p>
        </li>
      ))}
    </ul>
  );
};

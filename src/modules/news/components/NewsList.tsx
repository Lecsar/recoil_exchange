import {useCallback, useState} from 'react';

import {IShortNews} from '../types';
import {NewsBody} from './NewsBody';

interface IProps {
  newsList: IShortNews[];
}

export const NewsList = ({newsList}: IProps) => {
  const [visibleFullNews, setVisibleFullNews] = useState<Record<number, boolean>>({});

  const toggleShowFullNews = useCallback((newsId: number) => {
    setVisibleFullNews((news) => ({...news, [newsId]: !news[newsId]}));
  }, []);

  return (
    <ul>
      {newsList.map(({id, title}) => {
        const isVisibleFullNews = visibleFullNews[id];

        return (
          <li key={id} style={{color: id in visibleFullNews ? 'green' : 'red'}}>
            <h3 style={{color: 'black'}}>{id}</h3>
            <p style={{color: 'black'}}>{title}</p>

            {isVisibleFullNews && <NewsBody id={id} />}
            <button onClick={() => toggleShowFullNews(id)}>{isVisibleFullNews ? 'Скрыть' : 'Читать далее'}</button>
          </li>
        );
      })}
    </ul>
  );
};

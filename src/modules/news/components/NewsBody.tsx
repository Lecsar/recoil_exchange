import {useRecoilValueLoadable} from 'recoil';

import {getNewsQuery} from '../selectors';

interface IProps {
  id: number;
}

export const NewsBody = ({id}: IProps) => {
  const loadable = useRecoilValueLoadable(getNewsQuery(id));

  if (loadable.state === 'loading') {
    return <h3>Load news body...</h3>;
  }

  if (loadable.state === 'hasError') {
    return <h3>Error...</h3>;
  }

  return <p style={{color: 'green'}}>{loadable.contents.body}</p>;
};

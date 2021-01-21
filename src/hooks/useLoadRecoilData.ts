import {useEffect} from 'react';
import {RecoilState, RecoilValue, useRecoilState, useRecoilValueLoadable} from 'recoil';

export const useLoadRecoilData = <T extends unknown>(atom: RecoilState<T>, querySelector: RecoilValue<T>) => {
  const [atomState, setAtomState] = useRecoilState(atom);
  const valueLoadable = useRecoilValueLoadable(querySelector);

  useEffect(() => {
    if (valueLoadable.state === 'hasValue') {
      setAtomState(valueLoadable.contents);
    }
  }, [setAtomState, valueLoadable.contents, valueLoadable.state]);

  return {
    data: atomState,
    isLoading: valueLoadable.state === 'loading',
  };
};

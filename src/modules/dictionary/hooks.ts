import {RecoilValue, useRecoilValueLoadable} from 'recoil';
import {dicrionarySelectors} from './selectors';

type TDictionarySelectors = typeof dicrionarySelectors;
type TGetRecoilValueFromArray<T> = T extends RecoilValue<Array<infer K>> ? K : never;

export const useGetDictionaryEntitity = <
  DictionaryName extends keyof TDictionarySelectors,
  PropertyIdName extends keyof TGetRecoilValueFromArray<TDictionarySelectors[DictionaryName]>
>(
  dictionaryName: DictionaryName,
  propertyIdName: PropertyIdName,
  id?: TGetRecoilValueFromArray<TDictionarySelectors[DictionaryName]>[PropertyIdName]
): TGetRecoilValueFromArray<TDictionarySelectors[DictionaryName]> | undefined => {
  const loadableState = useRecoilValueLoadable(dicrionarySelectors[dictionaryName]);

  if (loadableState.state === 'hasValue') {
    // @ts-expect-error
    return loadableState.contents.find((entity) => id === entity[propertyIdName]);
  }

  return undefined;
};

export const useGetDictionaryEntitities = <
  DictionaryName extends keyof TDictionarySelectors,
  PropertyIdName extends keyof TGetRecoilValueFromArray<TDictionarySelectors[DictionaryName]>,
  IdValue extends TGetRecoilValueFromArray<TDictionarySelectors[DictionaryName]>[PropertyIdName]
>(
  dictionaryName: DictionaryName,
  propertyIdName: PropertyIdName,
  ids: IdValue[] = []
): Record<string, TGetRecoilValueFromArray<TDictionarySelectors[DictionaryName]>> => {
  const loadableState = useRecoilValueLoadable(dicrionarySelectors[dictionaryName]);

  if (loadableState.state === 'hasValue') {
    return ids.reduce((acc, id) => {
      // @ts-expect-error
      const entity = loadableState.contents.find((entity) => id === entity[propertyIdName]);

      if (entity) {
        // @ts-expect-error
        acc[String(id)] = entity;
      }

      return acc;
    }, {} as Record<string, TGetRecoilValueFromArray<TDictionarySelectors[DictionaryName]>>);
  }

  return {} as Record<string, TGetRecoilValueFromArray<TDictionarySelectors[DictionaryName]>>;
};

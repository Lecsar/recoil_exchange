import {normalizeData} from 'helpers/normalizeData';
import {RecoilValue, useRecoilValueLoadable} from 'recoil';
import {dictionarySelectors} from './selectors';

type TDictionarySelectors = typeof dictionarySelectors;
type TGetRecoilValueFromArray<T> = T extends RecoilValue<Array<infer K>> ? K : never;

export const useGetDictionaryEntitity = <
  DictionaryName extends keyof TDictionarySelectors,
  PropertyIdName extends keyof TGetRecoilValueFromArray<TDictionarySelectors[DictionaryName]>
>(
  dictionaryName: DictionaryName,
  propertyIdName: PropertyIdName,
  id?: TGetRecoilValueFromArray<TDictionarySelectors[DictionaryName]>[PropertyIdName]
): TGetRecoilValueFromArray<TDictionarySelectors[DictionaryName]> | undefined => {
  // @ts-expect-error
  const loadableState = useRecoilValueLoadable(dictionarySelectors[dictionaryName]);

  if (loadableState.state === 'hasValue') {
    // @ts-expect-error
    return loadableState.contents.find((entity) => id === entity[propertyIdName]);
  }

  return undefined;
};

export const useGetDictionaryEntitities = <
  DictionaryName extends keyof TDictionarySelectors,
  PropertyIdName extends keyof TGetRecoilValueFromArray<TDictionarySelectors[DictionaryName]>
>(
  dictionaryName: DictionaryName,
  propertyIdName: PropertyIdName
): Record<string, TGetRecoilValueFromArray<TDictionarySelectors[DictionaryName]>> => {
  // @ts-expect-error
  const loadableState = useRecoilValueLoadable(dictionarySelectors[dictionaryName]);

  if (loadableState.state === 'hasValue') {
    // @ts-expect-error
    return normalizeData(loadableState.contents, propertyIdName);
  }

  return {} as Record<string, TGetRecoilValueFromArray<TDictionarySelectors[DictionaryName]>>;
};

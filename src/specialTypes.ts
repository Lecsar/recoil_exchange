export type GetKeysBaseOnPattern<T extends Record<string, any>, Pattern = never> = Exclude<
  {
    [key in keyof T]: T[key] extends Pattern ? key : never;
  }[keyof T],
  never
>;

export type ExcludeKeysFromRecord<T extends Record<string, any>, KeyValue> = Pick<
  T,
  Exclude<keyof T, GetKeysBaseOnPattern<T, KeyValue>>
>;

export type UnionToIntersection<U> = (U extends any ? (x: U) => any : never) extends (x: infer V) => any ? V : never;

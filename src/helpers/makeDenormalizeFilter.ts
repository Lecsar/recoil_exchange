export type TBaseDenormalizationSchema = {model: any; key: string};

export type GetDenormalizationShemaType<Schema extends Record<string, TBaseDenormalizationSchema>> = {
  [key in keyof Schema]: Schema[key]['key'];
};

export const makeFilter = <Schema extends Record<string, TBaseDenormalizationSchema>>(
  schema: GetDenormalizationShemaType<Schema>
) => <Key extends keyof Schema>(key: Key, filter: Schema[Key]['model']) => <Item extends Record<Key, any>>(i: Item) => {
  const filterValue = filter[schema[key]];
  const itemValue = i[key];

  return filterValue ? filterValue === itemValue : true;
};

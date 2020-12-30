import {UnionToIntersection} from 'specialTypes';
import {getKeys} from './getKeys';

type Model = Record<string, any>;

type SchemaValue<ModelValue = any> =
  /** просто мапилка  first_Name => firstName  */
  | string
  /** мапилка с преобразованием first_Name: 1 => firstName: true */
  | {
      name: string;
      converter: (apiValue: any) => ModelValue;
    };

type GetPropertiesValues<T> = UnionToIntersection<T[keyof T]>;

type GetKeyName<Key extends SchemaValue> = Key extends {name: infer T} ? T : Key;

type GetKeyValue<Value extends SchemaValue> = Value extends {name: any; converter?: (apiValue: any) => infer T}
  ? T
  : never;

type GetRemappedModel<ApiModel extends Model, Schema extends Record<string, any>> = GetPropertiesValues<
  {
    [key_1 in keyof ApiModel & keyof Schema]: GetPropertiesValues<
      {
        [key_2 in keyof Schema]: key_1 extends key_2
          ? {
              [key_3 in GetKeyName<NonNullable<Schema[key_2]>>]: GetKeyValue<Schema[key_2]> extends never
                ? ApiModel[key_1]
                : GetKeyValue<Schema[key_2]>;
            }
          : never;
      }
    >;
  }
>;

type GetApiModelData<ApiModel extends Model, Schema extends Record<string, any>> = Pick<
  ApiModel,
  Exclude<keyof ApiModel, keyof Schema>
>;

// type Test_1 = {
//   a: string;
// };

// type Schema = {
//   a: (value: string) => number;
// };

// type GetResult<ApiModel, Schema> = GetApiModelData<ApiModel, Schema> & GetRemappedModel<ApiModel, Schema>;

// type Result_1 = GetResult<Test_1, Schema>;
// type Result = ISecurity extends GetResult<ISecurityApiModel, typeof securitySchema> ? true : false;

export const changeDataKeys = <ApiModel extends Model, MyModel extends Model, Schema extends Record<string, any>>(
  data: ApiModel,
  newKeysMap: Schema
): MyModel extends GetApiModelData<ApiModel, Schema> & GetRemappedModel<ApiModel, Schema> ? MyModel : undefined => {
  const dataCopy = JSON.parse(JSON.stringify(data));

  getKeys(newKeysMap).forEach((oldKey) => {
    const newKeyValue: SchemaValue = newKeysMap[oldKey];

    if (typeof newKeyValue === 'object') {
      const {name: newKey, converter} = newKeyValue;

      dataCopy[newKey] = converter(dataCopy[oldKey]);
    } else {
      dataCopy[newKeyValue] = dataCopy[oldKey];
    }

    delete dataCopy[oldKey];
  });

  return dataCopy;
};

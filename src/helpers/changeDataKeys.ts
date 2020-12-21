import {UnionToIntersection} from 'specialTypes';
import {getKeys} from './getKeys';

type Model = Record<string, any>;

// type UniqueTypeForSameValuesInModels = {__unique__: '__unique__'};

// type GetSchemaWithCommonKeys<ApiModel extends Model, MyModel extends Model> = {
//   [key in keyof ApiModel & keyof MyModel]: ApiModel[key] extends MyModel[key]
//     ? UniqueTypeForSameValuesInModels
//     : ApiModel[key] extends never
//     ? never
//     : (apiValue: ApiModel[key]) => MyModel[key];
// };

// type GetSchemaWithDifferentKeys<ApiModel extends Model, MyModel extends Model> = Record<
//   Exclude<keyof ApiModel, keyof GetSchemaWithCommonKeys<ApiModel, MyModel>>,
//   SchemaValue
// >;

// type GetSchema<ApiModel extends Model, MyModel extends Model> = GetSchemaWithDifferentKeys<ApiModel, MyModel> &
//   GetSchemaWithCommonKeys<ApiModel, MyModel>;

// type GetKeysMapSchema<ApiModel extends Model, MyModel extends Model> = ExcludeKeysFromRecord<
//   GetSchema<ApiModel, MyModel>,
//   UniqueTypeForSameValuesInModels
// >;

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

// type Test_1 = {
//   a_a: string;
//   b_b: number;
//   f?: boolean;
// };

// type Test_2 = {
//   aA: string;
//   b: string;
//   f?: boolean;
// };

// type TestSchema = {
//   a_a: 'aA';
//   b_b: {name: 'bB'; converter?: (apiValue: any) => '426738293'};
// };

// type Result = GetSomeThing<Test_1, TestSchema>;

export const changeDataKeys = <
  ApiModel extends Model,
  MyModel extends Model,
  // Schema extends GetKeysMapSchema<ApiModel, MyModel>
  Schema extends Record<string, any>
>(
  data: ApiModel,
  newKeysMap: Schema
): MyModel extends GetRemappedModel<ApiModel, Schema> ? MyModel : undefined => {
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

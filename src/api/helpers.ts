import {AxiosResponse} from 'axios';
import {changeDataKeys} from 'helpers/changeDataKeys';
import {getKeys} from 'helpers/getKeys';
import {joinColumnsWithData} from 'helpers/joinColumnsWithData';

type Entity = any;
type ResponseData = Record<string, {data: Array<Array<any>>; columns: string[]}>;

export function joinColumnsWithDataInResponse<Data extends ResponseData>(): (
  response: string
) => Record<keyof Data, Entity[]>;
export function joinColumnsWithDataInResponse<Data extends ResponseData>(
  key: keyof Data
): (response: string) => Entity[];

export function joinColumnsWithDataInResponse<Data extends ResponseData>(key?: keyof Data) {
  return (response: string) => {
    const responseData: Data = JSON.parse(response) || {};

    if (key) {
      const {data = [], columns = []} = responseData[key] || {};
      return joinColumnsWithData(data, columns);
    }

    return getKeys(responseData).reduce((acc, key) => {
      const {data = [], columns = []} = responseData[key] || {};
      acc[key] = joinColumnsWithData(data, columns);

      return acc;
    }, {} as Record<keyof Data, any>);
  };
}

export const prepareArrayDataBySchema = <
  ApiModel extends Record<string, any>,
  MyModel extends Record<string, any>,
  Schema extends Record<string, any>
>(
  schema: Schema
) => ({data}: AxiosResponse<ApiModel[]>) =>
  data.map((apiModel) => changeDataKeys<ApiModel, MyModel, typeof schema>(apiModel, schema));

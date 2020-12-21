import Axios from 'axios';
import {joinColumnsWithData} from './helpers/joinColumnsWithData';

export const api = Axios.create({
  baseURL: 'https://iss.moex.com/iss',
  //   validateStatus(status) {
  //     return status >= 200 && status < 500;
  //   },
  //   paramsSerializer: (params) => qs.stringify(params, {arrayFormat: 'brackets'}),
  transformResponse: (response) => {
    const {data, columns} = JSON.parse(response)?.securities || {};
    const denormalizedData = joinColumnsWithData(data, columns);

    return denormalizedData;
    // return normalizeData(denormalizedData, 'id');
  },
});

import Axios from 'axios';

export const api = Axios.create({
  baseURL: 'https://iss.moex.com/iss',
});

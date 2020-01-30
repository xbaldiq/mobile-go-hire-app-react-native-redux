import Axios from 'axios';
import {API_URL} from 'react-native-dotenv';

export const getAllEngineer = (params,token) => {
  const filter = Object.keys(params)[4];
  let URL = API_URL.concat(`/engineer/`);
  return {
    type: 'GET_ENG_LIST',
    payload: Axios.get(URL, {
      params: {
        sort: params.sort,
        order: params.order,
        page: params.page,
        limit: params.limit,
        [filter]: params[filter]
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `.concat(token)
      }
    })
  };
};

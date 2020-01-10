import Axios from 'axios';
import {API_URL} from 'react-native-dotenv';

import AsyncStorage from '@react-native-community/async-storage';

export const getAllEngineer = (params, user_type) => {
  const filter = Object.keys(params)[4];
  let url = API_URL.concat(`/engineer/${user_type}`);
  // console.log(url)
  return {
    type: 'GET_ENG_LIST',
    payload: Axios.get(url, {
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

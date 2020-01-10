import Axios from 'axios';
import {API_URL} from 'react-native-dotenv';

import AsyncStorage from '@react-native-community/async-storage';

// const URL_STRING = 'http://192.168.100.109/company/project/create';

export const loginAccount = ({username, password, user_type}) => {

  let url = API_URL.concat(`/login/${user_type}`)
  // console.log(url)
  return {
    type: 'LOGIN_ACCOUNT',
    payload: Axios.post(url ,{
      username,
      password
    }, {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer `.concat(token),
      },
    }),
  };
};

import Axios from 'axios';

// const URL_STRING = 'http://localhost:8000/engineer/';
import {API_URL} from 'react-native-dotenv';

export const getEngineerProfile = (token) => {
  return {
    type: 'GET_ENG_PROFILE',
    payload: Axios.get(API_URL.concat(`/engineer/`), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `.concat(token)
      }
    })
  };
};

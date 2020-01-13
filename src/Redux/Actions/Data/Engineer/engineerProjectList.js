import Axios from 'axios';
import {API_URL} from 'react-native-dotenv';

export const getProjectList = (id) => {
  let URL = 'http://192.168.6.104:8000'.concat(`/engineer/project/`);
  return {
    type: 'ENG_GET_PROJECT_LIST',
    payload: Axios.get(URL, {
      params: {
        id
      },
      headers: {
        'Content-Type': 'application/json'
        //   Authorization: `Bearer `.concat(this.state.token)
      }
    })
  };
};

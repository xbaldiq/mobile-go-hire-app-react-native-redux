import Axios from 'axios';
import {API_URL} from 'react-native-dotenv';

export const getProjectList = (id) => {
  let URL = API_URL.concat(`/engineer/project/`);
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

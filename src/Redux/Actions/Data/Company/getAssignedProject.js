import Axios from 'axios';
import {API_URL} from 'react-native-dotenv';

export const getAssignedProject = (token) => {
  let URL = API_URL.concat(`/company/project/assign`);
  return {
    type: 'COM_GET_ASSIGNED_PROJECT_LIST',
    payload: Axios.get(URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `.concat(token)
      }
    })
  };
};
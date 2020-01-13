import Axios from 'axios';
import {API_URL} from 'react-native-dotenv';
const URL_STRING = 'http://192.168.6.104:8000/company/project/create';

export const createNewProject = (projectName,token) => {
  return {
    type: 'POST_NEW_PROJECT',
    payload: Axios.post(URL_STRING, {name_project: projectName}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer `.concat(token)
        }
      })
  };
};
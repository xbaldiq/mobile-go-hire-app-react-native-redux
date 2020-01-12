import Axios from 'axios';
import {API_URL} from 'react-native-dotenv';

export const responseProject = data => {
  let URL = API_URL.concat(`/engineer/project/`);
    return {
      type: 'ENG_RESPONSE_PROJECT',
      payload: Axios.patch(URL, null, {
        params: {
          id: data.id,
          name_project :  data.name_project,
          status_project: data.status_project
        },
        headers: {
          'Content-Type': 'application/json'
          // Authorization: `Bearer `.concat(token)
        }
      })
    };
  };
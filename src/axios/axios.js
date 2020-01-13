import axios from 'axios'
import {API_URL} from 'react-native-dotenv';

export const getListProject = (token) => {
    return axios
      .get('http://192.168.6.104:8000'.concat('/company/project'), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer `.concat(token)
        }
      })
      .then(res => {
        // this.setState({ projectList: res.data.data });
        // console.log('axiosproject', res.data.data)
        return  res.data.data;
      })
  };

  export const assignProject = (data,token) => {

    console.log('data',data)
    return axios
      .post('http://192.168.6.104:8000'.concat('/company/project/assign'), data,{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer `.concat(token)
        }
      })
      .then(res => {
        return  res.data.msg;
      })
  };
import axios from 'axios';
import Config from 'react-native-config';

export const request = ({url, method, data, headers}) => {
  let apiBaseURL = Config.API_BASE_URL || 'https://listicle.deegeehub.com/api';
  //console.log(`Config.LISTICLE_API_BASE_URL: ${Config.API_BASE_URL}`);

  return axios({
    method: method || 'get',
    url: `${apiBaseURL}${url}`,
    data,
    ...(headers && {headers}),
  });
};

export const addTokenToAxios = token => {
  axios.defaults.headers.Authorization = token;
};

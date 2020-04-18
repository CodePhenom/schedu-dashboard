import axios from 'axios';

const idTokenResult = JSON.parse(localStorage.getItem('idTokenResult'));
let idToken = '';
if (idTokenResult) {
  idToken = idTokenResult.token;
}

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_SCHEDU_API_BASE_URL,
  json: true,
  headers: {
    AuthToken: idToken,
  },
});

export default httpClient;

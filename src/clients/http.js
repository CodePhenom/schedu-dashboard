import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_SCHEDU_API_BASE_URL,
  json: true,
});

export { httpClient };

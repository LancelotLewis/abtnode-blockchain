import Qs from 'qs';
import axios from 'axios';

const service = axios.create({
  // baseURL: '/api',
  baseURL: 'https://blockchain.info',
  timeout: 0,
  paramsSerializer(params) {
    return Qs.stringify({ ...params, cors: true }, { arrayFormat: 'repeat' });
  },
});

service.interceptors.request.use((config) => {
  config.params = config.params || {};
  return config;
});
service.interceptors.response.use((res) => {
  return res.data;
});

export default service;

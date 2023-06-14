import axios from 'axios';
import { API_HEADER, ROOT_API } from 'constants/api';
import { setRefreshToken, getRefreshToken } from 'store/Cookie';
import { SET_TOKEN } from 'store/Auth';

const API = axios.create({
  baseURL: `${ROOT_API}/login`,
  headers: { API_HEADER },
});

API.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && loginRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = getRefreshToken();
      } catch {}
    }
  },
);

import axios from "axios";
import { API_HEADER, ROOT_API } from "constants/api";
import { getCookieToken } from "store/Cookie";
import store from "../store/index";

const API = axios.create({
  baseURL: `${ROOT_API}`,
  headers: { API_HEADER },
});

// console.log("store", store);
// API.interceptors.request.use(
//   async (config) => {
//     const refreshToken = getCookieToken();
//     const accessToken = store.getState().authToken.accessToken;
//     console.log("refreshToken", refreshToken);
//     console.log("accessToken", accessToken);

//     if (accessToken) {
//       config.headers.Authorization = `Bearer${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default API;

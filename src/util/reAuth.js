// import jwt from "jsonwebtoken";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SET_TOKEN } from "store/Auth";
import { API_HEADER, ROOT_API } from "../constants/api";
import { useEffect } from "react";

export const instance = axios.create({
  baseURL: `${ROOT_API}`,
  headers: {
    API_HEADER,
  },
});

export async function useReAuth() {
  const dispatch = useDispatch();
  const getrtk = localStorage.getItem("refreshToken");
  const getemail = localStorage.getItem("email");
  const auth = useSelector((state) => state.authToken);
  useEffect(() => {
    instance.interceptors.request.use((config) => {
      if (auth && config.headers) {
        config.headers["Authorization"] = `Bearer ${auth}`;
      }
      return config;
    });
  }, [auth]);

  if (auth.accessToken === null && getrtk) {
    try {
      const response = await axios.post(
        `${ROOT_API}/accesstoken`,
        {
          email: getemail,
        },
        {
          headers: {
            API_HEADER,
            rtk: getrtk,
          },
        }
      );
      console.log("토큰이 재발급되고 있는거니?", response.data);
      dispatch(SET_TOKEN({ accessToken: response.data }));
    } catch (error) {
      console.error("Token refresh failed", error);
    }
  }
}

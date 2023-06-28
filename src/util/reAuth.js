import React from "react";
import { getCookieToken } from "store/Cookie";
import store from "../store/index";
import API from "./intercepter";
// import jwt from "jsonwebtoken";
import { API_HEADER, ROOT_API } from "../constants/api";
import axios from "axios";

export async function reAuth() {
  const refreshToken = localStorage.getItem("refressToken");
  const getLoginEmail = localStorage.getItem("loginData");
  const accessToken = store.getState().authToken.accessToken;
  console.log("새로고침시 엑세스 토큰 존재?", accessToken);

  if (!accessToken && refreshToken) {
    try {
      console.log("아이디 가져올 수 있냐?", getLoginEmail);
      console.log("새로고침시 리프레쉬토큰 존재?", refreshToken);
      const response = axios.post(
        `${ROOT_API}/accesstoken`,
        {
          email: getLoginEmail,
        },
        {
          headers: {
            API_HEADER,
            rtk: refreshToken,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Token refresh failed", error);
    }
  }
}

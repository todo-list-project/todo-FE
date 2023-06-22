import React from "react";
import { getCookieToken } from "store/Cookie";
import store from "../store/index";
import API from "./intercepter";
// import jwt from "jsonwebtoken";
import { API_HEADER, ROOT_API } from "../constants/api";
import axios from "axios";
import { useSelector } from "react-redux";

export async function useReAuth() {
  const auth = useSelector((state) => state.authToken);

  const getrtk = localStorage.getItem("refreshToken");
  const getemail = localStorage.getItem("email");
  if (auth.accessToken === null && getrtk !== undefined) {
    console.log('dd');
    try {
      const response = await axios.get(`${ROOT_API}/accesstoken`, {
        params: { email: getemail },
        headers: {
          API_HEADER,
          rtk: getrtk,
        },
      });
      console.log('res', response);
    } catch (error) {
      console.error("Token refresh failed", error);
    }
  }
}

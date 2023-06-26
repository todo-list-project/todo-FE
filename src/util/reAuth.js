// import jwt from "jsonwebtoken";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SET_TOKEN } from "store/Auth";
import { API_HEADER, ROOT_API } from "../constants/api";

export async function useReAuth() {
  const auth = useSelector((state) => state.authToken);
  const dispatch = useDispatch();

  const getrtk = localStorage.getItem("refreshToken");
  const getemail = localStorage.getItem("email");
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
      dispatch(SET_TOKEN({ accessToken: response.data.accessToken }));
    } catch (error) {
      console.error("Token refresh failed", error);
    }
  }
}

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { ROOT_API, API_HEADER } from "constants/api";
import { SET_TOKEN } from "store/Auth";
import { useLocation } from "react-router-dom";

export const ReAuth = () => {
  const auth = useSelector((state) => state.authToken);
  const dispatch = useDispatch();
  const location = useLocation();
  
  useEffect(() => {
    // 토큰 재갱신
    const getrtk = localStorage.getItem("refreshToken");
    const getemail = localStorage.getItem("email");
    if (auth.accessToken === null && getrtk) {
      axios
        .post(
          `${ROOT_API}/accesstoken`,
          {
            email: getemail,
          },
          {
            headers: {
              accept: "*/*",
              "Content-Type": "application/json",
              rtk: getrtk,
            },
          }
        )
        .then(function (response) {
          dispatch(SET_TOKEN({ accessToken: response.data }));
          console.log("res", response.data);
        })
        .catch(function (error) {
          console.log("재갱신 실패: ", error.response);
        });
    }
  }, [auth.accessToken, dispatch, location]);
};

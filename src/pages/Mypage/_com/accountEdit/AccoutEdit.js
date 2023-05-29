import { parseJwt } from "hooks/useParseJwt";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';
import { ROOT_API } from "constants/api";

const AccountEdit = () => {
  const auth = useSelector((state) => state.authToken);

  useEffect(() => {
    // console.log("auth", parseJwt(auth.accessToken));
    // axios
    //   .get(
    //     `${ROOT_API}/users`,
    //     {
    //       email: data.email,
    //       password: data.password,
    //       name: data.name,
    //       image: "111",
    //     },
    //     {
    //       headers: {
    //         API_HEADER,
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     console.log('rr', response)
    //   });
  }, []);

  return <div className="account-edit">
  회원정보수정
  </div>;
};

export default AccountEdit;

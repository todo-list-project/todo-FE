import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import BasicModal from "components/portalModal/basicmodal/BasicModal";
import "./regist.scss";
import Header from "components/header/Header";
import GoogleLogin from "components/snsLogin/GoogleLogin";
import KakaoLogin from "components/snsLogin/KaKaoLogin";
import { useNavigate } from "react-router-dom";
import { ROOT_API, API_HEADER } from "constants/api";
import { SET_TOKEN } from "store/Auth";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));

    axios
      .post(
        `${ROOT_API}/join`,
        {
          email: data.email,
          password: data.password,
          name: data.name,
          image: "111",
        },
        {
          headers: {
            API_HEADER,
          },
        }
      )
      .then((response) => {
        dispatch(SET_TOKEN({ accessToken: response.data.accessToken }));
        setModal(true);
        reset();
      });
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({ mode: "onChange" });

  return (
    <div className="page regist-page">
      <Header />
      {modal && (
        <BasicModal setOnModal={() => setModal()}>
          회원가입이 완료되었습니다. <br />
          확인을 누르시면 메인으로 이동합니다.
          <button onClick={() => navigate("/")}>확인</button>
        </BasicModal>
      )}
      <div className="content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-wrap">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="text"
              placeholder="아이디를 입력해주세요"
              {...register("email", {
                required: "이메일은 필수 입력입니다.",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "이메일 형식에 맞지 않습니다.",
                },
              })}
            />
            {errors.email && <small role="alert">{errors.email.message}</small>}
          </div>
          <div className="input-wrap">
            <label htmlFor="name">이름</label>
            <input
              id="name"
              type="text"
              placeholder="이름을 입력해주세요"
              {...register("name", {
                required: "이름은 필수 입력입니다.",
                minLength: {
                  value: 4,
                  message: "4글자 이상 입력해주세요.",
                },
              })}
            />
            {errors.name && <small role="alert">{errors.name.message}</small>}
          </div>
          <div className="input-wrap">
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              {...register("password", {
                required: "비밀번호는 필수 입력입니다.",
                minLength: {
                  value: 4,
                  message: "4자리 이상 비밀번호를 사용해주세요.",
                },
              })}
            />
            {errors.password && (
              <small role="alert">{errors.password.message}</small>
            )}
          </div>
          <div className="button-wrap">
            <button
              type="submit"
              disabled={isSubmitting}
              className="default-button submit-button"
            >
              가입
            </button>
          </div>
        </form>
        <div className="social-login">
          <GoogleLogin />
          <KakaoLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;

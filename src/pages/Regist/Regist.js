import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import "./regist.scss";
import Header from "components/header/Header";
import GoogleLogin from "components/snsLogin/GoogleLogin";
import KakaoLogin from "components/snsLogin/KaKaoLogin";
import { ROOT_API } from "constants/api";

const Login = () => {
  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));

    axios
      .post(
        `${ROOT_API}/join`,
        {
          email: data.email,
          password: data.userNickname,
          name: data.userId,
          image: data.password,
        }
        // {
        //   headers: {
        //     API_HEADER,
        //   },
        // }
      )
      .then(function (response) {
        console.log("dta", response.data);
      });
    console.log("data", data);
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
            <label htmlFor="id">아이디</label>
            <input
              id="id"
              type="text"
              placeholder="아이디를 입력해주세요"
              {...register("id", {
                required: "아이디는 필수 입력입니다.",
                minLength: {
                  value: 4,
                  message: "4글자 이상 입력해주세요.",
                },
              })}
            />
            {errors.id && <small role="alert">{errors.id.message}</small>}
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

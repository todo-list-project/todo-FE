import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import "./login.scss";
import Header from "components/header/Header";
import { ROOT_API, API_HEADER } from "constants/api";

const Login = () => {
  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));

    axios
      .post(
        `${ROOT_API}/login`,
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            API_HEADER,
          },
        }
      )
      .then(function (response) {
        console.log("dta", response);
      })
      .catch(function (error) {
        console.log("로그인 실패:", error.response);
      });
    console.log("formdata", data);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({ mode: "onChange" });

  return (
    <div className="page login-page">
      <Header />
      <div className="content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-wrap">
            <label htmlFor="eamil">이메일</label>
            <input
              id="email"
              type="text"
              placeholder="이메일을 입력해주세요"
              {...register("email", {
                required: "이메일은 필수 입력입니다.",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "이메일 형식에 맞지 않습니다.",
                },
              })}
            />
            {errors.eamil && <small role="alert">{errors.eamil.message}</small>}
          </div>
          <div className="input-wrap">
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              aria-invalid={
                !isDirty ? undefined : errors.password ? "true" : "false"
              }
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
              로그인
            </button>
          </div>
        </form>
        <div>
          <div className="search-regist">
            <button className="noline-button">계정 찾기</button>
            <div className="divider"></div>
            <button className="noline-button">비밀번호 찾기</button>
          </div>
          <button className="default-button line-button submit-button">
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

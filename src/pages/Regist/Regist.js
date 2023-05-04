import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import "./regist.scss";
import Header from "components/header/Header";
import GoogleLogin from "components/snsLogin/GoogleLogin";
import KakaoLogin from "components/snsLogin/KaKaoLogin";

const Login = () => {
  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));

    // axios
    //   .post(`https://url`, {
    //     modelName: data["modelName"],
    //     brand: data["brand"],
    //     price: data["price"],
    //     // size: data["size"],
    //   })
    //   .then(function (response) {
    //     // console.log("dta", response.data);
    //     alert("회원가입 완료");
    //   })
    //   .catch(function (error) {
    //     // 오류발생시 실행
    //   })
    //   .then(function () {
    //     // 항상 실행
    //   });
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
            <label htmlFor="id">아이디</label>
            <input
              id="id"
              type="text"
              placeholder="아이디를 입력해주세요"
              aria-invalid={!isDirty ? undefined : errors.id ? "true" : "false"}
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
              aria-invalid={
                !isDirty ? undefined : errors.password ? "true" : "false"
              }
              {...register("password", {
                required: "비밀번호는 필수 입력입니다.",
                minLength: {
                  value: 8,
                  message: "8자리 이상 비밀번호를 사용해주세요.",
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

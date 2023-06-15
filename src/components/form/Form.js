import axios from "axios";
import { API_HEADER, ROOT_API } from "constants/api";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { setRefreshToken } from "store/Cookie";
import { SET_TOKEN } from "store/Auth";

const Form = ({ type, success }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));

    if (type === "login") {
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
        .then((response) => {
          console.log("rr", response);
          localStorage.setItem("refressToken", response.data[0].token);
          dispatch(SET_TOKEN({ accessToken: response.data[1].token }));
          success(true);
          reset();
        });
    }
    if (type === "regist") {
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
          console.log("re", response);
          reset();
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
            .then((response) => {
              localStorage.setItem("refressToken", response.data[0].token);
              dispatch(SET_TOKEN({ accessToken: response.data[1].token }));
              success(true);
              reset();
            });
        });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-wrap">
        <label htmlFor="eamil">이메일</label>
        <input
          id="email"
          type="text"
          placeholder="이메일을 입력해주세요(로그인 아이디)"
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
      {type === "regist" && (
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
      )}
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
        {errors.password && <small role="alert">{errors.password.message}</small>}
      </div>
      <div className="button-wrap">
        <button type="submit" disabled={isSubmitting} className="default-button submit-button">
          {type === "login" && "로그인"}
          {type === "regist" && "회원가입"}
        </button>
      </div>
    </form>
  );
};

export default Form;

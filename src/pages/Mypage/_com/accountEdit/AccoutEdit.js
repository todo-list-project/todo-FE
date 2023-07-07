import axios from "axios";
import { API_HEADER, ROOT_API } from "constants/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import "./accoutedit.scss";
// import { useSelector } from 'react-redux';

const AccountEdit = () => {
  const auth = useSelector((state) => state.authToken);
  const [pwchk, setPwchk] = useState(false);
  const [originPw, setOriginPw] = useState();
  const [user, setUser] = useState({});

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({ mode: "onChange" });

  console.log('au: ', auth.accessToken)

  useEffect(() => {
    axios
      .get(`${ROOT_API}/users`, {
        headers: {
          accept: "*/*",
          atk: auth.accessToken,
        },
      })
      .then((response) => {
        console.log("rr", response);
        setUser(response.data);
      });
  }, []);

  const onSubmitUser = async () => {
    await new Promise((r) => setTimeout(r, 1000));
    axios
      .post(
        `${ROOT_API}/users`,
        {
          name: user.name,
          image: "111",
        },
        {
          headers: {
            atk: auth.accessToken,
          },
        }
      )
      .then((response) => {
        console.log("res", response);
        alert("수정되었습니다");
      });
  };

  const onSubmitPassWord = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));

    axios
      .post(
        `${ROOT_API}/users/changepw`,
        {
          newPw: data.newPw,
          newPwCheck: data.newPwCheck,
        },
        {
          headers: {
            atk: auth.accessToken,
          },
        }
      )
      .then((response) => {
        console.log("re", response);
      });
  };

  const chkPassWord = () => {
    axios
      .post(
        `${ROOT_API}/users/validatepw`,
        {
          originalPw: originPw,
        },
        {
          headers: {
            API_HEADER,
            atk: auth.accessToken,
          },
        }
      )
      .then((res) => {
        console.log("res", res);
        setPwchk(true);
      });
  };

  const onChangepw = (e) => {
    setOriginPw(e.target.value);
  };

  const ChangeName = (e) => {
    const name = e.target.value;
    setUser(name);
  };

  return (
    <div className="account-edit">
      <div className="title">회원정보수정</div>
      <div className="input-wrap">
        <label htmlFor="name">이름</label>
        <input id="name" type="text" placeholder="이름 수정" value={user && user.name} onChange={ChangeName} />
      </div>
      <div className="form">
        <div className="input-wrap">
          <label htmlFor="img">프로필 이미지</label>
          <input
            id="img"
            type="file"
            // placeholder="이름을 입력해주세요"
          />
        </div>
        <div className="button-wrap">
          <button type="submit" className="default-button submit-button" onClick={onSubmitUser}>
            정보 수정
          </button>
        </div>
      </div>

      <div className="title">비밀번호 수정</div>

      {!pwchk ? (
        <div>
          <div className="input-wrap">
            <input id="originalPw" type="password" placeholder="비밀번호 인증" value={originPw} onChange={onChangepw} />
            <button onClick={chkPassWord}>비밀번호 확인</button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmitPassWord)} className="form">
          <div className="input-wrap">
            <input id="newPw" type="password" placeholder="변경 비밀번호" {...register("newPw", {})} />
            {errors.newPw && <small role="alert">{errors.newPw.message}</small>}
          </div>
          <div className="input-wrap">
            <input
              id="newPwCheck"
              type="password"
              placeholder="비밀번호 확인"
              {...register("newPwCheck", {
                validate: (val) => {
                  if (watch("newPw") !== val) {
                    return "비밀번호가 일치하지 않습니다.";
                  }
                },
              })}
            />
            {errors.newPwCheck && <small role="alert">{errors.newPwCheck.message}</small>}
          </div>
          <div className="button-wrap">
            <button type="submit" disabled={isSubmitting} className="default-button submit-button">
              비밀번호 변경
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AccountEdit;

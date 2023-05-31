import axios from "axios";
import BasicModal from "components/portalModal/basicmodal/BasicModal";
import { API_HEADER, ROOT_API } from "constants/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./findpw.scss";

const Findpw = () => {
  let navigate = useNavigate();
  const [code, setCode] = useState(false);
  const [info, setInfo] = useState({
    email: "",
    name: "",
    code: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));
    console.log(`
    ${info.email} ${info.name}
    `);

    axios
      .post(
        `${ROOT_API}/findpw`,
        {
          email: info.email,
          name: info.name,
        },
        {
          headers: {
            API_HEADER,
          },
        }
      )
      .then((response) => {
        console.log("res", response);
        setCode(true);
        // alert("인증 코드가 입력하신 메일로 발송되었습니다.");
      });
  };

  const changeEmail = (e) => {
    setInfo({ ...info, email: e.target.value });
  };

  const changeName = (e) => {
    setInfo({ ...info, name: e.target.value });
  };

  const changeCode = (e) => {
    setInfo({ ...info, code: e.target.value });
  };

  return (
    <div className="page findpw-page">
      <div className="content">
        <form onSubmit={onSubmit}>
          <div className="input-wrap">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="text"
              placeholder="아이디를 입력해주세요"
              onChange={changeEmail}
            />
          </div>
          <div className="input-wrap">
            <label htmlFor="name">이름</label>
            <input
              id="name"
              type="text"
              placeholder="이름을 입력해주세요"
              onChange={changeName}
            />
          </div>
          <div className="input-wrap">
            {code && (
              <>
                <label htmlFor="code">인증코드 입력</label>
                <input
                  id="code"
                  type="text"
                  placeholder="코드를 입력해주세요"
                  onChange={changeCode}
                />
              </>
            )}
          </div>
          <div className="button-wrap">
            <button
              type="submit"
              // disabled={isSubmitting}
              className="default-button submit-button"
            >
              찾기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Findpw;

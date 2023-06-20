import Form from 'components/form/Form';
import BasicModal from 'components/portalModal/basicmodal/BasicModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.scss';

const Login = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  return (
    <div className="page login-page">
      {modal && (
        <BasicModal setOnModal={() => setModal(false)} dimClick={() => navigate('/')}>
          로그인이 완료되었습니다. <br />
          확인을 누르시면 메인으로 이동합니다.
          <button onClick={() => navigate('/')}>확인</button>
        </BasicModal>
      )}
      <div className="content">
        <Form type="login" success={setModal} />
        <div>
          <div className="search-regist">
            <button className="noline-button">계정 찾기</button>
            <div className="divider"></div>
            <button className="noline-button" onClick={() => navigate('/findpw')}>
              비밀번호 찾기
            </button>
          </div>
          <button className="default-button line-button submit-button" onClick={() => navigate('/regist')}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

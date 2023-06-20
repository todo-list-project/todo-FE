import Form from 'components/form/Form';
import BasicModal from 'components/portalModal/basicmodal/BasicModal';
import GoogleLogin from 'components/snsLogin/GoogleLogin';
import KakaoLogin from 'components/snsLogin/KaKaoLogin';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './regist.scss';

const Login = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  return (
    <div className="page regist-page">
      {modal && (
        <BasicModal setOnModal={() => setModal()} dimClick={() => navigate("/")}>
          회원가입이 완료되었습니다. <br />
          확인을 누르시면 메인으로 이동합니다.
          <button onClick={() => navigate('/')}>확인</button>
        </BasicModal>
      )}
      <div className="content">
        <Form type="regist" success={setModal} />
        <div className="social-login">
          <GoogleLogin />
          <KakaoLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;

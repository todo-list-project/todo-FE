import classNames from "classnames";
import { Link } from "react-router-dom";
import "./header.scss";

const Header = () => {
  return (
    <>
      <header className="header">
        {/* NOTE: 검색창 상시검색을 하게 할지 논의 필요, 상시검색 안해도된다면 이름, 로고등이 들어가도 될듯 */}
        <div>검색창? </div>
        <div className="user">
          {
            // NOTE: 유저정보가 있을 경우
            // auth && <div>유저정보</div>
          }
          <div className="mypage">마이페이지(유저 아이콘)</div>
        </div>
      </header>
    </>
  );
};

export default Header;

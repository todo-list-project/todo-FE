import Button from "components/button/Button";
import Tab from "components/tab/Tab";
import "./mypage.scss";
import Header from "components/header/Header";

const Mypage = () => {
  return (
    <div className="page my-page">
      <div className="content">
        내 정보가 보이는 부분, <br />총 할일 목록(내 할일 + 공유된 할일 + 완료된
        할일), 좋아요
        <div className="info">
          <div className="aside">
            <ul>
              <li>
                <strong>친구</strong>
                <ul>
                  <li>그룹관리</li>
                  <li>공유하기</li>
                </ul>
              </li>
              <li>
                <strong>계정</strong>
                <ul>
                  <li>수정</li>
                </ul>
              </li>
            </ul>
            <Button>계정탈퇴</Button>
          </div>
          <div className="content-item">왼쪽의 탭마다 다른 선택한 내용</div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;

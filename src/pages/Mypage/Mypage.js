import Button from "components/button/Button";
import Header from "components/header/Header";
import { useState } from "react";
import "./mypage.scss";

const Mypage = () => {
  const [tab, setTab] = useState(null);

  const clickTab = (type) => {
    setTab(type);
  };

  return (
    <div className="page my-page">
      <Header />
      <div className="content">
        <div className="desc">
          내 정보가 보이는 부분, <br />총 할일 목록(내 할일 + 공유된 할일 +
          완료된 할일), 좋아요
        </div>
        <div className="info">
          <div className="aside">
            <ul>
              <li>
                <strong>친구</strong>
                <ul>
                  <li onClick={() => clickTab("group-manage")}>그룹관리</li>
                  <li onClick={() => clickTab(null)}>공유된 할일?</li>
                </ul>
              </li>
              <li>
                <strong>계정</strong>
                <ul>
                  <li onClick={() => clickTab("account-edit")}>수정</li>
                </ul>
              </li>
            </ul>
            <Button classname="default-button delete-button">계정탈퇴</Button>
          </div>
          <div className="content-item">
            {tab === "group-manage" && (
              <>
                <div>
                  폴더 목록 <br />
                  폴더 생성 및 삭제 기능 추가
                </div>
                <div>
                  친구 목록 <br />
                  폴더 목록에서 폴더 클릭하고 친구 목록 클릭하면 친구를 폴더로
                  이동
                </div>
              </>
            )}
            {tab === "account-edit" && <>정보 수정</>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;

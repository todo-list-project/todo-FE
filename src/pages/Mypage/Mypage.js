import Button from "components/button/Button";
import Header from "components/header/Header";
import { useState, useEffect } from "react";
import classnames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { AiFillFolderAdd } from "react-icons/ai";
import "./mypage.scss";

const Mypage = () => {
  const [tab, setTab] = useState("");
  const [createFolder, setCraeteFolder] = useState(false);

  const createfolder = () => {
    setCraeteFolder(!createFolder);
  };

  const clickTab = (type) => {
    setTab(type);
  };

  const auth = false;

  // useEffect(() => {
  //   if (!auth) {
  //     navigate(`/regist`);
  //   }
  // });

  return (
    <div className="page my-page">
      <Header />
      {!auth ? (
        <div className="user-chk">
          <Link to="/login">로그인</Link> | <Link to="/regist">회원가입</Link>
        </div>
      ) : (
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
                    <li
                      className={classnames("", {
                        "is-select": tab === "group-manage",
                      })}
                      onClick={() => clickTab("group-manage")}
                    >
                      그룹관리
                    </li>
                    <li
                      className={classnames("", {
                        "is-select": tab === null,
                      })}
                      onClick={() => clickTab(null)}
                    >
                      공유된 할일?
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>계정</strong>
                  <ul>
                    <li
                      className={classnames("", {
                        "is-select": tab === "account-edit",
                      })}
                      onClick={() => clickTab("account-edit")}
                    >
                      수정
                    </li>
                  </ul>
                </li>
              </ul>
              <Button classname="default-button delete-button">계정탈퇴</Button>
            </div>
            <div
              className={classnames("content-item", {
                "is-account-edit": tab === "account-edit",
                "is-group-manage": tab === "group-manage",
              })}
            >
              {tab === "group-manage" && (
                <>
                  <div className="folder">
                    <div className="controll">
                      <span>폴더목록</span>
                      <AiFillFolderAdd size={22} onClick={createfolder} />
                    </div>
                    {createFolder && <input type="text" />}
                    <div className="folder-area"></div>
                  </div>
                  <div className="friend-list">
                    친구 목록 <br />
                    <ul>
                      <li>aaa</li>
                      <li>bbb</li>
                    </ul>
                    {/*
                    폴더 목록에서 폴더 클릭하고 친구 목록 클릭하면 친구를 폴더로
                    이동
                  */}
                  </div>
                </>
              )}
              {tab === "account-edit" && (
                <>
                  <div className="account-edit">
                    <label htmlFor="">비밀번호 확인</label>
                    <input type="password" name="" id="" />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mypage;

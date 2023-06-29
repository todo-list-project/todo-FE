import axios from "axios";
import classnames from "classnames";
import Button from "components/button/Button";
import Header from "components/header/Header";
import BasicModal from "components/portalModal/basicmodal/BasicModal";
import { API_HEADER, ROOT_API } from "constants/api";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DELETE_TOKEN } from "store/Auth";
import { removeCookieToken } from "store/Cookie";
import "./mypage.scss";
import AccountEdit from "./_com/accountEdit/AccoutEdit";
import Follower from "./_com/follower/Follower";
import GroupManage from "./_com/groupManage/GroupManage";

const Mypage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tab, setTab] = useState("");
  const [createFolder, setCraeteFolder] = useState(false);
  const auth = useSelector((state) => state.authToken);
  const [modal, setModal] = useState(false);

  const clickTab = (type) => {
    setTab(type);
  };

  useEffect(() => {
    if (auth.accessToken === null && localStorage.getItem("refreshToken") === null) {
      navigate("/login", { replace: true });
    }
  }, [auth.accessToken, navigate]);

  const deleteUser = () => {
    axios
      .post(
        `${ROOT_API}/login`,
        {
          // email: data.email,
          status: "D",
        },
        {
          headers: {
            API_HEADER,
          },
        }
      )
      .then((response) => {
        dispatch(DELETE_TOKEN());
        setModal(true);
      });
  };

  const logout = () => {
    removeCookieToken();
    localStorage.removeItem("refreshToken");
    dispatch(DELETE_TOKEN());
    navigate("/");
  };

  console.log("auth", auth);

  return (
    <>
      {auth.accessToken !== null ? (
        <div className="page my-page">
          {modal && (
            <BasicModal setOnModal={() => setModal(false)} dimClick={() => setModal(false)}>
              확인을 누르시면 탈퇴됩니다.
              <button onClick={deleteUser}>확인</button>
            </BasicModal>
          )}
          <div className="content">
            <div className="desc">
              내 정보가 보이는 부분, <br />총 할일 목록(내 할일 + 공유된 할일 + 완료된 할일), 좋아요
            </div>
            <div className="info">
              <div className="aside">
                <ul>
                  <li>
                    <strong>내정보</strong>
                    <ul>
                      <li
                        className={classnames("", {
                          "is-select": tab === "account-edit",
                        })}
                        onClick={() => clickTab("account-edit")}
                      >
                        정보 수정
                      </li>
                      <li
                        className={classnames("", {
                          "is-select": tab === "follower",
                        })}
                        onClick={() => clickTab("follower")}
                      >
                        팔로워/팔로윙
                      </li>
                    </ul>
                  </li>
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
                </ul>
                <Button classname="default-button logout-button" onClick={logout}>
                  로그아웃
                </Button>
                <Button classname="default-button delete-button">계정탈퇴</Button>
              </div>

              <div
                className={classnames("content-item", {
                  "is-account-edit": tab === "account-edit",
                  "is-group-manage": tab === "group-manage",
                })}
              >
                {tab === "group-manage" && <GroupManage />}
                {tab === "account-edit" && <AccountEdit />}
                {tab === "follower" && <Follower />}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Mypage;

import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ROOT_API, API_HEADER } from "constants/api";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./follower.scss";
import classNames from "classnames";

const Follower = () => {
  const [text, setText] = useState("");
  const [tab, setTab] = useState(0);
  const auth = useSelector((state) => state.authToken);
  const queryClient = useQueryClient();

  const onChange = (e) => {
    setText(e.target.value);
  };

  //  following 조회: get follows/followings *
  // follower 조회: get follows/followers
  // follow 신청: post follows

  const { mutate: postFollow } = useMutation(
    ["postFollow"],
    (email) =>
      axios.post(
        `${ROOT_API}/follows`,
        {
          email: email,
        },
        {
          headers: {
            API_HEADER,
            atk: auth.accessToken,
          },
        }
      ),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(["follwing"]);
        queryClient.invalidateQueries(["follwers"]);
      },
    }
  );

  const apply = (e) => {
    e.preventDefault();
    console.log("text", text);
    postFollow(text);
  };

  const queries = useQueries({
    queries: [
      // 팔로워 목록
      { queryKey: ["follwing"], queryFn: followsFollowers },
      // 팔로윙 목록
      { queryKey: ["follwers"], queryFn: follwersFollwings },
    ],
  });
  const followers = queries[0].data;
  const followings = queries[1].data;
  console.log("queries", followers, followings);

  async function followsFollowers() {
    const { data } = await axios.get(`${ROOT_API}/follows/followers`, {
      headers: {
        API_HEADER,
        atk: auth.accessToken,
      },
    });
    return data;
  }

  async function follwersFollwings() {
    const { data } = await axios.get(`${ROOT_API}/follows/followings`, {
      headers: {
        API_HEADER,
        atk: auth.accessToken,
      },
    });
    return data;
  }

  return (
    <div className="follower">
      <div className="title">팔로워</div>
      <div className="input-wrap">
        <form onSubmit={apply}>
          <input type="text" value={text} onChange={onChange} />
          <button onClick={apply}> 요청</button>
        </form>
      </div>
      <div className="list">
        <div
          className={classNames("list_tab", {
            is_active: tab === 0,
          })}
          onClick={() => setTab(0)}
        >
          팔로워
        </div>
        <div
          className={classNames("list_tab", {
            is_active: tab === 1,
          })}
          onClick={() => setTab(1)}
        >
          팔로윙
        </div>
      </div>
      <div className="list_content">
        {followers &&
          tab === 0 &&
          followers.map((item, index) => (
            <div key={index}>
              <div>이메일: {item.email}</div>
              <div>이름: {item.name}</div>
            </div>
          ))}
        {followings &&
          tab === 1 &&
          followings.map((item, index) => (
            <div key={index}>
              <div>이메일: {item.email}</div>
              <div>이름: {item.name}</div>
            </div>
          ))}
        {
          // followers.length === 0 && tab === 0 && <div>팔로워가 없습니다.</div>
        }
        {
          // followings.length === 0 && tab === 0 && <div>팔로잉이 없습니다.</div>
        }
      </div>
    </div>
  );
};

export default Follower;

import axios from "axios";
import { ROOT_API, API_HEADER } from "constants/api";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Follower = () => {
  const [text, setText] = useState("");
  const [followings, setFollowings] = useState();
  const [follow, setFollow] = useState();
  const auth = useSelector((state) => state.authToken);

  const onChange = (e) => {
    setText(e.target.value);
  };
  const apply = () => {
    console.log("text", text);
    axios.post(
      `${ROOT_API}/follows`,
      {
        email: text,
      },
      {
        headers: {
          API_HEADER,
          atk: auth.accessToken,
        },
      }
    );
  };

  useEffect(() => {
    axios
      .get(`${ROOT_API}/follows/followings`, {
        headers: {
          API_HEADER,
          atk: auth.accessToken,
        },
      })
      .then((res) => {
        setFollowings(res.data);
      });

    axios
      .get(`${ROOT_API}/follows/follow`, {
        headers: {
          API_HEADER,
          atk: auth.accessToken,
        },
      })
      .then((res) => {
        setFollow(res.data);
      });
  }, []);

  // console.log('dd', followings);

  return (
    <div className="follower">
      <div className="title">팔로워</div>
      <div className="input-wrap">
        <input type="text" value={text} onChange={onChange} />
        <button onClick={apply}>팔로워 요청</button>
      </div>
      <div className="list">
        <div>팔로워</div>
        {follow && follow.map((item, index) => <div key={index}>{item.email}</div>)}
        <div>팔로윙</div>
        {followings && followings.map((item, index) => <div key={index}>{item.email}</div>)}
      </div>
    </div>
  );
};

export default Follower;

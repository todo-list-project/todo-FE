import axios from "axios";
import { ROOT_API, API_HEADER } from "constants/api";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Follower = () => {
  const [text, setText] = useState("");
  const auth = useSelector((state) => state.authToken);

  const onChange = (e) => {
    setText(e.target.value);
  };
  const apply = () => {
    console.log("text", text);
    axios
      .post(
        `${ROOT_API}/follows`,
        {
          email: text,
        },
        {
          headers: {
            API_HEADER,
            atk: auth.accessToken
          },
        }
      )
      .then((res) => {
        console.log("res", res);
      });
  };

  return (
    <div className="follower">
      <div className="title">팔로워</div>
      <div className="input-wrap">
        <input type="text" value={text} onChange={onChange} />
        <button onClick={apply}>팔로워 요청</button>
      </div>
      <div className="list">
        팔로워 리스트
      </div>
    </div>
  );
};

export default Follower;

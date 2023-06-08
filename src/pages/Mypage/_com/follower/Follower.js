import axios from "axios";
import { ROOT_API, API_HEADER } from "constants/api";
import React, { useState } from "react";

const Follower = () => {
  const [text, setText] = useState("");

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
          },
        }
      )
      .then((res) => {
        console.log("res", res);
      });
  };

  return (
    <div className="follower">
      팔로워
      <div className="input-wrap">
        <input type="text" value={text} onChange={onChange} />
        <button onClick={apply}>팔로워 요청</button>
      </div>
    </div>
  );
};

export default Follower;

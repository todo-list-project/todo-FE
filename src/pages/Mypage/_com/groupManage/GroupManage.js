import React, { useState } from "react";
import { AiFillFolderAdd } from "react-icons/ai";

const GroupManage = () => {
  const [createFolder, setCraeteFolder] = useState(false);

  const createfolder = () => {
    setCraeteFolder(!createFolder);
  };

  return (
    <div>
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
    </div>
  );
};

export default GroupManage;

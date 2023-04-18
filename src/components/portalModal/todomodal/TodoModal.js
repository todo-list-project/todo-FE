import classnames from "classnames";
import React, { useEffect, useState } from "react";
import ModalFrame from "../ModalFrame";
import "./todomodal.scss";

const TodoModal = ({ setOnModal }) => {
  return (
    // NOTE: isDim 넣으면 dim 생기고, Dim눌러도 모달 닫힘.
    // onClose 넣으면 close버튼 생기고, close 누르면 모달 닫힘.
    // 둘다 넣으면 둘 중하나만 클릭해도 모달 닫힘
    <ModalFrame setOnModal={setOnModal} classname="info-modal" isDim onClose>
      여기에 내용 입력
      <br/>
      props를 하나 더 뚫어서 수정 상태, 글쓰는 상태등을 체크해도 됩니다.
    </ModalFrame>
  );
};
export default TodoModal;

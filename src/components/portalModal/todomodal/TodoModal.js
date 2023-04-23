import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import ModalFrame from '../ModalFrame';
import TextArea from 'components/input/TextArea';
import './todomodal.scss';

const TodoModal = ({ setOnModal }) => {
  const [modify, setModify] = useState(false);

  return (
    // NOTE: isDim 넣으면 dim 생기고, Dim눌러도 모달 닫힘.
    // onClose 넣으면 close버튼 생기고, close 누르면 모달 닫힘.
    // 둘다 넣으면 둘 중하나만 클릭해도 모달 닫힘
    <ModalFrame setOnModal={setOnModal} classname="info-modal" isDim onClose>
      {modify && <TextArea></TextArea>}
      <br />
      <button
        onClick={() => {
          setModify(true);
        }}
      >
        수정
      </button>
    </ModalFrame>
  );
};
export default TodoModal;

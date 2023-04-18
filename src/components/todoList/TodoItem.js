import TodoModal from "components/portalModal/todomodal/TodoModal";
import React, { useState } from "react";
import './todo.scss';

const TodoItem = ({ data }) => {
  const [onModal, setOnModal] = useState(false);

  return (
    <>
      <div onClick={() => setOnModal(true)} className="todo-item">{data.title}</div>
      {onModal && <TodoModal setOnModal={() => setOnModal()} />}
    </>
  );
};

export default TodoItem;

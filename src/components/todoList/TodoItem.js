import TodoModal from "components/portalModal/todomodal/TodoModal";
import React, { useState } from "react";
import "./todo.scss";

const TodoItem = (props) => {
  const [onModal, setOnModal] = useState(false);

  return (
    <>
      <div onClick={() => setOnModal(true)} className="todo-item" ref={props.ref}>
        <h1>{props.element.title}</h1>
        <div>{props.element.id}</div>
        <div></div>
      </div>
      {onModal && <TodoModal todoItem={props} setOnModal={() => setOnModal()} />}
    </>
  );
};

export default TodoItem;

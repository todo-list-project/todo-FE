import TodoModal from "components/portalModal/todomodal/TodoModal";
import React, { useState } from "react";
import "./todo.scss";
import { reFormatDate } from "../../util/FormatDate";

const TodoItem = (props) => {
  // console.log("todoitem props", props);
  const [onModal, setOnModal] = useState(false);

  const todoFormattedData = reFormatDate(props.element.endDate);
  // console.log("todoFormattedData", todoFormattedData);

  return (
    <>
      <div onClick={() => setOnModal(true)} className="todo-item" ref={props.ref}>
        <h1>제목: {props.element.title}</h1>
        <div>{props.element.id}</div>
        <div>내용: {props.element.description}</div>
        <div>{todoFormattedData}</div>
      </div>
      {onModal && <TodoModal todoItem={props} setOnModal={() => setOnModal()} />}
    </>
  );
};

export default TodoItem;

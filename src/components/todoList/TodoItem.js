import TodoModal from "components/portalModal/todomodal/TodoModal";
import React, { useState } from "react";
import "./todo.scss";
import { reFormatDate } from "../../util/FormatDate";

const TodoItem = (props) => {
  // console.log("todoitem props", props);
  const [onModal, setOnModal] = useState(false);

  const todoFormattedStartData = reFormatDate(props.element.startDate);
  const todoFormattedEndData = reFormatDate(props.element.endDate);
  // console.log("todoFormattedData", todoFormattedEndData);

  return (
    <>
      <div onClick={() => setOnModal(true)} className="todo-item" ref={props.ref}>
        <h1>제목: {props.element.title}</h1>
        <div>{props.element.id}</div>
        <div>내용: {props.element.description}</div>
        <div>시작날짜 : {todoFormattedStartData}</div>
        <div>끝나는 날짜 : {todoFormattedEndData}</div>
      </div>
      {onModal && (
        <TodoModal
          todoItem={props}
          startDate={todoFormattedStartData}
          endDate={todoFormattedEndData}
          setOnModal={() => setOnModal()}
        />
      )}
    </>
  );
};

export default TodoItem;

import React, { useCallback, useEffect, useRef, useState } from "react";
import TodoItem from "./TodoItem";
import "./todo.scss";
import { useDummyData } from "../../api";
import { changeInfiniteScrollDataToArray } from "util/changeInfiniteScrollDataToArray";
import useIntesectionObserver from "hook/useIntesectionObserver";
import { useSelector } from "react-redux";

const TodoList = () => {
  const auth = useSelector((state) => state.authToken);

  const { data, fetchNextPage, hasNextPage, isSuccess } = useDummyData();
  // console.log(data);
  let todoData;
  if (isSuccess) {
    todoData = changeInfiniteScrollDataToArray(data);
  }
  // console.log("뿌려지는 todoData", todoData);
  const onIntersection = useCallback(
    (entries) => {
      // console.log('entries', entries);
      const [target] = entries;

      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, fetchNextPage]
  );

  const { setTarget } = useIntesectionObserver({
    onIntersection,
    options: {
      rootMargin: "10%",
      threshold: 0.25,
    },
  });
  return (
    <div>
      <div className="todo-list">
        {todoData && todoData.map((element, idx) => {
          return <TodoItem element={element} key={idx} />;
        })}
      </div>
      {hasNextPage && (
        <div
          ref={(elem) => setTarget(elem)}
          style={{
            width: "100px",
            height: "50px",
            backgroundColor: "#ccc",
          }}
        >
          로딩중...
        </div>
      )}
    </div>
  );
};

export default TodoList;

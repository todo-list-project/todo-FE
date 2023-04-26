import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import './todo.scss';

const dummyData = [
  {
    id: 0,
    title: '투두123123',
    complete: false,
    depth: {
      1: {
        content: '1텝스',
      },
      2: {
        content: '2텝스',
      },
    },
  },
  {
    id: 1,
    title: '투두123123',
    complete: false,
    depth: {
      1: {
        content: '1텝스',
      },
      2: {
        content: '2텝스',
      },
    },
  },
  {
    id: 2,
    title: '투두123123',
    complete: false,
    depth: {
      1: {
        content: '1텝스',
      },
      2: {
        content: '2텝스',
      },
    },
  },
  {
    id: 3,
    title: '투두123123',
    complete: true,
    depth: {
      1: {
        content: '1텝스',
      },
      2: {
        content: '2텝스',
      },
    },
  },
];

const TodoList = ({ data }) => {
  // NOTE: 추후 intersection observer 를 쓰기 위하여 목록과 아이템 분리

  const [todoName, setTodoName] = useState();

  return (
    <div className="todo-list">
      {dummyData &&
        dummyData.map((item, i) => <TodoItem data={item} key={i} />)}
    </div>
  );
};

export default TodoList;

import React, { useCallback, useEffect, useRef, useState } from 'react';
import TodoItem from './TodoItem';
import './todo.scss';
import { useDummyData } from '../../api';
import { changeInfiniteScrollDataToArray } from 'util/changeInfiniteScrollDataToArray';
import useIntesectionObserver from 'hook/useIntesectionObserver';

const TodoList = () => {
    //api 호출시 pageParam을 반환하지 않아 다음페이지가 나오지 않음
    const { data, fetchNextPage, hasNextPage } = useDummyData();
    // console.log('data', data);
    // console.log(hasNextPage);
    const todoData = changeInfiniteScrollDataToArray(data);
    // console.log('todoData', todoData);
    const onIntersection = useCallback(
        (entries) => {
            console.log('entries', entries);
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
            rootMargin: '10%',
            threshold: 0.25,
        },
    });
    return (
        <div>
            <div className="todo-list">
                {todoData.map((element, idx) => {
                    return <TodoItem element={element} key={idx} />;
                })}
            </div>
            {hasNextPage && <div ref={(elem) => setTarget(elem)}>로딩중...</div>}
        </div>
    );
};

export default TodoList;

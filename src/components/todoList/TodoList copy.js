import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import './todo.scss';

const TodoList = () => {
    const [item, setItem] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);
    const page = useRef(1);
    const targetRef = useRef(null);

    const fetchTodo = useCallback(async () => {
        try {
            const { data } = await axios.get(
                `https://jsonplaceholder.typicode.com/todos?_limit=10&_page=${page.current}}`
            );
            setItem((prevItem) => [...prevItem, ...data]);
            setHasNextPage(data.length === 10);
            if (data.length) {
                pageRef.current;
            }
        } catch (err) {
            console.log(err);
        }
    }, []);

    // NOTE: 추후 intersection observer 를 쓰기 위하여 목록과 아이템 분리
    /*
    fetchTodo이 랜더링 될때 마다 위에서 사용한 useCallback fetchTodo함수를 재사용해서 현재pageRef의 data 값에 이전 데이터를 추가
    */
    useEffect(() => {
        setLoading(true);

        fetchTodo(pageRef.current).then((data) => {
            console.log(1, pageRef.current);
            console.log(1, data);
            setLoading(false);
            setItem((prevItems) => [...prevItems, ...data]);
        });
    }, []);

    const handleIntersection = useCallback(
        (entries) => {
            console.log(2);
            console.log('entries', entries);
            const target = entries[0];
            if (target.isIntersecting) {
                pageRef.current++;
                fetchTodo(pageRef.current).then((data) => {
                    console.log(2, pageRef.current);
                    console.log(2, data);
                    setItem((prevItem) => [...prevItem, ...data]);
                });
            }
        },
        [fetchTodo]
    );

    useEffect(() => {
        setTimeout(() => {
            let options = {
                root: null,
                rootMargin: '0px',
                threshold: 0.3,
            };
            const observer = new IntersectionObserver(handleIntersection, options);
            console.log('observer', observer);
            if (targetRef.current) {
                observer.observe(targetRef.current);
            }
            return () => observer && observer.disconnect();
        }, 200);
    }, [handleIntersection]);

    // NOTE: 추후 intersection observer 를 쓰기 위하여 목록과 아이템 분리
    return (
        <div>
            <div className="todo-list">
                {item?.map((element, idx) => {
                    return <TodoItem element={element} key={idx} />;
                })}
            </div>
            {loading && <div className="LoadingTodoList">Loading.....</div>}
            <div style={{ width: '100%' }} ref={targetRef}></div>
        </div>
    );
};

export default TodoList;

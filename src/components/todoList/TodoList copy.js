import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import './todo.scss';

const TodoList = () => {
    const [item, setItem] = useState([]);
    const [loading, setLoading] = useState(false);
    const pageRef = useRef(1);
    const targetRef = useRef(null);

    const fetchTodo = useCallback(async () => {
        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/todos?_limit=16&_page=${pageRef.current}}`
        );
        console.log('첫 렌더링');
        return response.data;
    }, []);

    // NOTE: 추후 intersection observer 를 쓰기 위하여 목록과 아이템 분리
    /*
    fetchTodo이 랜더링 될때 마다 위에서 사용한 useCallback fetchTodo함수를 재사용해서 현재pageRef의 data 값에 이전 데이터를 추가
    */
    useEffect(() => {
        setLoading(true);
        fetchTodo(pageRef.current).then((data) => {
            console.log('렌더링');
            console.log(pageRef.current, data);
            setLoading(false);
            setItem((prevItems) => [...prevItems, ...data]);
        });
    }, [fetchTodo]);

    const handleIntersection = useCallback(
        (entries) => {
            console.log(2);
            console.log('entries', entries);
            const target = entries[0];
            if (target.isIntersecting) {
                pageRef.current++;
                fetchTodo(pageRef.current).then((data) => {
                    setItem((prevItem) => [...prevItem, ...data]);
                });
            }
        },
        [fetchTodo]
    );

    function handleObserve() {
        const observer = new IntersectionObserver(handleIntersection);
        console.log('관찰', observer);
        if (targetRef.current) {
            observer.observe(targetRef.current);
        }
        return () => observer && observer.disconnect();
    }
    useEffect(() => {}, [handleIntersection]);

    useEffect(() => {
        handleObserve();
    }, []);

    // NOTE: 추후 intersection observer 를 쓰기 위하여 목록과 아이템 분리
    return (
        <div>
            <div className="todo-list">
                {item?.map((element, idx) => {
                    return <TodoItem element={element} key={idx} />;
                })}
            </div>
            {loading && <div>Loading.....</div>}
            <div
                style={{ width: '100%', height: 50, backgroundColor: '#000' }}
                ref={targetRef}
            ></div>
        </div>
    );
};

export default TodoList;

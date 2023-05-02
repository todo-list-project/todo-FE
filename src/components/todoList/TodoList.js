import React, { useEffect, useState } from 'react';
// import TodoItem from './TodoItem';
// import TodoLists from '../../util/dummyData';
import './todo.scss';

// console.log(jsonDummyData);

const TodoList = ({ data }) => {
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
    const jsonDummyData = JSON.stringify(dummyData);

    // NOTE: 추후 intersection observer 를 쓰기 위하여 목록과 아이템 분리
    // const [dummy, setDummy] = useState();
    const [items, setItems] = useState([]);
    const [target, setTarget] = useState(null); //타겟 생성
    const targetStyle = { width: '100%', height: '500px', backgroundColor: '#ccc' }; //요소 크키 정함
    let page = 1;

    // 데이터를 호출하는 부분 (아직 데이터가 원하는 형태로 오지 않음)
    const fetchData = async () => {
        const response = await fetch(jsonDummyData);
        const data = await response.json();
        setItems((prev) => {
            prev.concat(data);
        });
        page++;
    };

    // 데이터 비동기 처리
    useEffect(() => {
        // fetchData();
    }, []);

    useEffect(() => {
        //target이 렌더링되고 observer가 생성되어야해 useEffect 활용
        let observer;
        if (target) {
            //target이 생성되기 전에 observe가 시작하지 못하기 떄문에 조건문 추가
            const onIntersect = async ([entry], observer) => {
                //entry는 intersection observer가 반환하는 IntersectionObserverEntry 의 객체의 배열로 첫번쨰 요소를 가져와 entry에 변수에 할당
                if (entry.isIntersecting) {
                    //isIntersecting은 관찰 대상 요소가 뷰포트와 교차하는지 여부를 boolean으로 반환
                    observer.unobserve(entry.target); //관찰 대상요소가 뷰포트와 교차하면 실행되는 조건문으로 관찰대상에서 제외
                    await fetchData(); // 데이터 페칭함수
                    observer.observe(entry.target); // 끝나면 관찰 대상을 다시 추가
                }
            };

            observer = new IntersectionObserver(onIntersect, { threshold: 1 });
            observer.observe(target);
        }
        console.log('observer', observer);
        return () => {
            observer && observer.disconnect();
        };
    }, [target]);

    return (
        <div>
            {/* {items.map((e) => {
                console.log(e);
            })} */}
            <div ref={setTarget} style={targetStyle}>
                target
            </div>
        </div>
    );
};

export default TodoList;

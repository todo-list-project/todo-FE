import TodoModal from 'components/portalModal/todomodal/TodoModal';
import React, { useState } from 'react';
import './todo.scss';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/modalSlice';

const TodoItem = (props) => {
    // console.log('todoItem', props);
    // const dispatch = useDispatch();

    // const handleTodoClick = () => {
    //     dispatch(openModal(props.element));
    // };

    const [onModal, setOnModal] = useState(false);

    return (
        <>
            <div onClick={() => setOnModal(true)} className="todo-item" ref={props.ref}>
                {props.element.title}
                <div>{props.element.id}</div>
            </div>
            {onModal && <TodoModal todoItem={props} setOnModal={() => setOnModal()} />}
        </>
    );
};

export default TodoItem;

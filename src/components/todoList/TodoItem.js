import TodoModal from 'components/portalModal/todomodal/TodoModal';
import React, { useState } from 'react';
import './todo.scss';

const TodoItem = (props) => {
    // console.log('TodoItem', props);
    const [onModal, setOnModal] = useState(false);

    return (
        <>
            <div onClick={() => setOnModal(true)} className="todo-item" ref={props.ref}>
                {props.element.title}
                <div>{props.element.id}</div>
            </div>
            {onModal && <TodoModal setOnModal={() => setOnModal()} />}
        </>
    );
};

export default TodoItem;

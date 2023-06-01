import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import ModalFrame from '../ModalFrame';
import TextArea from 'components/input/TextArea';
import DatePicker from '../../datepicker/DatePicker';
import './todomodal.scss';

const TodoModal = ({ setOnModal, todoItem }) => {
    // console.log('todoItem', todoItem);
    const [modify, setModify] = useState(false);
    const [startDate, setStartDate] = useState(new Date('2023-04-23')); //시작 날짜
    const [endDate, setEndDate] = useState(new Date('2023-05-01')); //끝 날짜

    return (
        // NOTE: isDim 넣으면 dim 생기고, Dim눌러도 모달 닫힘.
        // onClose 넣으면 close버튼 생기고, close 누르면 모달 닫힘.
        // 둘다 넣으면 둘 중하나만 클릭해도 모달 닫힘
        <ModalFrame setOnModal={setOnModal} classname="info-modal" isDim onClose>
            <div>{todoItem.element.id}</div>
            {modify ? (
                <TextArea todoItem={todoItem.element.title}></TextArea>
            ) : (
                todoItem.element.title
            )}
            <br />

            <DatePicker
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
            />
            <button
                onClick={() => {
                    setModify(true);
                }}
            >
                수정
            </button>
        </ModalFrame>
    );
};
export default TodoModal;

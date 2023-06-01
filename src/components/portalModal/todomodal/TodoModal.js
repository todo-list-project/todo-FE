import { DatePicker } from 'antd';
import TextArea from 'components/input/TextArea';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import ModalFrame from '../ModalFrame';
import './todomodal.scss';

const TodoModal = ({ setOnModal, todoItem }) => {
  const { RangePicker } = DatePicker;
  // console.log('todoItem', todoItem);
  const [modify, setModify] = useState(false);
  const [startDate, setStartDate] = useState(new Date('2023-04-23')); //시작 날짜
  const [endDate, setEndDate] = useState(new Date('2023-05-01')); //끝 날짜
  const [dates, setDates] = useState(null);
  const [value, setValue] = useState(null);

  // rangpicker
  const disabledDate = current => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') >= 365;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') >= 365;
    return !!tooEarly || !!tooLate;
  };

  const onOpenChange = open => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };
  // rangpicker

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

      <RangePicker
        value={dates || value}
        disabledDate={disabledDate}
        onCalendarChange={val => {
          setDates(val);
        }}
        onChange={val => {
          setValue(val);
        }}
        onOpenChange={onOpenChange}
        changeOnBlur
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

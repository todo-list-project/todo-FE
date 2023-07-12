import { DatePicker } from "antd";
import TextArea from "components/input/TextArea";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ModalFrame from "../ModalFrame";
import "./todomodal.scss";
import Button from "components/button/Button";

const TodoModal = ({ setOnModal, todoItem, startDate, endDate }) => {
  const { RangePicker } = DatePicker;
  console.log("todoItem", todoItem.element.startDate);
  const [modify, setModify] = useState(false); //수정모드

  const [dates, setDates] = useState(null);
  const [value, setValue] = useState(null);
  // console.log(dates);
  // rangpicker
  const disabledDate = (current) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], "days") >= 365;
    const tooEarly = dates[1] && dates[1].diff(current, "days") >= 365;
    return !!tooEarly || !!tooLate;
  };

  const onOpenChange = (open) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };
  // rangpicker

  const handleTitle = (e) => {
    console.log(e);
    setModify(true);
  };

  const cancelModifyTitle = () => {
    setModify(false);
  };
  return (
    // NOTE: isDim 넣으면 dim 생기고, Dim눌러도 모달 닫힘.
    // onClose 넣으면 close버튼 생기고, close 누르면 모달 닫힘.
    // 둘다 넣으면 둘 중하나만 클릭해도 모달 닫힘
    <ModalFrame setOnModal={setOnModal} classname="info-modal" isDim onClose>
      <div className="todo-modal-id">{todoItem.element.id}</div>
      {modify === true ? (
        <>
          <TextArea TodoContent={todoItem.element.title} />
          <div className="modify-modal-title-buttonWrap">
            <Button size="small" color="gray" onClick={cancelModifyTitle}>
              취소
            </Button>
            <Button size="small" color="green">
              저장
            </Button>
          </div>
        </>
      ) : (
        <div onClick={handleTitle}>{todoItem.element.title}</div>
      )}
      <br />
      <div className="todo-modal-bottomWrap">
        <div className="todo-modal-rangePickerWrap">
          <RangePicker
            value={dates || value}
            disabledDate={disabledDate}
            onCalendarChange={(val) => {
              setDates(val);
            }}
            onChange={(val) => {
              setValue(val);
            }}
            onOpenChange={onOpenChange}
            changeOnBlur
            placeholder={[`${startDate}`, `${endDate}`]}
          />
        </div>
        <div className="todo-modal-btnWrap">
          <button className="todo-modal-cancelBtn">취소</button>
        </div>
      </div>
    </ModalFrame>
  );
};
export default TodoModal;

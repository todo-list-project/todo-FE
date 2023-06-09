import { Button, Calendar, Checkbox, Input, Modal } from "antd";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./writemodal.scss";

const WriteModal = ({ visible, onCancel, onSave, initialValue }) => {
  const [value, setValue] = useState(initialValue);
  const [isChecked, setIsChecked] = useState(false);
  const [checkDay, setCheckDay] = useState();
  const [calendar, setCalendar] = useState(false);

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSave = async () => {
    onSave(value);
    setCalendar(!calendar);
  };

  const handleCancel = () => {
    onCancel();
    setCalendar(!calendar);
  };

  const onPanelChange = (e, mode) => {
    console.log(mode);
    setCheckDay(e.$d);
  };

  const openClender = () => {
    setCalendar(!calendar);
  };

  return (
    <Modal open={visible} onCancel={handleCancel} footer={null}>
      <Input.TextArea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Write something"
        autoSize={{ minRows: 4, maxRows: 5 }}
      />
      <Checkbox checked={isChecked} onChange={handleCheckboxChange}>
        친구에게도 보이기
      </Checkbox>
      <div style={{ marginTop: "1rem", textAlign: "right" }}>
        <Button onClick={handleCancel} style={{ marginRight: "0.5rem" }}>
          취소
        </Button>
        <Button type="primary" onClick={handleSave}>
          저장
        </Button>
      </div>
      <Button onClick={openClender}>달력</Button>
      {calendar && (
        <div className="calenderWrap">
          <Calendar style={{}} onPanelChange={onPanelChange}>
            달력
          </Calendar>
        </div>
      )}

      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
          setDateRange(update);
        }}
        isClearable={true}
      />
    </Modal>
  );
};

export default WriteModal;

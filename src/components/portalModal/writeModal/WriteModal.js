import React, { useState } from 'react';
import { Modal, Button, Input, Checkbox, Calendar } from 'antd';
import '../writeModal/writemodal.scss';

const WriteModal = ({ visible, onCancel, onSave, initialValue }) => {
  const [value, setValue] = useState(initialValue);
  const [isChecked, setIsChecked] = useState(false); //친구에게만 보이기
  const [checkDay, setCheckDay] = useState(); // 달력 날짜
  const [calendar, setCalendar] = useState(false); // 달력 오픈

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

  const handleSelect = (data) => {
    // console.log(mode);
    // console.log('선택', data);
    setCheckDay(data.$d);
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
      <div style={{ marginTop: '1rem', textAlign: 'right' }}>
        <Button onClick={handleCancel} style={{ marginRight: '0.5rem' }}>
          취소
        </Button>
        <Button type="primary" onClick={handleSave}>
          저장
        </Button>
      </div>
      <Button onClick={openClender}>달력</Button>

      {calendar && (
        <div className="calenderWrap">
          <Calendar onSelect={handleSelect} />
        </div>
      )}
    </Modal>
  );
};

export default WriteModal;

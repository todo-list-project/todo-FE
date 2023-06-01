import { useMutation } from '@tanstack/react-query';
import { Button, Checkbox, ConfigProvider, DatePicker, Input, Modal } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import FormatDate from '../../../util/FormatDate';
import './writemodal.scss';

const WriteModal = ({ visible, onCancel, onSave, initialValue }) => {
  const { RangePicker } = DatePicker;

  const [title, setTitle] = useState('');
  const [isChecked, setIsChecked] = useState(false); //친구에게만 보이기
  const [data, setData] = useState();
  const [dates, setDates] = useState(null);
  const [contents, setContents] = useState(null);
  const [value, setValue] = useState(null);
  const [startNewDate, setStartNewDate] = useState(null);
  const [endNewDate, setEndNewDate] = useState(null);

  // console.log('value1', startNewDate);
  // console.log('value2', endNewDate);
  // console.log('dates', dates);
  // console.log('value', value);
  const changeTitle = e => {
    setTitle(e.target.value);
  };

  const changeArea = e => {
    setContents(e.target.value);
  };

  const handleCheckboxChange = e => {
    setIsChecked(e.target.checked);
  };

  useEffect(() => {
    if (value) {
      const startDate = FormatDate(value[0].$d);
      const endDate = FormatDate(value[1].$d);
      setStartNewDate(startDate);
      setEndNewDate(endDate);
    }
  }, [value]);

  useEffect(() => {
    // console.log('startNewDate', startNewDate);
    // console.log('endNewDate', endNewDate);
    setData({
      title: title,
      description: contents,
      shared: isChecked,
      startDate: startNewDate,
      endDate: endNewDate,
    });
  }, [title, isChecked, startNewDate, endNewDate]);

  //서버로 문의글 전송
  const writeTodo = async () => {
    try {
      const response = await axios.post('http://localhost:4000/todos', {
        title: title,
        description: contents,
        shared: isChecked,
        startDate: startNewDate,
        endDate: endNewDate,
      });
      console.log('response', response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const mutation = useMutation(writeTodo);
  //전송
  const handleSave = async () => {
    console.log('mutation', mutation);
    mutation.mutate();
    onSave();
  };

  //취소
  const handleCancel = () => {
    onCancel();
  };

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
    <Modal open={visible} onCancel={handleCancel} footer={null}>
      <Input style={{ marginBottom: '30px' }} placeholder="title" value={title} onChange={changeTitle} />
      <Input.TextArea
        value={contents}
        onChange={changeArea}
        placeholder="Write something"
        autoSize={{ minRows: 2, maxRows: 3 }}
      />
      <Checkbox checked={isChecked} onChange={handleCheckboxChange}>
        친구에게도 보이기
      </Checkbox>
      <div className="writeModalBottom">
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

        <div>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#00b96b',
              },
            }}
          >
            <Button onClick={handleCancel} style={{ marginRight: '0.5rem' }}>
              취소
            </Button>
            <Button type="primary" onClick={handleSave}>
              저장
            </Button>
          </ConfigProvider>
        </div>
      </div>
    </Modal>
  );
};

export default WriteModal;

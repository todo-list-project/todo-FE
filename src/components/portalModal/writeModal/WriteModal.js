import { Button, Checkbox, ConfigProvider, Input, Modal } from 'antd';
import { useEffect, useMemo, useState } from 'react';
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './writemodal.scss';
import DatePicker from '../../datepicker/DatePicker';
import FormatDate from '../../../util/FormatDate';

const WriteModal = ({ visible, onCancel, onSave, initialValue }) => {
    const [value, setValue] = useState(initialValue);
    const [title, setTitle] = useState();
    const [isChecked, setIsChecked] = useState(false); //친구에게만 보이기
    const [startDate, setStartDate] = useState(new Date('2023-04-23')); //시작 날짜
    const [endDate, setEndDate] = useState(new Date('2023-05-01')); //끝 날짜
    let startNewDate = ''; //변환 한 시작날짜
    let endNewDate = ''; //변환한 마지막날짜

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const handleSave = async () => {
        onSave(value);
    };

    const handleCancel = () => {
        onCancel();
    };

    useMemo(() => {
        startNewDate = FormatDate(startDate);
        // console.log('새로운 시작날짜', startNewDate);
        endNewDate = FormatDate(endDate);
        // console.log('새로운 끝날짜', endNewDate);
    }, [startDate, endDate]);

    return (
        <Modal open={visible} onCancel={handleCancel} footer={null}>
            <Input
                style={{ marginBottom: '30px' }}
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
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

            <DatePicker
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
            />
        </Modal>
    );
};

export default WriteModal;

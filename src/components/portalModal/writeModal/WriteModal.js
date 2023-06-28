import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Checkbox, ConfigProvider, DatePicker, Input, Modal } from "antd";
import { useCallback, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_HEADER, ROOT_API } from "../../../constants/api";
import { formatDate } from "../../../util/FormatDate";
import "./writemodal.scss";

const WriteModal = ({ visible, onCancel }) => {
  const { RangePicker } = DatePicker;

  const [data, setData] = useState({
    title: "",
    description: "",
    shared: false,
    startDate: null,
    endDate: null,
  });
  const [dates, setDates] = useState(null);
  const [value, setValue] = useState(null);
  const [startNewDate, setStartNewDate] = useState(null);
  const [endNewDate, setEndNewDate] = useState(null);
  const auth = useSelector((state) => state.authToken);
  const queryClient = useQueryClient();

  const changeTitle = (e) => {
    setData({ ...data, title: e.target.value });
  };

  const changeArea = (e) => {
    setData({ ...data, description: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setData({ ...data, shared: e.target.checked });
  };

  useEffect(() => {
    if (value) {
      const startDate = formatDate(value[0].$d);
      const endDate = formatDate(value[1].$d);
      setStartNewDate(startDate);
      setEndNewDate(endDate);
    }
  }, [value]);

  //서버로 글 전송
  const addTodo = async () => {
    // console.log("data.title", data.title);
    const response = await axios.post(
      `${ROOT_API}/posts/create`,
      {
        title: data.title,
        description: data.description,
        shared: data.shared,
        startDate: startNewDate,
        endDate: endNewDate,
      },
      {
        headers: { API_HEADER, atk: auth.accessToken },
      }
    );
    return response;
  };

  const { mutate } = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      console.log("queryClient", queryClient);
    },
  });

  //전송
  const handleSave = useCallback(() => {
    mutate(data);
    onCancel();
    // setData({ title: "", description: "", shared: false, startDate: null, endDate: null });
  }, [mutate, data, onCancel]);

  //취소
  const handleCancel = () => {
    onCancel();
    setData({ title: "", description: "", shared: false, startDate: null, endDate: null });
  };

  useEffect(() => {
    if (!visible) {
      setData({ title: "", description: "", shared: false, startDate: null, endDate: null });
    }
  }, [visible]);

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
  return (
    <Modal open={visible} onCancel={handleCancel} footer={null}>
      <Input style={{ marginBottom: "30px" }} placeholder="title" value={data.title} onChange={changeTitle} />
      <Input.TextArea
        value={data.description}
        onChange={changeArea}
        placeholder="Write something"
        autoSize={{ minRows: 2, maxRows: 3 }}
      />
      <Checkbox checked={data.shared} onChange={handleCheckboxChange}>
        친구에게도 보이기
      </Checkbox>
      <div className="writeModalBottom">
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
        />

        <div>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#00b96b",
              },
            }}
          >
            <Button onClick={handleCancel} style={{ marginRight: "0.5rem" }}>
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

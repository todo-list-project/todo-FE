import React, { useState } from 'react';
import { Modal, Button, Input } from 'antd';

const WriteModal = ({ visible, onCancel, onSave, initialValue }) => {
  console.log(visible);
  const [value, setValue] = useState(initialValue);

  const handleSave = () => {
    onSave(value);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal open={visible} onCancel={handleCancel} footer={null}>
      <Input.TextArea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Write something"
        autoSize={{ minRows: 3, maxRows: 5 }}
      />
      <div style={{ marginTop: '1rem', textAlign: 'right' }}>
        <Button onClick={handleCancel} style={{ marginRight: '0.5rem' }}>
          Cancel
        </Button>
        <Button type="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default WriteModal;

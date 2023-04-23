import Button from 'components/button/Button';
import Filter from 'components/filter/Filter';
import Header from 'components/header/Header';
import TodoModal from 'components/portalModal/todomodal/TodoModal';
import Tab from 'components/tab/Tab';
import TodoList from 'components/todoList/TodoList';
import WriteModal from 'components/portalModal/writeModal/WriteModal';
import ControllerBox from 'layout/controllerBox/ControllerBox';
import { useState } from 'react';

const Main = () => {
  const [onModal, setOnModal] = useState(false);
  const [visible, setVisible] = useState(false);
  // const modal = useSelector((state) => state.modal.value);
  const [todoData, setTodoData] = useState([]);
  const handleModalCancel = () => {
    setVisible(false);
  };

  const handleModalSave = (value) => {
    // Perform actions on the saved value
    setTodoData(value);
  };

  return (
    <div className="page main-page">
      <Header />
      <div className="content">
        <Tab nav={['내 할일', '친구와 함께']} />
        <ControllerBox>
          <Filter />
          <Button
            onClick={() => setVisible(true)}
            classname={'default-button add-button'}
          >
            할일 추가
          </Button>
        </ControllerBox>
        <TodoList todoData={todoData} />
      </div>
      <WriteModal
        visible={visible}
        onCancel={handleModalCancel}
        onSave={handleModalSave}
      />
      {onModal && <TodoModal setOnModal={() => setOnModal()} />}
    </div>
  );
};

export default Main;

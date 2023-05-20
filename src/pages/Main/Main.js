import Button from 'components/button/Button';
import Filter from 'components/filter/Filter';
import Header from 'components/header/Header';
import TodoModal from 'components/portalModal/todomodal/TodoModal';
import Tab from 'components/tab/Tab';
import TodoList from 'components/todoList/TodoList';
import WriteModal from 'components/portalModal/writeModal/WriteModal';
import ControllerBox from 'layout/controllerBox/ControllerBox';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal } from '../../store/modalSlice';
import TopButton from 'components/topButton/TopButton';

const Main = () => {
    const [onModal, setOnModal] = useState(false);
    const [visible, setVisible] = useState(false);
    const [todoData, setTodoData] = useState('');

    const dispatch = useDispatch();

    // console.log('할일추가 ', todoData);
    const handleModalCancel = () => {
        setVisible(false);
    };

    const handleModalSave = (value) => {
        setTodoData(value);
        setVisible(false);
    };

    return (
        <div className="page main-page">
            <Header />
            <div className="content">
                <Tab nav={['내 할일', '친구와 함께']} classname="todo-tab" />
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
            <WriteModal visible={visible} onCancel={handleModalCancel} onSave={handleModalSave} />
            {onModal && <TodoModal setOnModal={() => setOnModal()} />}
        </div>
    );
};

export default Main;

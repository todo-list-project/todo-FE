import Button from "components/button/Button";
import Filter from "components/filter/Filter";
import Header from "components/header/Header";
import TodoModal from "components/portalModal/todomodal/TodoModal";
import Tab from "components/tab/Tab";
import TodoList from "components/todoList/TodoList";
import ControllerBox from "layout/controllerBox/ControllerBox";
import { useState } from "react";

const Main = () => {
  const [onModal, setOnModal] = useState(false);

  return (
    <div className="page main-page">
      <Header />
      <div className="content">
        <Tab nav={["내 할일", "친구와 함께"]} />
        <ControllerBox>
          <Filter />
          <Button
            onClick={() => setOnModal(true)}
            classname={"default-button add-button"}
          >
            할일 추가
          </Button>
        </ControllerBox>
        <TodoList />
      </div>
      {onModal && <TodoModal setOnModal={() => setOnModal()} />}
    </div>
  );
};

export default Main;

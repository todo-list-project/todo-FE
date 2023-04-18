import Header from "components/header/Header";
import Tab from "components/tab/Tab";
import React from "react";

const Main = () => {
  return (
    <div className="page main-page">
      <Header />
      <Tab nav={["내 할일", "친구와 함께"]} />
    </div>
  );
};

export default Main;

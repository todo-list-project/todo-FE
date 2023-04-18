import React, { useState } from "react";
import classNames from "classnames";
import "./tab.scss";

const Tab = ({ nav }) => {
  const [tabActive, setTabActive] = useState(0);

  return (
    <div className="tab todo-tab">
      {nav &&
        nav.map((item, i) => (
          <div
            key={i}
            className={classNames("tab-item", {
              "is-active": tabActive === i,
            })}
            onClick={() => setTabActive(i)}
          >
            {item}
          </div>
        ))}
    </div>
  );
};

export default Tab;

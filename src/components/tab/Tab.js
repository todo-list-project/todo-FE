import React, { useState } from "react";
import classNames from "classnames";
import "./tab.scss";

const Tab = ({ nav, classname }) => {
  const [tabActive, setTabActive] = useState(0);

  return (
    <div className={classNames("tab", classname)}>
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

import React from "react";

const Tab = ({ nav }) => {
  console.log("cc", nav);
  return (
    <div className="tab">
      {nav &&
        nav.map((item, i) => (
          <div key={i} className="tab-item">
            {item}
          </div>
        ))}
    </div>
  );
};

export default Tab;

import React from "react";
import "./button.scss";
import classNames from "classnames";

const Button = ({ children, classname, onClick, type, size, color }) => {
  return (
    <button className={classNames("Button", size, color)} onClick={onClick} type={type}>
      {children}
    </button>
  );
};
Button.defaultProps = {
  size: "medium",
};

export default Button;

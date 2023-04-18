import React from "react";
import './button.scss';

const Button = ({ children, classname, onClick }) => {
  return (
    <button className={classname} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

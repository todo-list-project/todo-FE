import React from "react";
import './button.scss';

const Button = ({ children, classname }) => {
  return <button className={classname}>{children}</button>;
};

export default Button;

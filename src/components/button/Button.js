import React from 'react';
import './button.scss';

const Button = ({ children, classname, onClick, type }) => {
    return (
        <button className={classname} onClick={onClick} type={type}>
            {children}
        </button>
    );
};

export default Button;

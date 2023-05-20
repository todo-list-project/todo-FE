import React from 'react';
import './textarea.scss';
const TextArea = (TodoContent) => {
    console.log('TodoContent', TodoContent);
    return (
        <div className="ModalTextWrap">
            <textarea>{TodoContent.todoItem}</textarea>
        </div>
    );
};

export default TextArea;

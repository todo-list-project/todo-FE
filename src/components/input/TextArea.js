import React from "react";
import "./textarea.scss";

const TextArea = (TodoContent) => {
  console.log("TodoContent", TodoContent);
  //   CancelModify();
  return (
    <>
      <div className="ModalTextWrap">
        <textarea placeholder={TodoContent.TodoContent}></textarea>
      </div>
    </>
  );
};

export default TextArea;

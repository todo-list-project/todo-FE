import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "./modalSlice";
import "./Modal.scss";

function Modal() {
  const content = useSelector((state) => state.modal.content);
  const isOpen = useSelector((state) => state.modal.isOpen);
  const dispatch = useDispatch();

  const modalEl = document.getElementById("modal");
  const overlayEl = document.getElementById("overlay-root");

  const handleOpenModal = () => {
    dispatch(openModal("안녕하세요!"));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const modalContent = (
    <div className="modal">
      <div className="modal__content">{content}</div>
      <button className="modal__close" onClick={handleCloseModal}>
        닫기
      </button>
    </div>
  );

  const overlayContent = <div className="overlay" />;

  return isOpen ? (
    createPortal(
      <>
        {overlayContent}
        {modalContent}
      </>,
      modalEl
    )
  ) : (
    <button onClick={handleOpenModal}>열기</button>
  );
}

export default Modal;

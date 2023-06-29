function GlobalModal() {
    // modal type을 string 형태로 받습니다.
    const { modalType, isOpen } = useSelector(selectModal);

    const dispatch = useDispatch();

    if (!isOpen) return;

    const findModal = MODAL_COMPONENTS.find((modal) => {
        return modal.type === modalType;
    });

    const renderModal = () => {
        return findModal.component;
    };
    return (
        <Container>
            <Overlay onClick={() => dispatch(closeModal())} />
            {renderModal()}
        </Container>
    );
}

export default GlobalModal;

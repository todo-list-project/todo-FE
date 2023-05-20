import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    modalType: '',
    isOpen: false,
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, actions) => {
            const { modalType } = actions.payload;
            state.modalType = modalType;
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false;
        },
    },
});

//actions을 외부에서 사용하기 위해 export
export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;

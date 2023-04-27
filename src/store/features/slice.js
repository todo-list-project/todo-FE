import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  show: 'NO',
  mode: '',
};

export const modalSlice = createSlice({
  name: 'modal', //이 slice의 이름 만들기
  initialState, // 초기 값
  reducers: {
    showModal: (state) => {
      state.show = 'YES';
    },
    notShowModal: (state) => {
      state.show = 'NO';
    },
    changeMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { showModal, notShowModal, changeMode } = modalSlice.actions; //reducer함수를 export해서 밖에서도 쓸 수 있다

export default modalSlice.reducer;

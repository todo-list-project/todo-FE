import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './features/slice';

export const MyStore = configureStore({
  reducer: {
    modal: modalReducer,
  },
});

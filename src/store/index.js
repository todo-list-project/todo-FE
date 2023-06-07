import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './modalSlice';
import tokenReducer from './Auth';

export default configureStore({
  reducer: {
    authToken: tokenReducer,
    todo: todoReducer,
  },
});

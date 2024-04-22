import { configureStore } from "@reduxjs/toolkit";
import walletReducer from './walletSlice';
import filterReducer from './filterSlice';
import modalReducer from './modalSlice';

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    filter: filterReducer,
    modal: modalReducer
  }
});
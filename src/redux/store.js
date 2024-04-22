import { configureStore } from "@reduxjs/toolkit";
import walletReducer from './walletSlice';
import filterReducer from './filterSlice';
import modalReducer from './modalSlice';
import bidReducer from './bidSlice';

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    filter: filterReducer,
    modal: modalReducer,
    bid: bidReducer
  }
});
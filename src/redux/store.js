import { configureStore } from "@reduxjs/toolkit";
import walletReducer from './walletSlice';
import filterReducer from './filterSlice';

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    filter: filterReducer
  }
});
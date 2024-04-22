import { createSlice } from "@reduxjs/toolkit";

export const bidSlice = createSlice({
  name: 'filter',
  initialState: {
    "code": '',
    "codein": '',
    "name": '',
    "high": '',
    "low": '',
    "varBid": '',
    "pctChange": '',
    "bid": '',
    "ask": '',
    "timestamp": '',
    "create_date": ''
  },
  reducers: {
    setBid: (state, action) => {
      return action.payload;
    }
  },
});

export const { setBid } = bidSlice.actions;
export default bidSlice.reducer;

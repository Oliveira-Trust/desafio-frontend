import { createSlice } from "@reduxjs/toolkit";

export const walletSlice = createSlice({
  name: 'wallet',
  initialState:{
    wallets: [],
    isLoading: false,
    error: null
  },
  reducers: {
    setWallets: (state, action) => {
      state.wallets = action.payload;
    }
  }
});

export const { setWallets } = walletSlice.actions;
export default walletSlice.reducer;
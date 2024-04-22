import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modalWallet: false,
    modalDelete: false
  },
  reducers: {
    setModalWallet: (state, action) => {
      state.modalWallet = action.payload;
    },
    setModalDelete: (state, action) => {
      state.modalDelete = action.payload
    }
  },
});

export const { setModalWallet, setModalDelete } = modalSlice.actions;
export default modalSlice.reducer;
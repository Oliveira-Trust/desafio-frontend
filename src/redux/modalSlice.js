import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modalWallet: {
      opened: false, id: ''
    },
    modalDelete: {
      opened: false, id: ''
    }
  },
  reducers: {
    setModalWallet: (state, action) => {
      state.modalWallet.opened = action.payload.opened;
      state.modalWallet.id = action.payload.id;
    },
    setModalDelete: (state, action) => {
      state.modalDelete.opened = action.payload.opened;
      state.modalDelete.id = action.payload.id;
    }
  },
});

export const { setModalWallet, setModalDelete } = modalSlice.actions;
export default modalSlice.reducer;
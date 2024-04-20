import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    nome: '',
    sobrenome: '',
    email: ''
  },
  reducers: {
    setNome: (state, action) => {
      state.nome = action.payload;
    },
    setSobrenome: (state, action) => {
      state.sobrenome = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    }
  },
});

export const { setNome, setSobrenome, setEmail } = filterSlice.actions;
export default filterSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  message: null,
  isLoading: false,
};

export const mainSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAuth: state => {
      state.isAuth = true;
      state.isLoading = false;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
    },
    clearMessage: state => {
      state.message = null;
    },
    setSpinner: state => {
      state.isLoading = true;
    },
    clearSpinner: state => {
      state.isLoading = false;
    },
  },
});

export const {setAuth, setMessage, clearMessage, setSpinner, clearSpinner} =
  mainSlice.actions;

export default mainSlice.reducer;

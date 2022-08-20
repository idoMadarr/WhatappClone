import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
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
  },
});

export const {} = mainSlice.actions;

export default mainSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  user: null,
  message: null,
  activeClients: [],
  isLoading: false,
};

export const mainSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = true;
      state.user = action.payload;
      state.isLoading = false;
    },
    setLogout: state => {
      state.isAuth = false;
      state.isLoading = false;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
    },
    clearMessage: state => {
      state.message = null;
    },
    setActiveClients: (state, action) => {
      state.activeClients.push(action.payload);
    },
    clearActiveClient: (state, action) => {
      const email = action.payload.email;
      state.activeClients = state.activeClients.filter(
        user => user.email !== email,
      );
    },
    setSpinner: state => {
      state.isLoading = true;
    },
    clearSpinner: state => {
      state.isLoading = false;
    },
  },
});

export const {
  setAuth,
  setLogout,
  setMessage,
  clearMessage,
  setActiveClients,
  clearActiveClient,
  setSpinner,
  clearSpinner,
} = mainSlice.actions;

export default mainSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  user: null,
  message: null,
  io: null,
  activeClients: [],
  isLoading: false,
};

export const mainSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
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
      console.log(action.payload);
      const userSocket = {
        email: action.payload.email,
        clientId: action.payload.clientId,
      };
      state.activeClients.push(userSocket);
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
    setSocket: (state, action) => {
      state.io = action.payload;
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
  setSocket,
} = mainSlice.actions;

export default mainSlice.reducer;

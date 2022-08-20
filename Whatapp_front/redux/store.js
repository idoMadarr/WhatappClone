import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import mainSlice from './slice';

const rootReducer = combineReducers({
  mainSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

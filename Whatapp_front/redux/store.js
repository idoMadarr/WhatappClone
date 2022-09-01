import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import mainSlice from './slice';

const createDebugger = require('redux-flipper').default;

const rootReducer = combineReducers({
  mainSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(createDebugger()),
});

export default store;

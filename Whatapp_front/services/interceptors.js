import axios from 'axios';
import store from '../redux/store';
import {setMessage} from '../redux/slice';

axios.interceptors.response.use(
  response => response.data,
  error => {
    const message = error.response.data;
    console.log(error.response.data);
    store.dispatch(setMessage(message));
    return false;
  },
);

export default axios;

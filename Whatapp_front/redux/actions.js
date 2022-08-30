import axios from '../services/interceptors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from '../utils/rootNavigation';
import {clearSpinner} from './slice';
import * as Domains from '../fixtures/domain.json';

const URL = 'http://10.0.2.2:5000/' || Domains.LocalHost;

export const verifyMailBox =
  (userMail, setVerificationMode) => async dispatch => {
    const body = {userMail};
    const data = await axios.post(`${URL}auth/verification`, body);
    AsyncStorage.setItem('temp_pass', data.pass);
    setVerificationMode(false);
    dispatch(clearSpinner());
  };

export const signUp = state => async () => {
  console.log(2);
  const data = await axios.post(`${URL}auth/sign-up`, state);
  if (data.token) navigate('verification-screen', {email: state.email});
};

export const signIn = state => async dispatch => {
  console.log(`${URL}auth/sign-in`);
  const data = await axios.post(`${URL}auth/sign-in`, state);
};

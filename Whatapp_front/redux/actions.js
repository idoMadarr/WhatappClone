import axios from '../services/interceptors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from '../utils/rootNavigation';
import {setAuth, clearSpinner} from './slice';
import * as Domains from '../fixtures/domain.json';

const URL = Domains.LocalHost;

export const verifyMailBox =
  (userMail, setVerificationMode) => async dispatch => {
    const body = {userMail};
    const data = await axios.post(`${URL}auth/verification`, body);
    if (data === false) return;

    AsyncStorage.setItem('temp_pass', data.pass);
    setVerificationMode(false);
    dispatch(clearSpinner());
  };

export const signUp = state => async () => {
  const data = await axios.post(`${URL}auth/sign-up`, state);
  if (data === false) return;

  navigate('verification-screen', {email: state.email});
};

export const signIn = state => async dispatch => {
  const data = await axios.post(`${URL}auth/sign-in`, state);
  if (data === false) return;

  dispatch(setAuth());
};

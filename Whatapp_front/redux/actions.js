import axios from '../services/interceptors';
import {setAuth, setLogout, clearSpinner} from './slice';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import * as Domains from '../fixtures/domain.json';

// Utils
import {navigate} from '../utils/rootNavigation';
import {setStorage, clearStorage, getStorage} from '../utils/asyncStorage';
import {connectOAuth} from '../utils/connectOAuth';

const URL = Domains.EmulatorHost;

export const verifyMailBox =
  (userMail, setVerificationMode) => async dispatch => {
    const body = {userMail};
    const data = await axios.post(`${URL}auth/verification`, body);
    if (data === false) return;

    setStorage('temp_pass', data.pass);
    setVerificationMode(false);
    dispatch(clearSpinner());
  };

export const activateAccount = state => async dispatch => {
  const data = await axios.post(`${URL}auth/account-verification`, state);
  if (data === false) return;

  let user = await getStorage('user_credentials');
  user.activated = true;
  setStorage('user_credentials', user);
  dispatch(setAuth());
};

export const signUp = state => async () => {
  const data = await axios.post(`${URL}auth/sign-up`, state);
  if (data === false) return;

  setStorage('user_credentials', data);
  navigate('verification-screen', {email: state.email});
};

export const signIn = state => async dispatch => {
  const data = await axios.post(`${URL}auth/sign-in`, state);
  if (data === false) return;

  setStorage('user_credentials', data);
  dispatch(setAuth(data));
};

export const autoSignIn = state => async dispatch => {
  const data = await axios.post(`${URL}auth/auto-sign-in`, state, {
    headers: {
      Authentication: `Bearer ${state.token}`,
    },
  });
  if (data === false) return;

  await setStorage('user_credentials', data);
  dispatch(setAuth(state));
};

export const googleOAuth = state => async dispatch => {
  const data = await axios.post(`${URL}auth/google-oauth`, state);
  if (data === false) return;

  setStorage('user_credentials', data);
  dispatch(setAuth());
};

export const logout = state => async dispatch => {
  const data = await axios.post(`${URL}auth/logout`, state);
  if (data === false) return;

  await clearStorage();
  // connectOAuth();
  // await GoogleSignin.signOut();
  dispatch(setLogout());
};

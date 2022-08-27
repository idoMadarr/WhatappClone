import axios from '../services/interceptors';
import {Domain} from '../fixtures/domain.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from '../utils/rootNavigation';
import {clearSpinner} from './slice';

export const verifyMailBox =
  (userMail, setVerificationMode) => async dispatch => {
    const body = {userMail};
    const data = await axios.post(`${Domain}auth/verification`, body);
    AsyncStorage.setItem('temp_pass', data.pass);
    setVerificationMode(false);
    dispatch(clearSpinner());
  };

export const signUp = state => async () => {
  const data = await axios.post(`${Domain}auth/sign-up`, state);
  if (data.token) navigate('verification-screen', {email: state.email});
};

export const signIn = state => async dispatch => {
  const data = await axios.post(`${Domain}auth/sign-in`, state);
  console.log(data);
};

// export const saveToStorage = async (name, payload, identifier) => {
//   await AsyncStorage.setItem(${name}`, JSON.stringify(payload));
// };

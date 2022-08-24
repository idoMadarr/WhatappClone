import axios from 'axios';
import {Domain} from '../fixtures/domain.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from '../utils/rootNavigation';

export const verifyMailBox =
  (userMail, setVerificationMode) => async dispatch => {
    const body = {userMail};
    const {data} = await axios.post(`${Domain}auth/verification`, body);
    AsyncStorage.setItem('temp_pass', data.pass);
    setVerificationMode(false);
    console.log(data);
  };

export const setModal = () => dispatch => {};

// export const saveToStorage = async (name, payload, identifier) => {
//   await AsyncStorage.setItem(${name}`, JSON.stringify(payload));
// };

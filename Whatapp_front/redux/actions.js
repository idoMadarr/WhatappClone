import axios from 'axios';
import {Domain} from '../fixtures/domain.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from '../utils/rootNavigation';

export const verifyMailBox = userMail => async dispatch => {
  const body = {userMail};
  const {data} = await axios.post(`${Domain}auth/verification`, body);
  console.log(data);
  await AsyncStorage.setItem('temp_pass', data.pass);
  // navigate('sign-in');
};

// export const saveToStorage = async (name, payload, identifier) => {
//   await AsyncStorage.setItem(${name}`, JSON.stringify(payload));
// };

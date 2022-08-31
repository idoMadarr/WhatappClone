import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {androidClientId} from '../fixtures/credentials.json';

export const connectOAuth = () => {
  GoogleSignin.configure({
    androidClientId,
  });
};

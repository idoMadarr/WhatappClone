import AsyncStorage from '@react-native-async-storage/async-storage';

export const setStorage = async (identifier, value) => {
  console.log('Saving...', identifier, JSON.stringify(value));
  await AsyncStorage.setItem(identifier, JSON.stringify(value));
};

export const getStorage = async identifier => {
  const userCredentials = await AsyncStorage.getItem(identifier);
  return JSON.parse(userCredentials);
};

export const clearStorage = () => {
  const keys = ['user_credentials'];
  AsyncStorage.multiRemove(keys);
};

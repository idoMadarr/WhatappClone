import React, {useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {useDispatch} from 'react-redux';
import {setAuth} from '../redux/slice';

// Components
import StatusBarElement from '../components/Reusable/StatusBarElement';
import TextElement from '../components/Reusable/TextElement';

// Style
import WhatsappLogo from '../assets/icons/whatsapp-logo-lg.svg';
import {primary, white} from '../assets/palette/pallete.json';

// Utils
import {getStorage} from '../utils/asyncStorage';

const InitScreen = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(async () => {
      const user = await getStorage('user_credentials');
      if (user && user.activated === true) {
        return dispatch(setAuth());
      }
      navigation.navigate('signin-screen');
    }, 2000);
  }, []);

  return (
    <View style={styles.screen}>
      <StatusBarElement barStyle={'light-content'} backgroundColor={primary} />
      <WhatsappLogo />
      <ActivityIndicator size={'large'} color={white} style={styles.spinner} />
      <TextElement large customStyle={styles.title}>
        WhatsappClone
      </TextElement>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: primary,
  },
  title: {
    color: white,
  },
  spinner: {
    marginVertical: 16,
  },
});

export default InitScreen;

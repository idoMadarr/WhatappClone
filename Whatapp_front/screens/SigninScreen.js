import React from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';

// Components
import StatusBarElement from '../components/Reusable/StatusBarElement';
import LinkElement from '../components/Reusable/LinkElement';
import SigninForm from '../components/SigninPartials/SigninForm';

// Styles
import {white} from '../assets/palette/pallete.json';
import {primary} from '../assets/palette/pallete.json';

const SigninScreen = ({navigation}) => {
  const signupNavigate = () => navigation.navigate('signup-screen');

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBarElement barStyle={'light-content'} backgroundColor={primary} />
      <SigninForm signupNavigate={signupNavigate} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: white,
    paddingBottom: 16,
  },
  clickhereContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SigninScreen;

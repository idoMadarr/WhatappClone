import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

// Components
import StatusBarElement from '../components/Reusable/StatusBarElement';
import SignupHeader from '../components/SignupPartials/SignupHeader';
import VerifyForm from '../components/SignupPartials/VerifyForm';

// Styles
import {white} from '../assets/palette/pallete.json';
import {primary} from '../assets/palette/pallete.json';

const SigninScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBarElement barStyle={'light-content'} backgroundColor={primary} />
      <SignupHeader />
      <VerifyForm />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: white,
  },
});

export default SigninScreen;

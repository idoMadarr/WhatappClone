import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

// Components
import StatusBarElement from '../components/Reusable/StatusBarElement';
import SignupHeader from '../components/SignupPartials/SignupHeader';
import SignupForm from '../components/SignupPartials/SignupForm';

// Styles
import {primary} from '../assets/palette/pallete.json';

const SigninScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBarElement barStyle={'light-content'} backgroundColor={primary} />
      <SignupHeader />
      <SignupForm />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default SigninScreen;

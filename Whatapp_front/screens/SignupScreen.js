import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

// Components
import StatusBarElement from '../components/Reusable/StatusBarElement';
import SignupForm from '../components/SignupPartials/SignupForm';

// Styles
import PlusIcon from '../assets/icons/plusIcon.svg';
import {primary, white, teal} from '../assets/palette/pallete.json';

const SignupScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBarElement barStyle={'light-content'} backgroundColor={primary} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SignupForm />
      </ScrollView>
      <TouchableOpacity style={styles.createBotton}>
        <PlusIcon style={{color: white}} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: white,
  },
  createBotton: {
    width: 50,
    height: 50,
    backgroundColor: teal,
    borderRadius: 150,
    position: 'absolute',
    top: '85%',
    left: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default SignupScreen;

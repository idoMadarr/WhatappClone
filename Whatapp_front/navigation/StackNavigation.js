import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import SignupScreen from '../screens/SignupScreen';
import SigninScreen from '../screens/SigninScreen';

export const AuthNavigation = () => {
  const AuthNavigator = createNativeStackNavigator();

  return (
    <AuthNavigator.Navigator screenOptions={{headerShown: false}}>
      <AuthNavigator.Screen name={'signin-screen'} component={SigninScreen} />
      <AuthNavigator.Screen name={'signup-screen'} component={SignupScreen} />
    </AuthNavigator.Navigator>
  );
};

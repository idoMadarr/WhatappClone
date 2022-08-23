import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// Screens
import SignupScreen from '../screens/SignupScreen';
import SigninScreen from '../screens/SigninScreen';
import VerificationScreen from '../screens/VerificationScreen';

const TopTabNavigation = () => {
  const tabScreens = [
    {
      label: 'Signin',
      name: 'signin',
      component: SigninScreen,
    },
    {
      label: 'Signup',
      name: 'signup',
      component: SignupScreen,
    },
    {
      label: 'Verify',
      name: 'verify',
      component: VerificationScreen,
    },
  ];

  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator tabBar={() => null}>
      {tabScreens.map(({label, name, component}) => (
        <Tab.Screen key={label} name={name} component={component} />
      ))}
    </Tab.Navigator>
  );
};

export default TopTabNavigation;

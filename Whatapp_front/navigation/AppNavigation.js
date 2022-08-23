import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '../utils/rootNavigation';
import TopTabNavigation from './TopTabNavigation';
import AuthNavigation from './AuthNavigation';

// Redux
import {useSelector} from 'react-redux';

// Components
import SignupHeader from '../components/SignupPartials/SignupHeader';
// import AppHeader from '../components/AppHader/AppHeader';

const AppNavigation = () => {
  const AppNavigator = createNativeStackNavigator();

  const isAuth = useSelector(state => state.mainSlice.isAuth);

  return (
    <NavigationContainer ref={navigationRef}>
      <AppNavigator.Navigator
        screenOptions={{headerShown: false /* header: () => <AppHeader /> */}}>
        {isAuth ? (
          <AppNavigator.Group>
            <AppNavigator.Screen name={'main'} component={TopTabNavigation} />
          </AppNavigator.Group>
        ) : (
          <AppNavigator.Group>
            <AppNavigator.Screen
              name={'auth-screen'}
              component={AuthNavigation}
              options={{headerShown: true, header: () => <SignupHeader />}}
            />
          </AppNavigator.Group>
        )}
      </AppNavigator.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

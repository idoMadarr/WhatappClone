import React, {useEffect, useRef} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '../utils/rootNavigation';
import TopTabNavigation from './TopTabNavigation';
import SocketIO from 'socket.io-client';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import {
  clearMessage,
  setActiveClients,
  clearActiveClient,
} from '../redux/slice';

// Components
import AuthHeader from '../components/AppHader/AuthHeader';
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';
import VerificationScreen from '../screens/VerificationScreen';
import InitScreen from '../screens/InitScreen';
import ModalElement from '../components/Reusable/ModalElement';
import {Modalize} from 'react-native-modalize';
import AppHeader from '../components/AppHader/AppHeader';

// Fixtures
import * as Domains from '../fixtures/domain.json';

const AppNavigation = () => {
  const URL = Domains.EmulatorHost;
  const AppNavigator = createNativeStackNavigator();

  const isAuth = useSelector(state => state.mainSlice.isAuth);
  const message = useSelector(state => state.mainSlice.message);
  const modalizeRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const initSocketIO = async () => {
      const socketConnection = SocketIO(URL);
      socketConnection.on('logout', data => {
        dispatch(clearActiveClient(data));
      });
      socketConnection.on('user', data => {
        dispatch(setActiveClients(data));
      });
    };
    initSocketIO();
  }, []);

  useEffect(() => {
    if (message) {
      modalizeRef.current.open();
    } else {
      dispatch(clearMessage());
    }
  }, [message]);

  const closeModal = async () => modalizeRef.current.close();

  return (
    <NavigationContainer ref={navigationRef}>
      <AppNavigator.Navigator screenOptions={{headerShown: false}}>
        {isAuth ? (
          <AppNavigator.Group
            screenOptions={{
              animation: 'flip',
              headerShown: true,
              header: () => <AppHeader />,
            }}>
            <AppNavigator.Screen name={'main'} component={TopTabNavigation} />
          </AppNavigator.Group>
        ) : (
          <AppNavigator.Group
            screenOptions={{
              animation: 'flip',
              headerShown: true,
              header: () => <AuthHeader />,
            }}>
            <AppNavigator.Screen
              name={'init-screen'}
              component={InitScreen}
              options={{headerShown: false}}
            />
            <AppNavigator.Screen
              name={'signup-screen'}
              component={SignupScreen}
            />
            <AppNavigator.Screen
              name={'signin-screen'}
              component={SigninScreen}
            />
            <AppNavigator.Screen
              name={'verification-screen'}
              component={VerificationScreen}
            />
          </AppNavigator.Group>
        )}
      </AppNavigator.Navigator>
      <Modalize ref={modalizeRef} adjustToContentHeight={true}>
        <ModalElement message={message} closeModal={closeModal} />
      </Modalize>
    </NavigationContainer>
  );
};

export default AppNavigation;

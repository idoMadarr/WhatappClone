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
  setSocket,
} from '../redux/slice';
import {logout} from '../redux/actions';

// Components
import AuthHeader from '../components/AppHader/AuthHeader';
import ChatHeader from '../components/AppHader/ChatHeader';
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';
import VerificationScreen from '../screens/VerificationScreen';
import InitScreen from '../screens/InitScreen';
import ModalElement from '../components/Reusable/ModalElement';
import {Modalize} from 'react-native-modalize';
import AppHeader from '../components/AppHader/AppHeader';
import ChatScreen from '../screens/ChatScreen';

// Fixtures
import * as Domains from '../fixtures/domain.json';

// Utils
import {getStorage, setStorage} from '../utils/asyncStorage';

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
      dispatch(setSocket(socketConnection));
      const clientId = await getStorage('clientId');

      socketConnection.on('init', async data => {
        setStorage('clientId', data.clientId);
      });
      socketConnection.on('user', data => {
        console.log(clientId, data.clientId);
        if (clientId === data.clientId) {
          console.log('me');
        } else {
          console.log('not me');
        }
        // clientId === data.clientId ? null : dispatch(setActiveClients(data));
      });
      socketConnection.on('logout', data => {
        dispatch(clearActiveClient(data));
      });
      socketConnection.on('session_timeout', data => {
        console.log('session time out', email);
        dispatch(logout({email, clientId}));
      });
      socketConnection.on('received_message', data => {
        console.log('received_message!!!!', data);
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
            <AppNavigator.Screen
              name={'chat-screen'}
              component={ChatScreen}
              options={{header: () => <ChatHeader />}}
            />
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

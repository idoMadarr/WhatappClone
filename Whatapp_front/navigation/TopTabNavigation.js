import React from 'react';
// import {PermissionsAndroid} from 'react-native';
// import Contacts from 'react-native-contacts';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// Screens
import ContactsScreen from '../screens/ContactsScreen';
import ChatsScreen from '../screens/ChatsScreen';
import CallsScreen from '../screens/CallsScreen';

// Styles
import {primary, white} from '../assets/palette/pallete.json';
// import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const TopTabNavigation = () => {
  // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
  //   title: 'Contacts',
  //   message: 'This app would like to view your contacts.',
  //   buttonPositive: 'Please accept bare mortal',
  // }).then(
  //   Contacts.getAll()
  //     .then(contacts => {
  //       // work with contacts
  //       console.log(contacts);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     }),
  // );

  const tabScreens = [
    {
      label: 'Chats',
      name: 'chats',
      component: ChatsScreen,
    },
    {
      label: 'Contacts',
      name: 'contacts',
      component: ContactsScreen,
    },
    {
      label: 'Calls',
      name: 'calls',
      component: CallsScreen,
    },
  ];

  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: false,
        tabBarLabelStyle: {
          fontSize: 14,
          color: white,
        },
        // tabBarItemStyle: {width: wp('33.33%')},
        tabBarIndicatorStyle: {backgroundColor: white},
        tabBarIndicatorContainerStyle: {backgroundColor: primary},
      }}>
      {tabScreens.map(({label, name, component}) => (
        <Tab.Screen key={label} name={name} component={component} />
      ))}
    </Tab.Navigator>
  );
};

export default TopTabNavigation;

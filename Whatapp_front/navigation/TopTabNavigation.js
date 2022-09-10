import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// Screens
import ContactsScreen from '../screens/ContactsScreen';
import ChatsScreen from '../screens/ChatsScreen';
import CallsScreen from '../screens/CallsScreen';

// Styles
import {primary, white} from '../assets/palette/pallete.json';

const TopTabNavigation = () => {
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

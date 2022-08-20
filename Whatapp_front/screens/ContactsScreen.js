import React from 'react';
import {View} from 'react-native';
// import Contacts from 'react-native-contacts';

// Components
import StatusBarElement from '../components/Reusable/StatusBarElement';
import TextElement from '../components/Reusable/TextElement';

// Styles
import {primary} from '../assets/palette/pallete.json';

// PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
//   title: 'Contacts',
//   message: 'This app would like to view your contacts.',
//   buttonPositive: 'Please accept bare mortal',
// }).then(
//   Contacts.getAll().then(response => {
//     console.log(response);
//   }),
// );

const ContactsScreen = () => {
  return (
    <View>
      <StatusBarElement barStyle={'light-content'} backgroundColor={primary} />
      <TextElement>ContactsScreen</TextElement>
    </View>
  );
};

export default ContactsScreen;

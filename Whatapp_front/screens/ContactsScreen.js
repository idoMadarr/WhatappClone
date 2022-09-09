import React from 'react';
import {View} from 'react-native';

// Components
import StatusBarElement from '../components/Reusable/StatusBarElement';
import TextElement from '../components/Reusable/TextElement';

// Styles
import {primary} from '../assets/palette/pallete.json';

const ContactsScreen = () => {
  return (
    <View>
      <StatusBarElement barStyle={'light-content'} backgroundColor={primary} />
      <TextElement>ContactsScreen</TextElement>
    </View>
  );
};

export default ContactsScreen;

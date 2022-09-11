import React from 'react';
import {View} from 'react-native';

// Components
import StatusBarElement from '../components/Reusable/StatusBarElement';
import TextElement from '../components/Reusable/TextElement';
import ContanctsList from '../components/ContactsPartials/ContanctsList/ContanctsList';

// Styles
import {primary} from '../assets/palette/pallete.json';

const ContactsScreen = () => {
  return (
    <View>
      <StatusBarElement barStyle={'light-content'} backgroundColor={primary} />
      <ContanctsList />
    </View>
  );
};

export default ContactsScreen;

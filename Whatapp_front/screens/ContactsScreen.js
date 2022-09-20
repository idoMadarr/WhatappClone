import React from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {setSelectedUser} from '../redux/slice';

// Components
import StatusBarElement from '../components/Reusable/StatusBarElement';
import ContanctsList from '../components/ContactsPartials/ContanctsList/ContanctsList';

// Styles
import {primary} from '../assets/palette/pallete.json';

const ContactsScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const openChat = user => {
    dispatch(setSelectedUser(user));
    navigation.navigate('chat-screen');
  };

  return (
    <View>
      <StatusBarElement barStyle={'light-content'} backgroundColor={primary} />
      <ContanctsList openChat={openChat} />
    </View>
  );
};

export default ContactsScreen;

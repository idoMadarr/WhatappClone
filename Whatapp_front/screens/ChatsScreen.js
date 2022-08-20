import React from 'react';
import {View, StyleSheet} from 'react-native';

// Components
import StatusBarElement from '../components/Reusable/StatusBarElement';
import TextElement from '../components/Reusable/TextElement';

// Styles
import {primary} from '../assets/palette/pallete.json';

const ChatsScreen = () => {
  return (
    <View>
      <StatusBarElement barStyle={'light-content'} backgroundColor={primary} />
      <TextElement>ChatsScreen</TextElement>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ChatsScreen;

import React from 'react';
import {View, StyleSheet} from 'react-native';

// Components
import TextElement from '../../Reusable/TextElement';

// Style
import {secondary, white, black} from '../../../assets/palette/pallete.json';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const ChatMessage = ({item}) => {
  return (
    <View
      style={[
        styles.messageContainer,
        {
          backgroundColor: item.sender ? white : secondary,
          alignSelf: item.sender ? 'flex-start' : 'flex-end',
        },
      ]}>
      <TextElement>
        {item.text}
        <TextElement small customStyle={styles.black}>
          {'   '}
          {item.time}
        </TextElement>
      </TextElement>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: wp('80%'),
    margin: 10,
    padding: 10,
    borderRadius: 8,
    elevation: 1,
  },
  black: {
    color: black,
  },
});

export default ChatMessage;

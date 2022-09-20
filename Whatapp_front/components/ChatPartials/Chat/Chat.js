import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

// Components
import TextElement from '../../Reusable/TextElement';
import ChatMessage from '../ChatMessage/ChatMessage';

const conversation = {
  123: [
    {
      id: '1',
      sender: true,
      time: '12.31',
      text: 'Hi, Ido how are you today?',
    },
    {
      id: '2',
      sender: false,
      time: '12.31',
      text: 'Very well thanks, & u? Hi, Ido how are you today Hi, Ido how are you today Hi, Ido how are you today Hi, Ido how are you today Hi, Ido how are you today Hi, Ido how are you today Hi, Ido how are you today',
    },
    {
      id: '3',
      sender: true,
      time: '12.31',
      text: 'Great!',
    },
    {
      id: '4',
      sender: true,
      time: '12.31',
      text: 'Hi, Ido how are you today?',
    },
    {
      id: '5',
      sender: false,
      time: '12.31',
      text: 'Very well thanks, & u? Hi, Ido how are you today Hi, Ido how are you today Hi, Ido how are you today Hi, Ido how are you today Hi, Ido how are you today Hi, Ido how are you today Hi, Ido how are you today',
    },
    {
      id: '6',
      sender: true,
      time: '12.31',
      text: 'Great!',
    },
    {
      id: '7',
      sender: true,
      time: '12.31',
      text: 'Hi, Ido how are you today?',
    },
    {
      id: '8',
      sender: false,
      time: '12.31',
      text: 'Very well thanks, & u? Hi, Ido how are you today Hi, Ido how are you today Hi, Ido how are you today Hi, Ido how are you today Hi, Ido how are you today Hi, Ido how are you today Hi, Ido how are you today',
    },
    {
      id: '9',
      sender: true,
      time: '12.31',
      text: 'Great!',
    },
  ],
};

const Chat = () => {
  return (
    <View>
      <FlatList
        data={conversation[123]}
        keyExtractor={itemData => itemData.id}
        renderItem={({item}) => <ChatMessage item={item} />}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 8,
  },
});

export default Chat;

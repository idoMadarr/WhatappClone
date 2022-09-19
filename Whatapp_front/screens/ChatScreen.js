import React, {useState} from 'react';
import {TouchableOpacity, SafeAreaView} from 'react-native';
import {useDispatch} from 'react-redux';
import {sendMessage} from '../redux/actions';

// Components
import InputElement from '../components/Reusable/InputElement';
import TextElement from '../components/Reusable/TextElement';

const ChatScreen = ({route}) => {
  const {recipient} = route.params;
  const dispatch = useDispatch();

  const [messageState, setMessageState] = useState('');

  const onSend = () => {
    const state = {message: messageState, recipient};
    dispatch(sendMessage(state));
  };

  return (
    <SafeAreaView>
      <TextElement>ChatScreen With {recipient}</TextElement>
      <InputElement
        inputValue={messageState}
        onChangeText={setMessageState}
        label={'Message'}
      />
      <TouchableOpacity
        onPress={onSend}
        style={{width: 65, height: 25, backgroundColor: 'green'}}>
        <TextElement>Send</TextElement>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ChatScreen;

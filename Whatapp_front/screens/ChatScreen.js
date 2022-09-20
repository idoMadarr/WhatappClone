import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {sendMessage} from '../redux/actions';

// Components
import Chat from '../components/ChatPartials/Chat/Chat';
import TextElement from '../components/Reusable/TextElement';
import StatusBarElement from '../components/Reusable/StatusBarElement';
import PressableCircleElement from '../components/Reusable/PressableCircleElement';

// Style
import {primary, white} from '../assets/palette/pallete.json';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const ChatScreen = () => {
  const selectedUser = useSelector(state => state.mainSlice.selectedUser);

  const dispatch = useDispatch();

  const [messageState, setMessageState] = useState('');

  const onSend = () => {
    const state = {message: messageState, recipient: selectedUser.clientId};
    console.log(state);
    // dispatch(sendMessage(state));
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBarElement barStyle={'light-content'} backgroundColor={primary} />
      <ImageBackground
        source={require('../assets/images/chat_background.png')}
        resizeMode={'cover'}
        style={styles.whatsAppBackground}>
        <View style={styles.chatContainer}>
          <Chat />
        </View>
        <View style={styles.controller}>
          <TextInput
            value={messageState}
            onChangeText={setMessageState}
            placeholder={'Message'}
            style={styles.input}
          />
          <PressableCircleElement
            checked={true}
            onPress={onSend}
            customStyle={styles.button}>
            <TextElement customStyle={styles.buttonTitle}>SEND</TextElement>
          </PressableCircleElement>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  chatContainer: {
    height: '85%',
    width: '100%',
  },
  whatsAppBackground: {
    height: '100%',
    width: '100%',
  },
  controller: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  input: {
    width: wp('80%'),
    backgroundColor: white,
    borderRadius: 25,
    borderColor: white,
    elevation: 2,
    paddingLeft: 20,
    marginLeft: 8,
  },
  button: {
    width: 55,
    height: 55,
  },
  buttonTitle: {
    color: white,
    marginTop: 2,
  },
});

export default ChatScreen;

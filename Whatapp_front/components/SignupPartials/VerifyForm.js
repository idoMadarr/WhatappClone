import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  Layout,
  Transition,
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {verifyMailBox} from '../../redux/actions';

// Components
import InputElement from '../Reusable/InputElement';
import ButtonElement from '../Reusable/ButtonElement';
import TextElement from '../Reusable/TextElement';

// Styles
import {primary, white} from '../../assets/palette/pallete.json';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const VerifyForm = () => {
  const [mailState, setMailState] = useState('');
  const [verificationState, setVerificationState] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [verificationMode, setVerificationMode] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsValid(!mailState.includes('@'));
  }, [mailState]);

  const upadeMailState = value => setMailState(value);

  const upadeVerificationState = value => setVerificationState(value);

  const onSend = async () => {
    Keyboard.dismiss();
    dispatch(verifyMailBox(mailState, setVerificationMode));
  };

  const onVerify = async () => {
    const pass = await AsyncStorage.getItem('temp_pass');
    if (pass === verificationState) {
      console.log('YES!');
    }
    console.log('NO!');
  };

  let displayVerificationInput = null;
  if (!verificationMode) {
    displayVerificationInput = (
      <InputElement
        inputValue={verificationState}
        onChangeText={upadeVerificationState}
        label={'Please Enter Your Code'}
        maxLength={6}
        editable={true}
      />
    );
  }

  return (
    <Animated.View
      entering={FadeInDown}
      exiting={FadeInUp}
      layout={Layout.duration(3000)}
      style={styles.formContainer}>
      <TextElement medium>Login to your account</TextElement>
      <TextElement small>
        Verify your account by getting a secret number directly to your mailbox
      </TextElement>
      <InputElement
        inputValue={mailState}
        onChangeText={upadeMailState}
        label={'Email Address'}
        maxLength={30}
        editable={verificationMode}
      />
      {/* {displayVerificationInput} */}
      {!verificationMode && (
        <InputElement
          inputValue={verificationState}
          onChangeText={upadeVerificationState}
          label={'Please Enter Your Code'}
          maxLength={6}
          editable={true}
        />
      )}
      <ButtonElement
        title={verificationMode ? 'Send' : 'Verify'}
        onPress={verificationMode ? onSend : onVerify}
        backgroundColor={primary}
        titleColor={white}
        disable={isValid}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: wp('90%'),
    alignSelf: 'center',
    marginTop: 16,
  },
});

export default VerifyForm;

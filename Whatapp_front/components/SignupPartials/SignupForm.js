import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {verifyMailBox} from '../../redux/actions';

// Components
import InputElement from '../Reusable/InputElement';
import ButtonElement from '../Reusable/ButtonElement';
import TextElement from '../Reusable/TextElement';

// Styles
import {primary, white} from '../../assets/palette/pallete.json';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const SignupForm = () => {
  const [mailState, setMailState] = useState('');
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsValid(!mailState.includes('@'));
  }, [mailState]);

  const updateState = value => {
    setMailState(value);
  };

  const onSend = () => dispatch(verifyMailBox(mailState));

  return (
    <View style={styles.formContainer}>
      <TextElement medium>Login to your account</TextElement>
      <TextElement small>
        Verify your account by getting a secret number directly to your mailbox
      </TextElement>
      <InputElement
        inputValue={mailState}
        onChangeText={updateState}
        label={'Email Address'}
        maxLength={30}
      />
      <ButtonElement
        title={'Send'}
        onPress={onSend}
        backgroundColor={primary}
        titleColor={white}
        disable={isValid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: wp('90%'),
    alignSelf: 'center',
    marginTop: 16,
  },
});

export default SignupForm;

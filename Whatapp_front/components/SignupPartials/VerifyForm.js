import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Animated, {FadeInDown, Layout} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setAuth} from '../../redux/slice';
import {verifyMailBox} from '../../redux/actions';

// Components
import InputElement from '../Reusable/InputElement';
import TextElement from '../Reusable/TextElement';

// Styles
import ApprovedIcon from '../../assets/icons/approvedIcon.svg';
import {teal, greyish} from '../../assets/palette/pallete.json';

const VerifyForm = ({userMailbox}) => {
  const [verificationState, setVerificationState] = useState('');
  const [verificationMode, setVerificationMode] = useState(true);

  const dispatch = useDispatch();

  const upadeVerificationState = value => setVerificationState(value);

  useEffect(() => {
    dispatch(verifyMailBox(userMailbox, setVerificationMode));
  }, []);

  const onVerify = async () => {
    const pass = await AsyncStorage.getItem('temp_pass');
    if (pass === verificationState) {
      await dispatch(setAuth());
    }
    console.log('NO!');
  };

  let displayVerificationInput = (
    <ActivityIndicator size={'large'} color={teal} />
  );
  if (!verificationMode) {
    displayVerificationInput = (
      <Animated.View entering={FadeInDown}>
        <InputElement
          inputValue={verificationState}
          onChangeText={upadeVerificationState}
          label={'Please Enter Your Code'}
          maxLength={6}
          editable={true}
        />
      </Animated.View>
    );
  }

  return (
    <Animated.View entering={FadeInDown} style={styles.formContainer}>
      <View style={styles.main}>
        <TextElement
          customStyle={{color: 'black'}}
          medium>{`Hi ${userMailbox}, we have sent a secret key to your email, please verify your mail in order to activate your account.`}</TextElement>
        <InputElement
          inputValue={userMailbox}
          label={'Email Address'}
          editable={false}
          customStyle={{backgroundColor: greyish}}
        />
        {displayVerificationInput}
      </View>
      <Animated.View style={styles.createBotton} layout={Layout}>
        <TouchableOpacity onPress={onVerify} activeOpacity={0.6}>
          <ApprovedIcon />
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginVertical: 16,
  },
  main: {
    marginHorizontal: 16,
  },
  createBotton: {
    width: 50,
    height: 50,
    backgroundColor: teal,
    borderRadius: 150,
    position: 'absolute',
    top: '88%',
    left: '82%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default VerifyForm;

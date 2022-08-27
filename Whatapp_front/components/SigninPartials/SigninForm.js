import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {signIn} from '../../redux/actions';

// Components
import TextElement from '../Reusable/TextElement';
import InputElement from '../Reusable/InputElement';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

// Styles
import PlusIcon from '../../assets/icons/plusIcon.svg';
import PasswordIcon from '../../assets/icons/passwordIcon.svg';
import {black, teal, white} from '../../assets/palette/pallete.json';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const initState = {
  email: '',
  password: '',
};

const initErrorsState = {
  emailError: '',
  passwordError: '',
};

const SigninForm = () => {
  const [formState, setFormState] = useState(initState);
  const [formErrorsState, setFormErrorsState] = useState(initErrorsState);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [checked, setChecked] = useState(false);

  const {email, password} = formState;
  const {emailError, passwordError} = formErrorsState;

  const dispatch = useDispatch();

  const updateState = (key, value) => {
    setFormState(prevState => ({...prevState, [key]: value}));
  };

  const showPassword = () => setSecureTextEntry(!secureTextEntry);

  const onCheck = isChecked => {
    setChecked(isChecked);
  };

  const formValidator = () => {
    let isValid = true;
    let emailError = null;
    let passwordError = null;

    const passRegex = `^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$`;

    if (!email.includes('@') || email.trim() === '')
      emailError = 'Please enter valid email';
    if (!new RegExp(passRegex).test(password))
      passwordError =
        'Minimum eight characters, at least one letter and one number';

    if (emailError || passwordError) {
      setFormErrorsState({
        emailError,
        passwordError,
      });
      isValid = false;
    }

    return isValid;
  };

  const onPlus = () => {
    const isValid = formValidator();
    if (isValid) {
      dispatch(signIn(formState));
    }
  };

  return (
    <View style={styles.formContainer}>
      <View style={{marginBottom: 16}}>
        <TextElement>
          WhatsApp is not only free but also available on multiple mobile
          devices and in low connectivity areas —
          <TextElement customStyle={{color: black}}>
            making it accessible and reliable wherever you are.
          </TextElement>
        </TextElement>
      </View>
      <InputElement
        inputValue={email}
        onChangeText={updateState.bind(this, 'email')}
        errorMessage={emailError}
        label={'Email'}
        maxLength={35}
      />
      <InputElement
        inputValue={password}
        onChangeText={updateState.bind(this, 'password')}
        errorMessage={passwordError}
        label={'Password'}
        secureTextEntry={secureTextEntry}
        handleSecureEntry={showPassword}
        maxLength={10}>
        <PasswordIcon />
      </InputElement>
      <View style={styles.disclaimer}>
        <BouncyCheckbox
          size={24}
          fillColor={teal}
          onPress={onCheck}
          style={{width: 25, marginRight: 5}}
          isChecked={checked}
        />
        <TextElement customStyle={{width: wp('80%')}}>
          Click here to indicate that you've read and agree to the Terms and
          Conditions agreement
        </TextElement>
      </View>
      <TouchableOpacity
        onPress={onPlus}
        style={styles.createBotton}
        activeOpacity={0.8}>
        <PlusIcon style={{color: white}} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    width: wp('90%'),
    alignSelf: 'center',
  },
  createBotton: {
    width: 50,
    height: 50,
    backgroundColor: teal,
    borderRadius: 150,
    position: 'absolute',
    top: '90%',
    left: '84%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SigninForm;

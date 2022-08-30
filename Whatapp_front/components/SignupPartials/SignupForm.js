import React, {useState} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {signUp} from '../../redux/actions';

// Components
import TextElement from '../Reusable/TextElement';
import InputElement from '../Reusable/InputElement';
import InputPickerElement from '../Reusable/InputPickerElement';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import LinkElement from '../Reusable/LinkElement';
import PlueElement from '../Reusable/PlueElement';

// Styles
import PasswordIcon from '../../assets/icons/passwordIcon.svg';
import {teal, white, greyish} from '../../assets/palette/pallete.json';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const initState = {
  username: '',
  email: '',
  password: '',
  confirm: '',
  phone: '',
};

const initErrorsState = {
  usernameError: '',
  emailError: '',
  passwordError: '',
  confirmError: '',
  phoneError: '',
};

const SignupForm = ({onPicker, selectedCountry, signinNavigate}) => {
  const [formState, setFormState] = useState(initState);
  const [formErrorsState, setFormErrorsState] = useState(initErrorsState);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [checked, setChecked] = useState(false);

  const {username, email, password, confirm, phone} = formState;
  const {usernameError, emailError, passwordError, confirmError, phoneError} =
    formErrorsState;

  const dispatch = useDispatch();

  const updateState = (key, value) => {
    setFormState(prevState => ({...prevState, [key]: value}));
  };

  const showPassword = () => setSecureTextEntry(!secureTextEntry);

  const formValidator = () => {
    let isValid = true;
    let usernameError = null;
    let emailError = null;
    let passwordError = null;
    let confirmError = null;
    let phoneError = null;

    const passRegex = `^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$`;
    if (username.trim() === '') usernameError = 'Username is required';
    if (!email.includes('@') || email.trim() === '')
      emailError = 'Please enter valid email';
    // if (!new RegExp(passRegex).test(password))
    //   passwordError =
    //     'Minimum eight characters, at least one letter and one number';
    if (password !== confirm) confirmError = 'Please check your password';
    if (phone.length < 6 || phone.length > 16) phoneError = 'Invalid phone';

    if (
      usernameError ||
      emailError ||
      passwordError ||
      confirmError ||
      phoneError
    ) {
      setFormErrorsState({
        usernameError,
        emailError,
        passwordError,
        confirmError,
        phoneError,
      });
      isValid = false;
    }

    return isValid;
  };

  const onCheck = isChecked => setChecked(isChecked);

  const onPlus = () => {
    const isValid = formValidator();
    if (isValid) {
      const formCredentials = {
        ...formState,
        country: selectedCountry.countryName,
      };
      dispatch(signUp(formCredentials));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      style={{flex: 1}}
      keyboardVerticalOffset={-110}>
      <ScrollView
        style={styles.formContainer}
        showsVerticalScrollIndicator={false}>
        <View style={{marginBottom: 8}}>
          <TextElement>
            WhatsApp is a fast, simple and reliable way to talk to anyone in the
            world - anytime and anywhere.
          </TextElement>
        </View>
        <InputElement
          inputValue={username}
          onChangeText={updateState.bind(this, 'username')}
          errorMessage={usernameError}
          label={'Username'}
          maxLength={35}
        />
        <InputElement
          inputValue={email}
          onChangeText={updateState.bind(this, 'email')}
          errorMessage={emailError}
          label={'Email'}
          maxLength={35}
        />
        <View style={styles.phoneContainer}>
          <InputElement
            inputValue={phone}
            onChangeText={updateState.bind(this, 'phone')}
            errorMessage={phoneError}
            label={'Phone'}
            maxLength={16}
            width={wp('65.6%')}
            customStyle={styles.passInput}
            numPad
          />
          <InputPickerElement
            width={19}
            iso2={selectedCountry?.iso2}
            openModal={onPicker}
            customStyle={styles.confirmInput}
          />
        </View>
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
        <InputElement
          inputValue={confirm}
          onChangeText={updateState.bind(this, 'confirm')}
          errorMessage={confirmError}
          label={'Confirm'}
          secureTextEntry={true}
          maxLength={9}
        />
        <View style={styles.disclaimer}>
          <BouncyCheckbox
            size={24}
            fillColor={teal}
            onPress={onCheck}
            style={{width: 25, marginRight: 5}}
            isChecked={checked}
          />
          <TextElement customStyle={{width: wp('80%')}}>
            I've read and agree to the Terms and Conditions agreement
          </TextElement>
        </View>
      </ScrollView>
      <View style={styles.formContainer}>
        <PlueElement checked={checked} onPress={onPlus} />
        <View style={styles.alreadyContainer}>
          <LinkElement link={{label: 'Sign in', navigate: signinNavigate}}>
            * Already have an account?
          </LinkElement>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: wp('85%'),
    alignSelf: 'center',
  },
  phoneContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  passInput: {
    borderRadius: 6,
    borderBottomEndRadius: 0,
    borderTopEndRadius: 0,
  },
  confirmInput: {
    borderRadius: 6,
    borderBottomStartRadius: 0,
    borderTopStartRadius: 0,
  },
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alreadyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignupForm;

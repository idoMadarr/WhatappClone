import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {signUp} from '../../redux/actions';

// Components
import TextElement from '../Reusable/TextElement';
import InputElement from '../Reusable/InputElement';
import InputPickerElement from '../Reusable/InputPickerElement';
import RadioButtonRN from 'radio-buttons-react-native';

// Styles
import PlusIcon from '../../assets/icons/plusIcon.svg';
import PasswordIcon from '../../assets/icons/passwordIcon.svg';
import {black, teal, white} from '../../assets/palette/pallete.json';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const initState = {
  username: '',
  email: '',
  password: '',
  confirm: '',
  gender: 'Male',
  phone: '',
};

const initErrorsState = {
  usernameError: '',
  emailError: '',
  passwordError: '',
  confirmError: '',
  phoneError: '',
};

const SignupForm = ({onPicker, selectedCountry}) => {
  const [formState, setFormState] = useState(initState);
  const [formErrorsState, setFormErrorsState] = useState(initErrorsState);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

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

  const data = [
    {
      label: 'Male',
    },
    {
      label: 'Famele',
    },
  ];

  return (
    <View style={styles.formContainer}>
      <View style={{marginBottom: 16}}>
        <TextElement>
          WhatsApp is a fast, simple and reliable way to talk to anyone in the
          world - anytime and anywhere.{' '}
          <TextElement customStyle={{color: black}}>
            Start your journy with us today - Free 30 days trail!
          </TextElement>
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
          width={wp('70.5%')}
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
      <RadioButtonRN
        data={data}
        selectedBtn={({label}) => updateState('gender', label)}
        circleSize={18}
        initial={1}
        activeColor={teal}
        box={false}
      />
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
    height: hp('70%'),
    width: wp('90%'),
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
});

export default SignupForm;

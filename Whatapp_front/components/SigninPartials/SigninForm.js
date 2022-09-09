import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setSpinner} from '../../redux/slice';
import {signIn} from '../../redux/actions';

// Components
import TextElement from '../Reusable/TextElement';
import InputElement from '../Reusable/InputElement';
import PlueElement from '../Reusable/PlueElement';
import LinkElement from '../Reusable/LinkElement';
import SocialLogin from '../SocialLogin/SocialLogin';

// Styles
import PasswordIcon from '../../assets/icons/passwordIcon.svg';
import {black} from '../../assets/palette/pallete.json';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const initState = {
  email: 'Idox2x@gmail.com',
  password: 'Aa123456',
};

const initErrorsState = {
  emailError: '',
  passwordError: '',
};

const SigninForm = ({signupNavigate}) => {
  const isLoading = useSelector(state => state.mainSlice.isLoading);

  const [formState, setFormState] = useState(initState);
  const [formErrorsState, setFormErrorsState] = useState(initErrorsState);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const {email, password} = formState;
  const {emailError, passwordError} = formErrorsState;

  const dispatch = useDispatch();

  const updateState = (key, value) => {
    setFormState(prevState => ({...prevState, [key]: value}));
  };
  const showPassword = () => setSecureTextEntry(!secureTextEntry);

  const formValidator = () => {
    let isValid = true;
    let emailError = null;
    let passwordError = null;

    if (!email.includes('@') || email.trim() === '')
      emailError = 'Please enter valid email';
    if (password.length < 6 || password.length > 9)
      passwordError = 'Password should be between six to 9 characters long';
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
      dispatch(setSpinner());
      dispatch(signIn(formState));
    }
  };

  return (
    <View style={styles.formContainer}>
      <View style={{marginBottom: 8}}>
        <TextElement>
          WhatsApp is not only free but also available on multiple mobile
          devices and in low connectivity areas —
          <TextElement customStyle={{color: black}}>
            making it accessible and reliable wherever you are.
          </TextElement>
        </TextElement>
      </View>
      <View>
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
      </View>
      <SocialLogin />
      <View style={styles.accountContainer}>
        <PlueElement isLoading={isLoading} checked={true} onPress={onPlus} />
        <LinkElement link={{label: 'Sign up', navigate: signupNavigate}}>
          * Don't have account yet?
        </LinkElement>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    width: wp('85%'),
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  image: {
    width: 65,
    height: 65,
    alignSelf: 'center',
    marginVertical: 16,
  },
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SigninForm;

import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';

// Components
import TextElement from '../Reusable/TextElement';
import InputElement from '../Reusable/InputElement';
import InputPickerElement from '../Reusable/InputPickerElement';

// Styles
import {black, primary, teal, white} from '../../assets/palette/pallete.json';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const initState = {
  username: '',
  email: '',
  password: '',
  confirm: '',
  gender: 'Male',
  phone: '',
};

const SignupForm = () => {
  const [formState, setFormState] = useState(initState);

  const {username, email, password, confirm, phone} = formState;

  const updateState = (key, value) => {
    setFormState(prevState => ({...prevState, [key]: value}));
  };

  const data = [
    {
      label: 'Male',
    },
    {
      label: 'Famele',
    },
  ];

  console.log(formState);

  return (
    <View style={styles.formContainer}>
      <TextElement>
        WhatsApp is a fast, simple and reliable way to talk to anyone in the
        world - anytime and anywhere.{' '}
        <TextElement customStyle={{color: black}}>
          Start your journy with us today - Free 30 days trail!
        </TextElement>
      </TextElement>
      <InputElement
        inputValue={username}
        onChangeText={updateState.bind(this, 'username')}
        errorMessage={''}
        label={'Username'}
        maxLength={35}
      />
      <InputElement
        inputValue={email}
        onChangeText={updateState.bind(this, 'email')}
        errorMessage={''}
        label={'Email'}
        maxLength={35}
      />
      <RadioButtonRN
        data={data}
        selectedBtn={({label}) => updateState('gender', label)}
        circleSize={18}
        initial={1}
        activeColor={teal}
        box={false}
      />
      <View style={{flexDirection: 'row'}}>
        <InputElement
          inputValue={password}
          onChangeText={updateState.bind(this, 'password')}
          errorMessage={''}
          label={'Password'}
          maxLength={9}
          width={wp('45%')}
          customStyle={{
            borderRadius: 6,
            borderBottomEndRadius: 0,
            borderTopEndRadius: 0,
          }}
        />
        <InputElement
          inputValue={confirm}
          onChangeText={updateState.bind(this, 'confirm')}
          errorMessage={''}
          label={'Confirm'}
          maxLength={9}
          width={wp('45%')}
          customStyle={{
            borderRadius: 6,
            borderBottomStartRadius: 0,
            borderTopStartRadius: 0,
          }}
        />
      </View>
      <InputElement
        inputValue={phone}
        onChangeText={updateState.bind(this, 'phone')}
        errorMessage={''}
        label={'Phone'}
        maxLength={16}
      />
      <InputPickerElement textContent={'Country'} openModal={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignSelf: 'center',
    marginVertical: 16,
    paddingHorizontal: 16,
  },
});

export default SignupForm;

import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

// Components
import TextElement from '../Reusable/TextElement';
import InputElement from '../Reusable/InputElement';
import InputPickerElement from '../Reusable/InputPickerElement';
import RadioButtonRN from 'radio-buttons-react-native';

// Styles
import PlusIcon from '../../assets/icons/plusIcon.svg';
import {black, primary, teal, white} from '../../assets/palette/pallete.json';
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

const SignupForm = ({onPicker}) => {
  const [formState, setFormState] = useState(initState);

  const {username, email, password, confirm, phone} = formState;

  const updateState = (key, value) => {
    setFormState(prevState => ({...prevState, [key]: value}));
  };

  const onPlus = () => {
    console.log(formState);
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
      <View style={styles.passContainer}>
        <InputElement
          inputValue={password}
          onChangeText={updateState.bind(this, 'password')}
          errorMessage={''}
          label={'Password'}
          maxLength={9}
          width={wp('45%')}
          customStyle={styles.passInput}
        />
        <InputElement
          inputValue={confirm}
          onChangeText={updateState.bind(this, 'confirm')}
          errorMessage={''}
          label={'Confirm'}
          maxLength={9}
          width={wp('45%')}
          customStyle={styles.confirmInput}
        />
      </View>
      <InputElement
        inputValue={phone}
        onChangeText={updateState.bind(this, 'phone')}
        errorMessage={''}
        label={'Phone'}
        maxLength={16}
      />
      <InputPickerElement textContent={'Country'} openModal={onPicker} />
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
    height: hp('76%'),
    alignSelf: 'center',
    padding: 16,
  },
  passContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
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
    left: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default SignupForm;

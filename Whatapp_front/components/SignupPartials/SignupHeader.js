import React from 'react';
import {View, StyleSheet} from 'react-native';

// Components
import TextElement from '../Reusable/TextElement';

// Styles
import WhatsappLogo from '../../assets/icons/whatsapp-logo.svg';
import {white, primary} from '../../assets/palette/pallete.json';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const SignupHeader = () => {
  return (
    <View style={styles.iconHeader}>
      <WhatsappLogo />
      <TextElement large customStyle={styles.titleColor}>
        Whatsapp
      </TextElement>
    </View>
  );
};

const styles = StyleSheet.create({
  iconHeader: {
    height: hp('28%'),
    backgroundColor: primary,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  titleColor: {
    color: white,
  },
});

export default SignupHeader;

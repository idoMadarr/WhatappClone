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
    <View style={styles.warpper}>
      <View style={styles.iconHeader}>
        <WhatsappLogo />
        <TextElement large customStyle={styles.titleColor}>
          WhatsappClone
        </TextElement>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  warpper: {
    backgroundColor: white,
  },
  iconHeader: {
    height: hp('18%'),
    backgroundColor: primary,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleColor: {
    color: white,
  },
});

export default SignupHeader;

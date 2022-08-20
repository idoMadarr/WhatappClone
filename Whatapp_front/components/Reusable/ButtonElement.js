import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

// Components
import TextElement from './TextElement';

// Style
import {greyish} from '../../assets/palette/pallete.json';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const ButtonElement = ({
  title,
  onPress,
  backgroundColor,
  titleColor,
  disable,
  customStyle,
}) => {
  const TypeElement = disable ? View : TouchableOpacity;

  return (
    <TypeElement onPress={onPress} activeOpacity={0.6}>
      <View
        style={{
          ...styles.buttonContainer,
          ...customStyle,
          backgroundColor: disable ? greyish : backgroundColor,
        }}>
        <TextElement customStyle={{color: titleColor}}>{title}</TextElement>
      </View>
    </TypeElement>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: wp('90%'),
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ButtonElement;

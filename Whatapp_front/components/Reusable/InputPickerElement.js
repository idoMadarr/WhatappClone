import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';

// Components
import TextElement from './TextElement';
import ArrowDownInput from '../../assets/icons/arrowDownInput.svg';

// Style
import {dark} from '../../assets/palette/pallete.json';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const InputPickerElement = ({textContent, openModal, customStyle}) => {
  return (
    <TouchableOpacity
      style={[styles.selectContainer, customStyle]}
      onPress={openModal}>
      <View style={styles.contentContainer}>
        <TextElement small>{textContent}</TextElement>
      </View>
      <ArrowDownInput />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  selectContainer: {
    height: 46,
    width: wp('90%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: dark,
  },
  contentContainer: {
    // alignItems: 'center',
    // flexDirection: 'row',
  },
});

export default InputPickerElement;

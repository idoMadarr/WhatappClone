import React from 'react';
import {TouchableOpacity, View, StyleSheet, Image} from 'react-native';

// Components
import TextElement from './TextElement';
import ArrowDownInput from '../../assets/icons/arrowDownInput.svg';

// Style
import {dark, black} from '../../assets/palette/pallete.json';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const InputPickerElement = ({
  width,
  textContent,
  openModal,
  customStyle,
  iso2,
}) => {
  return (
    <View>
      <TouchableOpacity
        style={[styles.selectContainer, customStyle, {width: wp(width)}]}
        onPress={openModal}>
        {textContent && <TextElement>{textContent}</TextElement>}
        <View style={styles.imageContainer}>
          <Image
            source={{uri: `https://countryflagsapi.com/png/${iso2}`}}
            resizeMode={'cover'}
            style={styles.image}
          />
        </View>
        <ArrowDownInput style={{color: black}} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  selectContainer: {
    height: 46,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: dark,
  },
  imageContainer: {
    height: 25,
    width: 25,
    borderRadius: 50,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default InputPickerElement;

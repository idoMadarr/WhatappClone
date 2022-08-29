import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';

// Components
import TextElement from './TextElement';
import ButtonElement from './ButtonElement';

// Styles
import CloseIcon from '../../assets/icons/closeIcon.svg';
import {white, black, teal} from '../../assets/palette/pallete.json';

const ModalElement = ({message, closeModal}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={closeModal} style={styles.closeContainer}>
        <CloseIcon style={{color: black}} />
      </TouchableOpacity>
      <TextElement customStyle={styles.text}>
        {message.errorMessage}
      </TextElement>
      {message.action && (
        <ButtonElement
          title={'Verify'}
          onPress={() => {}}
          backgroundColor={teal}
          titleColor={white}
          customStyle={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  closeContainer: {
    alignItems: 'flex-end',
  },
  text: {
    marginBottom: 16,
  },
  button: {
    height: 40,
    width: 100,
    borderRadius: 25,
  },
});

export default ModalElement;

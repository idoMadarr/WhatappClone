import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';

// Components
import TextElement from './TextElement';

// Styles
import CloseIcon from '../../assets/icons/closeIcon.svg';
import {white, black} from '../../assets/palette/pallete.json';

const ModalElement = ({message, closeModal}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={closeModal} style={styles.closeContainer}>
        <CloseIcon style={{color: black}} />
      </TouchableOpacity>
      <TextElement>{message}</TextElement>
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
});

export default ModalElement;

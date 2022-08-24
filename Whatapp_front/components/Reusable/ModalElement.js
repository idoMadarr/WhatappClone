import React from 'react';
import {TouchableOpacity, View} from 'react-native';

// Components
import TextElement from './TextElement';

// Styles

const ModalElement = ({children, closeModal}) => {
  return (
    <View>
      <TouchableOpacity onPress={closeModal}>
        <TextElement>close</TextElement>
      </TouchableOpacity>
      <TextElement>ModalElement</TextElement>
    </View>
  );
};

export default ModalElement;

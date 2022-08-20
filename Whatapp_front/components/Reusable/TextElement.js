import React from 'react';
import {Text} from 'react-native';

const TextElement = ({children, customStyle, bold, large, medium}) => {
  return (
    <Text
      style={{
        fontSize: large ? 24 : medium ? 20 : 14,
        fontFamily: bold ? 'Poppins-Bold' : 'Poppins-Regular',
        ...customStyle,
      }}>
      {children}
    </Text>
  );
};

export default TextElement;

import React from 'react';
import {Text} from 'react-native';

const TextElement = ({children, customStyle, bold, large, small}) => {
  return (
    <Text
      style={{
        fontSize: large ? 22 : small ? 10 : 14,
        fontFamily: bold ? 'Poppins-Bold' : 'Poppins-Regular',
        ...customStyle,
      }}>
      {children}
    </Text>
  );
};

export default TextElement;

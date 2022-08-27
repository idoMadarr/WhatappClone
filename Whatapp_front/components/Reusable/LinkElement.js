import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

// Components
import TextElement from './TextElement';

// Style
import {teal} from '../../assets/palette/pallete.json';

const LinkElement = ({children, link}) => {
  return (
    <TextElement>
      {children}{' '}
      <TouchableOpacity onPress={link.navigate} style={styles.center}>
        <TextElement customStyle={styles.center}>{link.label}</TextElement>
      </TouchableOpacity>
    </TextElement>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    transform: [{translateY: 4}],
    color: teal,
  },
});

export default LinkElement;

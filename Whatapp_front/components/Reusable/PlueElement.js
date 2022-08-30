import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

// Style
import PlusIcon from '../../assets/icons/plusIcon.svg';
import {white, teal, greyish} from '../../assets/palette/pallete.json';

const PlueElement = ({checked, onPress}) => {
  return (
    <TouchableOpacity
      onPress={checked ? onPress : null}
      style={[styles.createBotton, {backgroundColor: checked ? teal : greyish}]}
      activeOpacity={0.8}>
      <PlusIcon style={{color: white}} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  createBotton: {
    marginRight: 5,
    alignSelf: 'flex-end',
    width: 45,
    height: 45,
    backgroundColor: teal,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
});

export default PlueElement;

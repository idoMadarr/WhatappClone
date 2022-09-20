import React, {Fragment} from 'react';
import {StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';

// Style
import {white, teal, greyish} from '../../assets/palette/pallete.json';

const PressableCircleElement = ({
  checked,
  onPress,
  isLoading,
  customStyle,
  children,
}) => {
  return (
    <TouchableOpacity
      onPress={checked ? onPress : null}
      style={[
        styles.createBotton,
        {backgroundColor: checked ? teal : greyish, ...customStyle},
      ]}
      activeOpacity={0.8}>
      {isLoading ? (
        <ActivityIndicator size={'large'} color={white} />
      ) : (
        <Fragment>{children}</Fragment>
      )}
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

export default PressableCircleElement;

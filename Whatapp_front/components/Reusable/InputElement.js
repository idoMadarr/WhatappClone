import React, {useRef} from 'react';
import {View, StyleSheet, TextInput, Animated} from 'react-native';

// Components
import TextElement from './TextElement';

// Styles
import {dark, light, white} from '../../assets/palette/pallete.json';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const InputElement = ({
  inputValue,
  onChangeText,
  errorMessage,
  keyboardType,
  label,
  editable,
  maxLength,
  customStyle,
}) => {
  const floatingStarts = hp('2%');

  const transitionRef = useRef(new Animated.Value(floatingStarts)).current;
  const scaleRef = useRef(new Animated.Value(1.1)).current;
  const inputRef = useRef();

  const floatFocus = (duration = 100) => {
    Animated.spring(transitionRef, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start();
    Animated.timing(scaleRef, {
      toValue: 0.8,
      duration,
      useNativeDriver: true,
    }).start();
    inputRef.current.focus();
  };

  const floatBlur = (duration = 100) => {
    if (inputValue.length === 0) {
      Animated.spring(transitionRef, {
        toValue: floatingStarts,
        duration,
        useNativeDriver: true,
      }).start();
      Animated.timing(scaleRef, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.InputElementConainer}>
      <View style={[styles.inputContainer, customStyle]}>
        <TextInput
          label={label}
          value={inputValue}
          onChangeText={onChangeText}
          onBlur={floatBlur}
          onFocus={floatFocus}
          editable={editable}
          keyboardType={keyboardType ? 'decimal-pad' : 'default'}
          maxLength={maxLength}
          ref={node => (inputRef.current = node)}
          style={[styles.input, {backgroundColor: editable ? white : light}]}
        />
      </View>
      <Animated.View
        onTouchEnd={floatFocus}
        style={[
          styles.floatingLable,
          {transform: [{translateY: transitionRef}]},
        ]}>
        <Animated.Text style={{transform: [{scale: scaleRef}]}}>
          {label}
        </Animated.Text>
      </Animated.View>
      <TextElement small>{errorMessage}</TextElement>
    </View>
  );
};

const styles = StyleSheet.create({
  InputElementConainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    borderColor: dark,
  },
  input: {
    paddingLeft: 10,
    width: wp('90%'),
  },
  floatingLable: {
    position: 'absolute',
    left: 15,
  },
});

export default InputElement;

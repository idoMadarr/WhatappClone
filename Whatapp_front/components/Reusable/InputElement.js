import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Animated,
  TouchableOpacity,
} from 'react-native';

// Components
import TextElement from './TextElement';

// Styles
import {dark, warning, regular, black} from '../../assets/palette/pallete.json';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const InputElement = ({
  children,
  inputValue,
  onChangeText,
  errorMessage,
  numPad,
  secureTextEntry,
  handleSecureEntry,
  label,
  editable,
  maxLength,
  width,
  customStyle,
}) => {
  const floatingStarts = hp('2%');

  const transitionRef = useRef(new Animated.Value(floatingStarts)).current;
  const scaleRef = useRef(new Animated.Value(0.9)).current;
  const inputRef = useRef();

  useEffect(() => {
    inputValue?.length > 0 && floatFocus(0) && floatBlur(0);
  }, []);

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
        toValue: 0.9,
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
          secureTextEntry={secureTextEntry}
          editable={editable}
          keyboardType={numPad ? 'decimal-pad' : 'default'}
          maxLength={maxLength}
          ref={node => (inputRef.current = node)}
          style={[styles.input, {width: width || wp('90%')}]}
        />
        <TouchableOpacity
          onPress={handleSecureEntry}
          style={styles.iconContainer}>
          {children}
        </TouchableOpacity>
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
      <TextElement customStyle={styles.error} small>
        {errorMessage || ' '}
      </TextElement>
    </View>
  );
};

const styles = StyleSheet.create({
  InputElementConainer: {
    alignItems: 'center',
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 6,
    height: 46,
    borderColor: dark,
    alignItems: 'flex-end',
  },
  input: {
    paddingLeft: 10,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: 45,
    height: '100%',
    overflow: 'hidden',
  },
  floatingLable: {
    position: 'absolute',
    top: -1,
    left: '5%',
  },
  error: {
    width: '98%',
    textAlign: 'left',
    color: warning,
  },
});

export default InputElement;

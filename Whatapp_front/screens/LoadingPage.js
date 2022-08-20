import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

// Components
import TextElement from '../components/Reusable/TextElement';

// Styles
import {primary, white} from '../assets/palette/pallete.json';

const LoadingPage = () => {
  return (
    <View style={styles.screen}>
      <TextElement>Loading ...</TextElement>
      <ActivityIndicator size={'large'} color={white} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: primary,
  },
});

export default LoadingPage;

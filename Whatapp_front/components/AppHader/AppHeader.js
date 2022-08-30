import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

// Components
import TextElement from '../Reusable/TextElement';

// Styles
import {primary, white} from '../../assets/palette/pallete.json';

const headerHeight = Dimensions.get('window').height * 0.08;

const AppHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <TextElement customStyle={{color: white, fontSize: 22}}>
        Whatsapp
      </TextElement>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: headerHeight,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: primary,
  },
});

export default AppHeader;

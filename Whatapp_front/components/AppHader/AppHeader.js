import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';

// Components
import TextElement from '../Reusable/TextElement';

// Styles
import {primary, white} from '../../assets/palette/pallete.json';

const headerHeight = Dimensions.get('window').height * 0.12;

const AppHeader = () => {
  const username = useSelector(state => state.mainSlice.user.username);

  return (
    <View style={styles.headerContainer}>
      <TextElement
        customStyle={{color: white}}>{`Hi ${username} : )`}</TextElement>
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
    paddingHorizontal: 24,
    backgroundColor: primary,
  },
});

export default AppHeader;

import React from 'react';
import {View, StyleSheet} from 'react-native';

// Components
import TextElement from '../../Reusable/TextElement';

// Style
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const ContanctItem = ({contact}) => {
  return (
    <View style={styles.contactContainer}>
      <TextElement>{contact.email}</TextElement>
    </View>
  );
};

const styles = StyleSheet.create({
  contactContainer: {
    height: hp('12%'),
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
});

export default ContanctItem;

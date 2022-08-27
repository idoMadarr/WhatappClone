import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';

// Components
import TextElement from '../Reusable/TextElement';

const CountryItem = ({countryName, iso2, onSelect}) => {
  return (
    <TouchableOpacity
      onPress={onSelect.bind(this, {countryName, iso2})}
      style={styles.itemContainer}>
      <TextElement>{countryName}</TextElement>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: `https://countryflagsapi.com/png/${iso2}`}}
          resizeMode={'cover'}
          style={styles.image}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  imageContainer: {
    height: 38,
    width: 38,
    borderRadius: 50,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default CountryItem;

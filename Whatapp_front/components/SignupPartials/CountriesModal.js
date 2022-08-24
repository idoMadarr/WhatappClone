import React from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';

// Components
import TextElement from '../Reusable/TextElement';

// Fixtures
import {countriesArray} from '../../fixtures/countries.json';

const CountriesModal = ({closeModal}) => {
  return (
    <View>
      <TouchableOpacity onPress={closeModal}>
        <TextElement>Close</TextElement>
        <FlatList
          data={countriesArray}
          keyExtractor={itemData => itemData.iso2}
          renderItem={({item}) => <TextElement>{item.name}</TextElement>}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CountriesModal;

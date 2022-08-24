import React, {useRef} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

// Components
import StatusBarElement from '../components/Reusable/StatusBarElement';
import SignupForm from '../components/SignupPartials/SignupForm';
import CountriesModal from '../components/SignupPartials/CountriesModal';
import {Modalize} from 'react-native-modalize';

// Styles
import {primary, white} from '../assets/palette/pallete.json';

import {countriesArray} from '../fixtures/countries.json';
import TextElement from '../components/Reusable/TextElement';

const SignupScreen = () => {
  const modalizeRef = useRef();

  const onPicker = () => {
    openModal();
  };

  const openModal = () => modalizeRef.current.open();

  const closeModal = () => modalizeRef.current.close();

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBarElement barStyle={'light-content'} backgroundColor={primary} />
      <ScrollView scrollEnabled={false} showsVerticalScrollIndicator={false}>
        <SignupForm onPicker={onPicker} />
      </ScrollView>
      <Modalize
        ref={modalizeRef}
        flatListProps={{
          data: countriesArray,
          keyExtractor: itemData => itemData.iso2,
          ListHeaderComponent: () => (
            <TouchableOpacity onPress={closeModal}>
              <TextElement>Close!</TextElement>
            </TouchableOpacity>
          ),
          renderItem: ({item}) => (
            <TouchableOpacity>
              <TextElement>{item.name}</TextElement>
            </TouchableOpacity>
          ),
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: white,
  },
});

export default SignupScreen;

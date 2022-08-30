import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

// Components
import StatusBarElement from '../components/Reusable/StatusBarElement';
import SignupForm from '../components/SignupPartials/SignupForm';
import CountryItem from '../components/SignupPartials/CountryItem';
import TextElement from '../components/Reusable/TextElement';
import LinkElement from '../components/Reusable/LinkElement';
import {Modalize} from 'react-native-modalize';

// Styles
import CloseIcon from '../assets/icons/closeIcon.svg';
import {primary, white, greyish, black} from '../assets/palette/pallete.json';

// Fixtures
import {countriesArray} from '../fixtures/countries.json';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const defaultCountry = {iso2: 'IL', countryCode: 972, name: 'Israel'};

const SignupScreen = ({navigation}) => {
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const modalizeRef = useRef();

  const onPicker = () => {
    openModal();
  };

  const onSelect = country => {
    setSelectedCountry(country);
    closeModal();
  };

  const openModal = () => modalizeRef.current.open();

  const closeModal = () => modalizeRef.current.close();

  const signinNavigate = () => navigation.navigate('signin-screen');

  const flatListProps = {
    data: countriesArray,
    keyExtractor: itemData => itemData.iso2,
    initialNumToRender: 10,
    removeClippedSubviews: true,
    showsVerticalScrollIndicator: false,
    ListHeaderComponent: () => (
      <View style={styles.listHeader}>
        <TouchableOpacity onPress={closeModal} style={styles.center}>
          <CloseIcon style={{color: black}} />
          <TextElement>Close</TextElement>
        </TouchableOpacity>
      </View>
    ),
    renderItem: ({item}) => (
      <CountryItem
        countryName={item.name}
        iso2={item.iso2}
        onSelect={onSelect}
      />
    ),
    ItemSeparatorComponent: () => <View style={styles.seperator} />,
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBarElement barStyle={'light-content'} backgroundColor={primary} />
      <SignupForm
        onPicker={onPicker}
        selectedCountry={selectedCountry}
        signinNavigate={signinNavigate}
      />
      <Modalize
        ref={modalizeRef}
        modalStyle={{paddingTop: 28}}
        modalHeight={hp('65%')}
        flatListProps={flatListProps}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: white,
    paddingBottom: 16,
  },
  listHeader: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
  },
  seperator: {
    borderWidth: 0.4,
    marginHorizontal: 16,
    borderColor: greyish,
  },
});

export default SignupScreen;

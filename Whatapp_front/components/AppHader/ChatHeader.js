import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

// Components
import TextElement from '../Reusable/TextElement';

// Style
import {primary, white} from '../../assets/palette/pallete.json';
import UserIcon from '../../assets/icons/userIcon.svg';
import BackArrow from '../../assets/icons/backArrow.svg';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const ChatHeader = () => {
  const navigation = useNavigation();

  const selectedUser = useSelector(state => state.mainSlice.selectedUser);

  const backHandler = () => navigation.goBack();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.arrowContainer} onPress={backHandler}>
        <BackArrow style={{color: white}} />
      </TouchableOpacity>
      <UserIcon style={{color: white}} />
      <View>
        <TextElement customStyle={styles.username}>
          {selectedUser.email.split('@')[0]}
        </TextElement>
        <TextElement customStyle={styles.username} small>
          * {selectedUser.email}
        </TextElement>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: hp('10%'),
    backgroundColor: primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  arrowContainer: {
    padding: 5,
  },
  username: {
    color: white,
    marginHorizontal: 8,
  },
});

export default ChatHeader;

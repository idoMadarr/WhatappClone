import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useDispatch} from 'react-redux';
import {setAuth} from '../../redux/slice';

// Components
import TextElement from '../Reusable/TextElement';

// Style
import {dark, black} from '../../assets/palette/pallete.json';
import GoogleIcon from '../../assets/icons/icon_google.svg';
import FacebookIcon from '../../assets/icons/icon_facebook.svg';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

// Utils
import {connectOAuth} from '../../utils/connectOAuth';

const SocialLogin = () => {
  const dispatch = useDispatch();

  const googleSignIn = () => {
    connectOAuth();

    GoogleSignin.hasPlayServices()
      .then(hasPlayService => {
        if (hasPlayService) {
          GoogleSignin.signIn()
            .then(userInfo => {
              dispatch(setAuth());
              console.log(JSON.stringify(userInfo), 'this?');
            })
            .catch(e => {
              console.log('ERROR IS: ' + JSON.stringify(e));
            });
        }
      })
      .catch(e => {
        console.log('ERROR IS: ' + JSON.stringify(e));
      });
  };

  //   const signOut = async () => {
  //     try {
  //       connectOAuth();

  //       await GoogleSignin.signOut();
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  return (
    <View style={styles.socialContainer}>
      <TouchableOpacity
        style={styles.social}
        onPress={googleSignIn}
        activeOpacity={0.6}>
        <GoogleIcon />
        <TextElement customStyle={styles.black}>
          Continue with Google
        </TextElement>
        <View style={styles.space} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.social}
        // onPress={googleSignIn}
        activeOpacity={0.6}>
        <FacebookIcon />
        <TextElement customStyle={styles.black}>
          Continue with Facebook
        </TextElement>
        <View style={styles.space} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  socialContainer: {
    width: wp('85%'),
  },
  social: {
    padding: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 6,
    height: 46,
    borderColor: dark,
    marginVertical: 8,
  },
  space: {
    width: 30,
  },
  black: {
    color: black,
  },
});

export default SocialLogin;

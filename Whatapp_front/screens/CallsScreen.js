import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../redux/actions';

// Components
import StatusBarElement from '../components/Reusable/StatusBarElement';
import TextElement from '../components/Reusable/TextElement';

// Style
import {primary} from '../assets/palette/pallete.json';

import {getStorage} from '../utils/asyncStorage';

const CallsScreen = () => {
  const dispatch = useDispatch();

  const {email} = useSelector(state => state.mainSlice.user);

  const test = async () => {
    const t = await getStorage('clientId');
    console.log(t);
  };

  return (
    <View>
      <StatusBarElement barStyle={'light-content'} backgroundColor={primary} />
      <TextElement>CallsScreen</TextElement>
      <TouchableOpacity
        onPress={async () => {
          const clientId = await getStorage('clientId');
          dispatch(logout({email, clientId}));
        }}>
        <TextElement>Logout</TextElement>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => test()}>
        <TextElement>client id</TextElement>
      </TouchableOpacity>
    </View>
  );
};

export default CallsScreen;

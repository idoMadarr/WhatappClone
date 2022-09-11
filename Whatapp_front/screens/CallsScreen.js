import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../redux/actions';

// Components
import StatusBarElement from '../components/Reusable/StatusBarElement';
import TextElement from '../components/Reusable/TextElement';

// Style
import {primary} from '../assets/palette/pallete.json';

const CallsScreen = () => {
  const dispatch = useDispatch();

  const {email} = useSelector(state => state.mainSlice.user);

  return (
    <View>
      <StatusBarElement barStyle={'light-content'} backgroundColor={primary} />
      <TextElement>CallsScreen</TextElement>
      <TouchableOpacity onPress={() => dispatch(logout({email}))}>
        <TextElement>Logout</TextElement>
      </TouchableOpacity>
    </View>
  );
};

export default CallsScreen;

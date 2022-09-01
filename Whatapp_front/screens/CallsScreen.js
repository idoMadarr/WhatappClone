import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {logout} from '../redux/actions';

// Components
import StatusBarElement from '../components/Reusable/StatusBarElement';
import TextElement from '../components/Reusable/TextElement';

// Style
import {primary} from '../assets/palette/pallete.json';

const CallsScreen = () => {
  const dispatch = useDispatch();

  return (
    <View>
      <StatusBarElement barStyle={'light-content'} backgroundColor={primary} />
      <TextElement>CallsScreen</TextElement>
      <TouchableOpacity onPress={() => dispatch(logout())}>
        <TextElement>Logout</TextElement>
      </TouchableOpacity>
    </View>
  );
};

export default CallsScreen;

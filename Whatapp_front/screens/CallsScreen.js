import React from 'react';
import {View, Text} from 'react-native';

// Components
import StatusBarElement from '../components/Reusable/StatusBarElement';
import TextElement from '../components/Reusable/TextElement';

import {primary} from '../assets/palette/pallete.json';

const CallsScreen = () => {
  return (
    <View>
      <StatusBarElement barStyle={'light-content'} backgroundColor={primary} />
      <TextElement>CallsScreen</TextElement>
    </View>
  );
};

export default CallsScreen;

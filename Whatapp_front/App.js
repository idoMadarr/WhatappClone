import React from 'react';
import {Provider} from 'react-redux';
import AppNavigation from './navigation/AppNavigation';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;

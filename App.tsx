import {View, Text, StatusBar} from 'react-native';
import React from 'react';

import AuthNavigation from './src/router/AuthNavigation';

const App = () => {
  return (
    <>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor="transparent"></StatusBar>
      <AuthNavigation></AuthNavigation>
    </>
  );
};

export default App;

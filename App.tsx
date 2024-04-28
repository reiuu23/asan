import { View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import AuthNavigation from './src/router/AuthNavigation';

const App = () => {
  return (
    <React.Fragment>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor="transparent"></StatusBar>
      <NavigationContainer>
        <AuthNavigation></AuthNavigation>
      </NavigationContainer>
    </React.Fragment>
  );
};

export default App;

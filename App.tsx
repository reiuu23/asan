import { View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CheckIcon } from './src/components/Icons';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import React from 'react';
import 'react-native-gesture-handler';

import AuthNavigation from './src/router/AuthNavigation';

const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green', height: 100 }}
      contentContainerStyle={{ paddingHorizontal: 20 }}
      text1Style={{
        fontSize: 15,
        fontFamily: 'Inter-Bold',
        color: '#3E5A47'
      }}
      text2Style={{
        fontSize: 12,
        fontFamily: 'Inter-SemiBold',
        color: '#3E5A47',
        marginTop: 10
      }}
    />
  ),

  error: props => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  ),

  welcomeToast: ({ props }) => (
    <View
      style={{
        width: '95%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        borderWidth: 5,
        borderColor: '#53785F',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <Text
        style={{
          fontSize: 14,
          fontFamily: 'Inter-SemiBold',
          color: '#53785F'
        }}>
        Welcome to ASAN Integrated, {props.first_name}
      </Text>
    </View>
  ),

  successToast: ({ props }) => (
    <View
      style={{
        width: '95%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        borderWidth: 5,
        borderColor: '#53785F'
      }}>
      <Text
        style={{
          fontSize: 14,
          fontFamily: 'Inter-SemiBold',
          color: '#53785F'
        }}>
        Success :
      </Text>
      <Text
        style={{
          fontSize: 14,
          fontFamily: 'Inter-SemiBold',
          color: '#53785F',
          marginTop: 10
        }}>
        {props.success_message}
      </Text>
    </View>
  ),

  errorToast: ({ props }) => (
    <View
      style={{
        width: '95%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        borderWidth: 5,
        borderColor: '#B71C1C'
      }}>
      <Text
        style={{
          fontSize: 14,
          fontFamily: 'Inter-SemiBold',
          color: '#B71C1C'
        }}>
        We have encountered an error :
      </Text>
      <Text
        style={{
          fontSize: 14,
          fontFamily: 'Inter-SemiBold',
          color: '#B71C1C',
          marginTop: 10
        }}>
        {props.error_message}
      </Text>
    </View>
  )
};

const App = () => {
  return (
    <GestureHandlerRootView>
      <React.Fragment>
        <StatusBar
          translucent
          barStyle={'dark-content'}
          backgroundColor="transparent"></StatusBar>
        <NavigationContainer>
          <AuthNavigation></AuthNavigation>
          <Toast swipeable={true} config={toastConfig} visibilityTime={4000}/>
        </NavigationContainer>
      </React.Fragment>
    </GestureHandlerRootView>
  );
};

export default App;

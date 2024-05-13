import {useContext} from 'react';
import {Alert} from 'react-native';
import {AuthContext} from '../context/AuthContext';

export const logoutUser = props => {
  const {navigation} = props;
  Alert.alert('Are you sure?', 'Do you wish to sign out?', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => navigation.pop()},
  ]);
};

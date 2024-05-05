import {useState} from 'react';
import {Keyboard} from 'react-native';

// export const keyboardShowListener = Keyboard.addListener(
//   'keyboardDidShow',
//   () => {
//     return true;
//   },
// );

// export const keyboardHideListener = Keyboard.addListener(
//   'keyboardDidHide',
//   () => {
//     return false;
//   },
// );

export const keyboardListener = Keyboard.addListener(keyboardStatus, () => {
  if (keyboardStatus === 'keyboardDidShow') {
    return true;
  }
  return false;
});

import {Dimensions} from 'react-native';

export const windowWidth = () => {
  return Dimensions.get('window').width;
};

export const windowHeight = () => {
  return Dimensions.get('window').height;
};

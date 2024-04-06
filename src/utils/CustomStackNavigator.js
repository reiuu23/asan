import {createStackNavigator} from '@react-navigation/stack';
import {Alert} from 'react-native';

const CustomStackNavigator = ({screens}) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      onBackButtonPress={() => {
        return Alert.alert('Are you sure?', 'Do you wish to sign out?', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => setSession(null)},
        ]);
      }}>
      {screens.map((screen, index) => (
        <Stack.Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default CustomStackNavigator;

import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import CustomStackNavigator from '../utils/CustomStackNavigator';

// Authentication Route Screens

import Onboarding from '../screens/auth/AuthOnboarding';
import Login from '../screens/auth/AuthUser';

console.log(1);

export default function AuthNavigation() {
  // Stack Navigation Config (Authentication Flow)
  const options = {
    headerShown: false,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  };

  const authScreens = [
    {
      name: 'Onboarding',
      component: Onboarding,
      options,
    },
    {
      name: 'Login',
      component: Login,
      options,
    },
  ];

  return (
    <NavigationContainer>
      <CustomStackNavigator screens={authScreens}></CustomStackNavigator>
    </NavigationContainer>
  );
}

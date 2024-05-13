import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CustomStackNavigator from '../utils/CustomStackNavigator';

import Onboarding from '../screens/auth/AuthOnboarding';
import Auth from '../screens/auth/AuthUser';

const options = {
  headerShown: false,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
};

const authScreens = [
  {
    name: 'Onboarding',
    component: Onboarding,
    options
  },
  {
    name: 'Auth',
    component: Auth,
    options
  }
];

export default function AuthNavigation() {
  return <CustomStackNavigator screens={authScreens}></CustomStackNavigator>;
}

import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

// Authentication Route Screens

import Onboarding from '../screens/auth/AuthOnboarding';
import Login from '../screens/auth/AuthUser';

const Stack = createStackNavigator();

export default function AuthNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}></Stack.Screen>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

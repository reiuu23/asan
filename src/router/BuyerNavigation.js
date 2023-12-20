import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

// LitterApp Screens Routes

import BuyerHome from '../screens/buyers/BuyerHome';
import BuyerProfile from '../screens/buyers/BuyerProfile';

const Stack = createStackNavigator();

export default function BuyerNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BuyerHome"
        component={BuyerHome}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}></Stack.Screen>
      <Stack.Screen
        name="BuyerProfile"
        component={BuyerProfile}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}></Stack.Screen>
    </Stack.Navigator>
  );
}

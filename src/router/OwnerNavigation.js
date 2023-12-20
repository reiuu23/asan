import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

// LitterApp Screens Routes

import OwnerHome from '../screens/owners/OwnerHome';
import OwnerProfile from '../screens/owners/OwnerProfile';

const Stack = createStackNavigator();

export default function OwnerNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OwnerHome"
        component={OwnerHome}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}></Stack.Screen>
      <Stack.Screen
        name="OwnerProfile"
        component={OwnerProfile}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}></Stack.Screen>
    </Stack.Navigator>
  );
}

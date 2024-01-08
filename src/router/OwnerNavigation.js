import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import CustomStackNavigator from '../utils/CustomStackNavigator';

// LitterApp Screens Routes

import OwnerHome from '../screens/owners/OwnerHome';
import OwnerProfile from '../screens/owners/OwnerProfile';

export default function OwnerNavigation() {
  const ownerScreens = [
    {
      name: 'OwnerHome',
      component: OwnerHome,
      options,
    },
    {
      name: 'OwnerProfile',
      component: OwnerProfile,
      options,
    },
  ];

  return <CustomStackNavigator screens={ownerScreens}></CustomStackNavigator>;
}

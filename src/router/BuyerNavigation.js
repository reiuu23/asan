import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import {
  NavigationContainer,
  NavigationHelpersContext,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Litter Buyer Screens

import BuyerAbout from '../screens/buyers/BuyerAbout';
import BuyerAnalytics from '../screens/buyers/BuyerAnalytics';
import BuyerCart from '../screens/buyers/BuyerCart';
import BuyerChat from '../screens/buyers/BuyerChat';
import BuyerHome from '../screens/buyers/BuyerHome';
import BuyerProfile from '../screens/buyers/BuyerProfile';

// Tab Icons
import LitterTabIcon from '../assets/img/littertablogo.svg';
import ChatIcon from '../assets/img/chatIcon.svg';

const Tab = createBottomTabNavigator();

const TabGroup = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={BuyerHome}></Tab.Screen>
      <Tab.Screen name="Chat" component={BuyerChat}></Tab.Screen>
      <Tab.Screen name="About" component={BuyerAbout}></Tab.Screen>
      <Tab.Screen name="Cart" component={BuyerCart}></Tab.Screen>
      <Tab.Screen name="Analytics" component={BuyerAnalytics}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default function BuyerNavigation() {
  return <TabGroup></TabGroup>;
}

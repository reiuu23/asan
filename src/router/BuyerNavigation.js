import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import {
  NavigationContainer,
  NavigationHelpersContext,
} from '@react-navigation/native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeIcon from 'react-native-vector-icons/AntDesign';

// Litter Buyer Screens

import BuyerAbout from '../screens/shared/AboutASAN';
import BuyerChat from '../screens/buyers/BuyerChat';
import BuyerHome from '../screens/buyers/BuyerHome';
import BuyerStocks from '../screens/buyers/BuyerStocks';
import BuyerAnalytics from '../screens/buyers/BuyerAnalytics';
import BuyerProfile from '../screens/buyers/BuyerProfile';

const TabGroup = () => {
  // Initialized a new bottom tab navigator.

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {height: 81},
        tabBarLabelPosition: 'beside-icon',
        tabBarItemStyle: {
          borderBottomWidth: 2,
          borderBottomColor: 'white',
        },
      }}>
      <Tab.Screen name="About" component={BuyerAbout}></Tab.Screen>
      <Tab.Screen name="Chat" component={BuyerChat}></Tab.Screen>
      <Tab.Screen name="Home" component={BuyerHome}></Tab.Screen>
      <Tab.Screen name="Stocks" component={BuyerStocks}></Tab.Screen>
      <Tab.Screen name="Analytics" component={BuyerAnalytics}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default function BuyerNavigation() {
  return <TabGroup></TabGroup>;
}

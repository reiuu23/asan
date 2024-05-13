import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionPresets,
} from '@react-navigation/stack';

import {
  NavigationContainer,
  NavigationHelpersContext,
} from '@react-navigation/native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  AsanIconBottom,
  AsanIconBottomB,
  ChatIcon,
  HomeIcon,
  InventoryIcon,
  StatsIcon,
} from '../components/Icons';

// Litter Buyer Screens

import BuyerAbout from '../screens/shared/AboutASAN';
import BuyerChat from '../screens/buyers/BuyerChat';
import BuyerHome from '../screens/buyers/BuyerHome';
import BuyerStocks from '../screens/buyers/BuyerStocks';
import BuyerAnalytics from '../screens/buyers/BuyerAnalytics';
import BuyerProfile from '../screens/buyers/BuyerProfile';
import BuyerSelection from '../screens/buyers/BuyerSelection';

import {StyleSheet, View} from 'react-native';


const TabGroup = () => {
  // Initialized a new bottom tab navigator.

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="initialRoute"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: 81 },
      }}>
      <Tab.Screen
        name="About"
        component={BuyerAbout}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[styles.tabBarIcon, focused && styles.activeTabBarIcon]}>
              <AsanIconBottomB></AsanIconBottomB>
            </View>
          )
        }}></Tab.Screen>
      <Tab.Screen
        name="Chat"
        component={BuyerChat}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[styles.tabBarIcon, focused && styles.activeTabBarIcon]}>
              <ChatIcon></ChatIcon>
            </View>
          )
        }}></Tab.Screen>
      <Tab.Screen
        name="Home"
        component={BuyerHome}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[styles.tabBarIcon, focused && styles.activeTabBarIcon]}>
              <HomeIcon></HomeIcon>
            </View>
          )
        }}></Tab.Screen>
      <Tab.Screen
        name="Stocks"
        component={BuyerStocks}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[styles.tabBarIcon, focused && styles.activeTabBarIcon]}>
              <InventoryIcon></InventoryIcon>
            </View>
          )
        }}></Tab.Screen>
      <Tab.Screen
        name="Analytics"
        component={BuyerAnalytics}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[styles.tabBarIcon, focused && styles.activeTabBarIcon]}>
              <StatsIcon></StatsIcon>
            </View>
          )
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default function BuyerNavigation() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      // initialRouteName="Selection"
      screenOptions={TransitionPresets.ModalSlideFromBottomIOS}>
      <Stack.Screen
        name="Selection"
        component={BuyerSelection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={BuyerProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Root"
        component={TabGroup}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  activeTabBarIcon: {
    paddingBottom: 5,
    borderBottomWidth: 3, // Add underline
    borderColor: '#3E5A47', // Color of the underline
  },
});

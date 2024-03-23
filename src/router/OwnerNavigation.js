import {View, Text, TouchableOpacity, Image, Button, Alert} from 'react-native';
import {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import CustomStackNavigator from '../utils/CustomStackNavigator';

import Profile from '../screens/owners/OwnerProfile';
import Verify from '../screens/shared/UserVerification';
import Verified from '../screens/shared/UserVerified';
import Categories from '../screens/owners/OwnerScrap';
import Stocks from '../screens/owners/OwnerStocks';
import Analytics from '../screens/owners/OwnerAnalytics';
import Plans from '../screens/shared/Subscription';

import About from '../screens/shared/AboutASAN';
import Chat from '../screens/owners/OwnerChat';
import Home from '../screens/owners/OwnerHome';
import Notifications from '../screens/owners/OwnerNotifs';

// LitterApp Screens Routes

import OwnerHome from '../screens/owners/OwnerHome';
import OwnerProfile from '../screens/owners/OwnerProfile';

import {
  SidebarAnalytics,
  SidebarCategories,
  SidebarHome,
  SidebarLogout,
  SidebarPlans,
  SidebarStocks,
} from '../components/Icons';

const CustomDrawerContent = (props, navigation) => {
  return (
    <>
      <View style={{marginTop: 50}}>
        <TouchableOpacity
          style={{
            width: 80,
            height: 80,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{
              borderRadius: 50,
              borderWidth: 5,
              borderColor: '#3E5A47',
              width: '100%',
              height: '100%',
              marginLeft: 35,
              resizeMode: 'contain',
            }}
            source={require('../assets/img/chaewon.jpg')}></Image>
        </TouchableOpacity>
        <Text
          style={{
            width: 112,
            fontFamily: 'Inter-Bold',
            fontSize: 20,
            color: '#3E5A47',
            marginTop: 10,
            marginLeft: 20,
          }}>
          Kim Chaewon
        </Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Logout"
          labelStyle={{
            color: '#3E5A47',
            fontFamily: 'Inter-Medium',
            fontSize: 16,
          }}
          onPress={() =>
            Alert.alert('Sign Out', 'Do you wish to sign out of ASAN?')
          }
          icon={() => {
            return <SidebarLogout />;
          }}
        />
      </DrawerContentScrollView>
    </>
  );
};

const BottomTab = () => {
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
      <Tab.Screen name="About" component={About}></Tab.Screen>
      <Tab.Screen name="Chat" component={Chat}></Tab.Screen>
      <Tab.Screen name="Home" component={Home}></Tab.Screen>
      <Tab.Screen name="Analytics" component={Analytics}></Tab.Screen>
      <Tab.Screen name="Notifications" component={Notifications}></Tab.Screen>
    </Tab.Navigator>
  );
};

const Sidebar = () => {
  const [verified, setVerified] = useState(false);

  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '60%',
          backgroundColor: '#F4F5F4',
        },
        drawerLabelStyle: {
          color: '#3E5A47',
          fontFamily: 'Inter-Medium',
          fontSize: 16,
          width: '123%',
        },
        itemStyle: {marginVertical: 0},
        contentContainerStyle: {paddingVertical: 0},
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      {!verified && (
        <Drawer.Screen
          name="Verify"
          component={Verify}
          options={{
            drawerLabel: 'Verify Account',
            drawerLabelStyle: {
              color: '#F4F5F4',
              fontFamily: 'Inter-Medium',
              fontSize: 16,
              width: '123%',
              textAlign: 'center',
            },
            headerStyle: {backgroundColor: '#3498db'},
            drawerItemStyle: {
              backgroundColor: '#627D6B',
              borderRadius: 10,
              width: '90%',
              height: 50,
              marginBottom: 50,
              gap: 0,
            },
          }}
        />
      )}
      <Drawer.Screen
        name="Home"
        component={BottomTab}
        options={{
          drawerIcon: () => {
            return <SidebarHome />;
          },
        }}
      />
      <Drawer.Screen
        name="Categories"
        component={Categories}
        options={{
          drawerIcon: () => {
            return <SidebarCategories />;
          },
        }}
      />
      <Drawer.Screen
        name="Stocks"
        component={Stocks}
        options={{
          drawerIcon: () => {
            return <SidebarStocks />;
          },
        }}
      />
      <Drawer.Screen
        name="Plans"
        component={Plans}
        options={{
          drawerIcon: () => {
            return <SidebarPlans />;
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default function OwnerNavigation() {
  return <Sidebar></Sidebar>;
}

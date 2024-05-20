import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  Alert,
  StyleSheet
} from 'react-native';
import { useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TransitionPresets } from '@react-navigation/stack';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';

import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack';

import CustomStackNavigator from '../utils/CustomStackNavigator';

import Profile from '../screens/owners/OwnerProfile';
import Verify from '../screens/shared/UserVerification';
import Verified from '../screens/shared/UserVerified';
import Categories from '../screens/owners/OwnerScrap';
import Stocks from '../screens/owners/OwnerStocks';
import Analytics from '../screens/owners/OwnerAnalytics';
import Plans from '../screens/shared/Subscription';
import Subscription from '../screens/shared/Subscription';
import About from '../screens/shared/AboutASAN';
import Chat from '../screens/owners/OwnerChat';
import Home from '../screens/owners/OwnerHome';
import Notifications from '../screens/owners/OwnerNotifs';

// LitterApp Screens Routes

import OwnerHome from '../screens/owners/OwnerHome';
import OwnerProfile from '../screens/owners/OwnerProfile';

import {
  AnalyticsBottomIcon,
  AsanIconBottomB,
  ChatIcon,
  CheckIcon,
  HomeIcon,
  SidebarCategories,
  SidebarHome,
  SidebarLogout,
  SidebarPlans,
  SidebarStocks
} from '../components/Icons';
import { AuthContext } from '../context/AuthContext';

const CustomDrawerContent = props => {

  const { session, setSession, dataSession } = useContext(AuthContext);

  console.log('session data: ', session);
  return (
    <>
      <View style={{ marginTop: 50 }}>
        <TouchableOpacity
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onPress={() => props.navigation.navigate('Profile')}>
          {session ? (
            session.userImage ? (
              <Image
                style={{
                  borderRadius: 50,
                  borderWidth: 5,
                  borderColor: '#3E5A47',
                  width: '100%',
                  height: '100%',
                  marginLeft: 35,
                  resizeMode: 'contain'
                }}
                source={{ uri: session.userImage }}></Image>
            ) : (
              <Image
                style={{
                  borderRadius: 50,
                  borderWidth: 5,
                  borderColor: '#3E5A47',
                  width: '100%',
                  height: '100%',
                  marginLeft: 35,
                  resizeMode: 'contain'
                }}
                source={require('../assets/img/placeholderUser.jpg')}></Image>
            )
          ) : (
            <ActivityIndicator size={'large'} color={'#FFFFFF'} />
          )}
        </TouchableOpacity>
        <Text
          style={{
            width: 200,
            fontFamily: 'Inter-Bold',
            fontSize: 20,
            // textAlign: 'center',
            color: '#3E5A47',
            marginTop: 20,
            marginLeft: 20
          }}>
          {session.firstName}
        </Text>
        {session.verificationStatus !== 0 ? (
          session.subscription_status === 1 && (
            <>
              <Text
                style={{
                  fontFamily: 'Inter-Bold',
                  fontSize: 14,
                  // textAlign: 'center',
                  color: '#3E5A47',
                  marginTop: 20,
                  marginLeft: 20
                }}>
                Account Status:
              </Text>
              {session.verificationStatus === 0 && (
                <Text
                  style={{
                    fontFamily: 'Inter-Medium',
                    fontSize: 14,
                    // textAlign: 'center',
                    color: '#3E5A47',
                    marginTop: 20,
                    marginLeft: 20
                  }}>
                  Not Yet Verified
                </Text>
              )}
              {session.verificationStatus === 1 && (
                <Text
                  style={{
                    fontFamily: 'Inter-Medium',
                    fontSize: 14,
                    // textAlign: 'center',
                    color: '#3E5A47',
                    marginTop: 20,
                    marginLeft: 20
                  }}>
                  Ongoing Verification
                </Text>
              )}
              {session.verificationStatus === 2 && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 15,
                    marginTop: 20
                  }}>
                  <CheckIcon color={'#3E5A47'} />
                  <Text
                    style={{
                      fontFamily: 'Inter-Medium',
                      fontSize: 14,
                      // textAlign: 'center',
                      color: '#3E5A47',
                      marginLeft: 5
                    }}>
                    Account Verified
                  </Text>
                </View>
              )}
            </>
          )
        ) : ('')}
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Logout"
          labelStyle={{
            color: '#3E5A47',
            fontFamily: 'Inter-Medium',
            fontSize: 16
          }}
          onPress={() =>
            Alert.alert('Sign Out', 'Do you wish to sign out of ASAN?', [
              {
                text: 'Yes',
                onPress: () => {
                  setSession({ token: null });
                }
              },
              {
                text: 'Cancel',
                onPress: () => {
                  console.log('Cancelled!');
                }
              }
            ])
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

  const { session } = useContext(AuthContext);

  return (
    <Tab.Navigator
      initialRouteName="Home1"
      backBehavior="initialRoute"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: 81 },
        tabBarLabelPosition: 'beside-icon',
        tabBarItemStyle: {
          borderBottomWidth: 2,
          borderBottomColor: 'white'
        }
      }}>
      <Tab.Screen
        name="About"
        component={About}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[styles.tabBarIcon, focused && styles.activeTabBarIcon]}>
              <AsanIconBottomB></AsanIconBottomB>
            </View>
          )
        }}></Tab.Screen>
      {session.subscription_status === 1 && (
        <Tab.Screen
          name="Chat"
          component={Chat}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={[styles.tabBarIcon, focused && styles.activeTabBarIcon]}>
                <ChatIcon></ChatIcon>
              </View>
            )
          }}></Tab.Screen>
      )}
      <Tab.Screen
        name="Home1"
        backBehavior={() => {
          Alert.alert();
        }}
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[styles.tabBarIcon, focused && styles.activeTabBarIcon]}>
              <HomeIcon></HomeIcon>
            </View>
          )
        }}></Tab.Screen>
      {session.subscription_status === 1 && <Tab.Screen
        name="Analytics"
        component={Analytics}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[styles.tabBarIcon, focused && styles.activeTabBarIcon]}>
              <AnalyticsBottomIcon></AnalyticsBottomIcon>
            </View>
          )
        }}></Tab.Screen>}
    </Tab.Navigator>
  );
};

const Sidebar = () => {
  const [verified, setVerified] = useState(false);

  const { session } = useContext(AuthContext);

  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      backBehavior="initialRoute"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '60%',
          backgroundColor: '#F4F5F4'
        },
        drawerLabelStyle: {
          color: '#3E5A47',
          fontFamily: 'Inter-Medium',
          fontSize: 16,
          width: '123%'
        },
        itemStyle: { marginVertical: 0 },
        contentContainerStyle: { paddingVertical: 0 }
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      {session.verificationStatus === 0 && session.subscription_status === 1 && (
        <Drawer.Screen
          name="Verify"
          component={Verify}
          options={{
            drawerLabel: 'Verify Account',
            drawerLabelStyle: {
              color: '#F4F5F4',
              fontFamily: 'Inter-Medium',
              fontSize: 14,
              marginLeft: 35,
              textAlign: 'center',
              position: 'relative'
              // borderWidth: 1
            },
            headerStyle: { backgroundColor: '#3498db' },
            drawerItemStyle: {
              alignSelf: 'center',
              backgroundColor: '#627D6B',
              borderRadius: 10,
              width: '90%',
              height: 45,
              marginBottom: 20,
              gap: 0
            }
          }}
        />
      )}

      <Drawer.Screen
        name="Home"
        component={BottomTab}
        options={{
          drawerIcon: () => {
            return <SidebarHome />;
          }
        }}
      />
      <Drawer.Screen
        name="Categories"
        component={Categories}
        options={{
          drawerIcon: () => {
            return <SidebarCategories />;
          }
        }}
      />
      <Drawer.Screen
        name="Stocks"
        component={Stocks}
        options={{
          drawerIcon: () => {
            return <SidebarStocks />;
          }
        }}
      />
      <Drawer.Screen
        name="Plans"
        component={Plans}
        options={{
          drawerIcon: () => {
            return <SidebarPlans />;
          }
        }}
      />
    </Drawer.Navigator>
  );
};

export default function OwnerNavigation() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Root"
      screenOptions={TransitionPresets.ModalSlideFromBottomIOS}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Root"
        component={Sidebar}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Subscription"
        component={Subscription}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  activeTabBarIcon: {
    paddingBottom: 5,
    borderBottomWidth: 3, // Add underline
    borderColor: '#3E5A47' // Color of the underline
  }
});

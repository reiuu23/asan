import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import MonthlySubscription from './subscription/MonthlySubscription';
import AnnualSubscription from './subscription/AnnualSubscription';
import PayPalPaymentScreen from './subscription/PaypalPaymentScreen';
import { BackButtonIcon } from '../../components/Icons';
import { AuthContext } from '../../context/AuthContext';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Monthly"
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: '#3E5A47'
        },
        tabBarLabelStyle: {
          color: '#3E5A47',
          fontFamily: 'Inter-Medium'
        }
      }}>
      <Tab.Screen
        name="MonthlySubscription"
        component={MonthlySubscription}
        options={{ tabBarLabel: 'Monthly' }}
      />
      <Tab.Screen
        name="AnnualSubscription"
        component={AnnualSubscription}
        options={{ tabBarLabel: 'Annual' }}
      />
    </Tab.Navigator>
  );
}

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Subscriptions"
        component={MyTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="PayPalPayment"
        component={PayPalPaymentScreen}
      />
    </Stack.Navigator>
  );
}

export default function Subscription({ navigation }) {

  const { session } = React.useContext(AuthContext);

  console.log("session (payments): ", session);

  return (
    <SafeAreaProvider>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackButtonIcon color={'#3E5A47'} />
        </TouchableOpacity>
        {session.subscription_status === 0 ? (
          <Text style={styles.topHeader}>Upgrade to Premium</Text>
        ) : (
          <Text style={styles.topHeader}>Trading Plan (Active)</Text>
        )}
      </View>
      <View style={styles.subscriptionStatusWrapper}>
        <Text style={styles.subscriptionStatusHeader}>
          Subscription Status:
        </Text>
        {session.subscription_status === 0 ? (
          <Text style={styles.subscriptionStatusValue}>Inactive</Text>
        ) : (
          <Text style={styles.subscriptionStatusValue}>
            Renews on {session.subscription.subscription_end_date}
          </Text>
        )}
      </View>
      <MainStack />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  topBar: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20
  },
  topHeader: {
    color: '#3E5A47',
    fontFamily: 'Inter-Bold',
    fontSize: 22
  },
  subscriptionStatusWrapper: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  subscriptionStatusHeader: {
    color: '#3E5A47',
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    textAlign: 'right',
  },
  subscriptionStatusValue: {
    color: '#3E5A47',
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    textAlign: 'right',
  }
});

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack';
import { sessionUpdate } from '../../services/authService';
import { getWarehouseSummary } from '../../services/scrapdataService';
import Login from '../../components/LoginForm';
import BuyerRegister from '../buyers/BuyerRegistration';
import OwnerRegister from '../owners/OwnerRegistration';
import OwnerNavigation from '../../router/OwnerNavigation';
import BuyerNavigation from '../../router/BuyerNavigation';
import CustomStackNavigator from '../../utils/CustomStackNavigator';

export default function AuthUser({ navigation, route }) {
  // Session and Root

  const { userType } = route.params;
  const [session, setSession] = useState({
    token: null,
    userImage: null,
    userType: null,
    subPlan: null,
    selectedWarehouse: null,
  });

  const [dataSession, setDataSession] = useState(null);
  const [subscriptionMode, setSubscriptionMode] = useState(null);

  // Check if loadScrap turns to true

  const options = {
    headerShown: false,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
  };

  const authScreens = [
    {
      name: 'Login',
      component: Login,
      options
    },
    {
      name: 'Register',
      component: userType === 'owner' ? OwnerRegister : BuyerRegister,
      options
    }
  ];

  const fetchSummary = async (warehouseId, token) => {
    try {
      const response = await getWarehouseSummary(warehouseId, token);
      setDataSession(response);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          session,
          setSession,
          userType,
          dataSession,
          setDataSession,
          fetchSummary,
          subscriptionMode,
          setSubscriptionMode
        }}>
        {session.userType ? (
          session.userType === 'owner' ? (
            <OwnerNavigation></OwnerNavigation>
          ) : (
            <BuyerNavigation></BuyerNavigation>
          )
        ) : (
          <CustomStackNavigator screens={authScreens}></CustomStackNavigator>
        )}
      </AuthContext.Provider>
    </>
  );
}

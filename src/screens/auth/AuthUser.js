import React, {useState, useEffect} from 'react';
import {AuthContext} from '../../context/AuthContext';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Login from '../../components/LoginForm';
import Register from '../../components/RegistrationForm';
import OwnerNavigation from '../../router/OwnerNavigation';
import BuyerNavigation from '../../router/BuyerNavigation';
import CustomStackNavigator from '../../utils/CustomStackNavigator';

export default function AuthUser({navigation, route}) {
  // Session and Root

  const {userType} = route.params;
  const [session, setSession] = useState(null);

  // useEffect(() => {
  //   console.log('User Type: ', userType);
  //   console.log('Session Token: ', session);
  // }, [session, userType]);

  const options = {
    headerShown: false,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  };

  const authScreens = [
    {
      name: 'Login',
      component: Login,
      options,
    },
    {
      name: 'Register',
      component: Register,
      options,
    },
  ];

  return (
    <>
      <AuthContext.Provider value={{session, setSession, userType}}>
        {userType === 'owner' ? (
          <>
            {session ? (
              <OwnerNavigation></OwnerNavigation>
            ) : (
              <CustomStackNavigator
                screens={authScreens}></CustomStackNavigator>
            )}
          </>
        ) : (
          <>
            {session ? (
              <BuyerNavigation></BuyerNavigation>
            ) : (
              <CustomStackNavigator
                screens={authScreens}></CustomStackNavigator>
            )}
          </>
        )}
      </AuthContext.Provider>
    </>
  );
}

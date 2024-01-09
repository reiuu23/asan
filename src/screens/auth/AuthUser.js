import React, {useState, useEffect} from 'react';
import {AuthContext} from '../../context/AuthContext';
import LoginForm from '../../components/LoginForm';
import OwnerNavigation from '../../router/OwnerNavigation';
import BuyerNavigation from '../../router/BuyerNavigation';

export default function AuthUser({navigation, route}) {
  // Session and Root

  const {userType} = route.params;
  const [session, setSession] = useState(null);

  useEffect(() => {
    console.log('User Type: ', userType);
    console.log('Session Token: ', session);
  }, [session, userType]);

  return (
    <>
      <AuthContext.Provider value={{session, setSession}}>
        {userType === 'owner' ? (
          <>
            {session ? (
              <OwnerNavigation></OwnerNavigation>
            ) : (
              <LoginForm></LoginForm>
            )}
          </>
        ) : (
          <>
            {session ? (
              <BuyerNavigation></BuyerNavigation>
            ) : (
              <LoginForm></LoginForm>
            )}
          </>
        )}
      </AuthContext.Provider>
    </>
  );
}

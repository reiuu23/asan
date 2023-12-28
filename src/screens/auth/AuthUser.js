import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Button,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  keyboardShowListener,
  keyboardHideListener,
} from '../../utils/KeyboardEventListener';
import {AuthContext} from '../../context/AuthContext';
import {Formik} from 'formik';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import LoginForm from '../../components/LoginForm';
import OwnerNavigation from '../../router/OwnerNavigation';
import BuyerNavigation from '../../router/BuyerNavigation';

export default function AuthUser({navigation, route}) {
  const {userType} = route.params;
  const [session, setSession] = useState(null);

  useEffect(() => {
    console.log('User Type: ', userType);
    console.log('Session Token: ', session);
  }, [session, userType]);

  return (
    <>
      <AuthContext.Provider value={[session, setSession]}>
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

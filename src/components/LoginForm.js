import { useContext, useEffect, useState } from 'react';
import { Formik } from 'formik';
import { RFValue } from 'react-native-responsive-fontsize';
import { AuthContext } from '../context/AuthContext';
import { validationSchema } from '../utils/InputValidation';
import { AsanIcon } from './Icons';
import { login } from '../services/authService';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';

import useCustomFetch from '../hooks/useCustomFetch';
import CheckBox from '@react-native-community/checkbox';
import uuid from 'react-native-uuid';
import axios from 'axios';

export default function LoginForm({ navigation, route }) {
  const { session, setSession, userType } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  console.log("login form: ", userType);

  // Auth Bypasser (For debugging purposes only.)
  setSession({
    token: uuid.v4(),
    userType: 'owner',
    subPlan: 'Free',
    selectedWarehouse: 'abcd01',
  });

  const handleLogin = async values => {
    setLoading(true);
    try {
      const data = {
        identifier: values.identifier,
        password: values.password,
        user_type: userType
      }
      console.log(data);
      const response = await login(data);
      setLoading(false);
      // console.log(JSON.stringify(response, null, 2));
      console.log(response);

      setSession({
        token: response.token,
        userImage: response.user.profile_image,
        userType: response.user.user_type,
        fullName: response.user.full_name,
        firstName: response.user.first_name,
        subPlan: null,
        selectedWarehouse: null
      });
      
    } catch (error) {
      Alert.alert('Login unsuccessful', error.message);
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollWrapper}>
      <View style={{ backgroundColor: '#3E5A47', padding: 20, flex: 1 }}>
        <AsanIcon
          style={{
            alignSelf: 'center',
            marginTop: 50,
            marginBottom: 20
          }}></AsanIcon>
        <View style={styles.headerContainer}>
          <Text style={styles.loginHeader}>SIGN IN TO YOUR ACCOUNT</Text>
        </View>
        <Formik
          initialValues={{ identifier: '', password: '' }}
          onSubmit={handleLogin}
          validationSchema={validationSchema}>
          {formikProps => (
            <>
              <View>
                <Text style={styles.formInputHeader}>E-mail / Username</Text>
                <TextInput
                  style={styles.formInput}
                  onChangeText={formikProps.handleChange('identifier')}
                  placeholderTextColor={'#8d929f'}
                  placeholder="Enter your email or username"
                  autoFocus></TextInput>
                <Text style={styles.formErrorText}>
                  {formikProps.touched.identifier && formikProps.errors.identifier}
                </Text>
                <Text style={styles.formInputHeader}>Password</Text>
                <TextInput
                  style={styles.formInput}
                  onChangeText={formikProps.handleChange('password')}
                  placeholderTextColor={'#8d929f'}
                  placeholder="Enter your password"
                  secureTextEntry
                  autoFocus></TextInput>
                <Text style={styles.formErrorText}>
                  {formikProps.touched.password && formikProps.errors.password}
                </Text>
              </View>
              <View style={styles.formOptionContainer}>
                <TouchableOpacity onPress={() => console.log('pressed')}>
                  <Text style={styles.forgotPwText}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.footerContainer}>
                <TouchableOpacity
                  onPress={formikProps.handleSubmit}
                  style={styles.formSubmitBtn}>
                  {loading ? (
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                      <Text>Signing you in...</Text>
                      <ActivityIndicator size="small"></ActivityIndicator>
                    </View>
                  ) : (
                    <Text style={styles.formSubmitBtnText}>Sign In</Text>
                  )}
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
      <View style={styles.footerHelpContainer}>
        <Text style={styles.footerHeaderText}>Don't have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Register');
          }}>
          <Text style={styles.registerBtnText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollWrapper: {
    flexGrow: 1,
  },
  headerContainer: {
    marginBottom: 50
  },
  loginHeader: {
    alignSelf: 'center',
    color: '#F4F5F4',
    flexWrap: 'wrap',
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    marginTop: 20
  },
  loginSubHeader: {
    color: '#F4F5F4',
    flexWrap: 'wrap',
    fontFamily: 'Inter-Medium',
    fontSize: RFValue(20),
    marginTop: 10
  },
  formContainer: {
    justifyContent: 'flex-end'
  },
  formInputHeader: {
    color: '#F4F5F4',
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    paddingLeft: 10
  },
  formInput: {
    borderColor: '#F4F5F4',
    borderRadius: 10,
    borderBottomWidth: 1,
    color: '#F4F5F4',
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 20
  },
  formOptionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20
  },
  checkBoxContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  checkBoxText: {
    color: '#5D7365',
    fontFamily: 'Inter-Bold',
    fontSize: RFValue(14),
    marginBottom: 3
  },
  forgotPwText: {
    color: '#F4F5F4',
    fontFamily: 'Inter-Bold',
    fontSize: RFValue(14),
    textDecorationLine: 'underline',
    marginBottom: 3
  },
  formSubmitBtn: {
    alignItems: 'center',
    backgroundColor: '#F4F5F4',
    borderRadius: 10,
    elevation: 10,
    padding: 20,
    marginBottom: 10
  },
  formSubmitBtnText: {
    color: '#3E5A47',
    fontFamily: 'Inter-SemiBold',
    fontSize: RFValue(16)
  },
  formErrorText: {
    fontFamily: 'Inter-Medium',
    color: 'red',
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 5
  },
  footerHelpContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    gap: 8,
    justifyContent: 'center',
    paddingTop: 25,
    paddingBottom: 25
  },
  footerHeaderText: {
    fontFamily: 'Inter-Bold',
    fontSize: RFValue(14),
    color: '#3E5847',
  },
  registerBtnText: {
    color: '#3E5A47',
    fontFamily: 'Inter-Bold',
    fontSize: RFValue(14),
    textDecorationLine: 'underline'
  }
});

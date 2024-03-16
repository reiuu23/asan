import {useContext, useEffect, useState} from 'react';
import {Formik} from 'formik';
import {RFValue} from 'react-native-responsive-fontsize';
import {AuthContext} from '../context/AuthContext';
import {validationSchema} from '../utils/FormValidation';
import {AsanIcon} from './Icons';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';

import useCustomFetch from '../hooks/useCustomFetch';
import CheckBox from '@react-native-community/checkbox';
import uuid from 'react-native-uuid';

export default function LoginForm({navigation}) {
  // States
  const {data, error, loading, fetchData} = useCustomFetch();
  const {session, setSession, userType} = useContext(AuthContext); // Session Context
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  console.log('Login UT: ', userType);

  const handleAuth = values => {
    fetchData('http://192.168.100.5/api/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(values),
    });
  };

  useEffect(() => {
    if (data) {
      if (data.success) {
        console.log(data);
        setSession({token: uuid.v4()});
      } else {
        console.log(data);
        Alert.alert(
          'Failed signing in.',
          'You have entered a wrong email or password.',
        );
      }
    }
  }, [data]);

  return (
    <SafeAreaView style={{backgroundColor: 'white', height: '100%'}}>
      <ScrollView contentContainerStyle={styles.scrollWrapper}>
        <View style={{backgroundColor: '#3E5A47', padding: 20}}>
          <AsanIcon
            style={{
              alignSelf: 'center',
              marginTop: 50,
              marginBottom: 20,
            }}></AsanIcon>
          <View style={styles.headerContainer}>
            <Text style={styles.loginHeader}>SIGN IN TO YOUR ACCOUNT</Text>
          </View>
          <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={handleAuth}
            validationSchema={validationSchema}>
            {formikProps => (
              <>
                <View>
                  <Text style={styles.formInputHeader}>E-mail</Text>
                  <TextInput
                    style={styles.formInput}
                    onChangeText={formikProps.handleChange('email')}
                    placeholderTextColor={'#8d929f'}
                    placeholder="Enter your email"
                    autoFocus></TextInput>
                  <Text style={styles.formErrorText}>
                    {formikProps.touched.email && formikProps.errors.email}
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
                    {formikProps.touched.password &&
                      formikProps.errors.password}
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
                      <View style={{flexDirection: 'row', gap: 10}}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollWrapper: {
    // height: '100%',
    // justifyContent: 'space-around',
  },
  headerContainer: {
    marginBottom: 50,
  },
  loginHeader: {
    alignSelf: 'center',
    color: '#F4F5F4',
    flexWrap: 'wrap',
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    marginTop: 20,
  },
  loginSubHeader: {
    color: '#F4F5F4',
    flexWrap: 'wrap',
    fontFamily: 'Inter-Medium',
    fontSize: RFValue(20),
    marginTop: 10,
    // width: 290,
  },
  formContainer: {
    justifyContent: 'flex-end',
  },
  formInputHeader: {
    color: '#F4F5F4',
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    paddingLeft: 10,
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
    paddingRight: 20,
  },
  formOptionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  checkBoxContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkBoxText: {
    color: '#5D7365',
    fontFamily: 'Inter-Bold',
    fontSize: RFValue(14),
    marginBottom: 3,
  },
  forgotPwText: {
    color: '#F4F5F4',
    fontFamily: 'Inter-Bold',
    fontSize: RFValue(14),
    textDecorationLine: 'underline',
    marginBottom: 3,
  },
  formSubmitBtn: {
    alignItems: 'center',
    backgroundColor: '#F4F5F4',
    borderRadius: 10,
    elevation: 10,
    padding: 20,
    marginBottom: 20,
  },
  formSubmitBtnText: {
    color: '#3E5A47',
    fontFamily: 'Inter-SemiBold',
    fontSize: RFValue(16),
  },
  formErrorText: {
    fontFamily: 'Inter-Medium',
    color: 'red',
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 5,
  },
  footerHelpContainer: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    padding: 10,
    marginTop: 40,
    marginBottom: 10,
  },
  footerHeaderText: {
    fontFamily: 'Inter-Bold',
    fontSize: RFValue(14),
  },
  registerBtnText: {
    color: '#3E5A47',
    fontFamily: 'Inter-Bold',
    fontSize: RFValue(14),
    textDecorationLine: 'underline',
  },
});

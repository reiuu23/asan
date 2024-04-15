import { useContext, useEffect, useState } from 'react';
import { Formik } from 'formik';
import { RFValue } from 'react-native-responsive-fontsize';
import { validationSchema } from '../../utils/FormValidation';
import { AuthContext } from '../../context/AuthContext';

import useCustomFetch from '../../hooks/useCustomFetch';

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

export default function RegistrationForm({ navigation, route }) {
  // States
  const { data, loading, error, fetchData } = useCustomFetch(); // Custom useFetch hook
  const { session, setSession, userType } = useContext(AuthContext); // Session Context
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  useEffect(() => {
    console.log('Reg UT: ', userType);
    console.log('Session Token: ', session);
  }, [session, userType]);

  // Authentication Handler

  // Bypass authentication - for easier development on the main application.

  // setSession({token: uuid.v4()}); // (Temporary Code)

  // const handleAuth = async values => {
  //   await fetchData('/auth/', 'post', values); // API request to validate the authentication.
  //   if (error) console.error('Authentication failed: ', error);
  // };

  // Subscription Plan: 'BaseMode', 'StandardMode', 'ProMode', 'DevMode' (Exclusive unlocked access)

  const handleAuth = values => {
    const endpoint = 'buyers/register';
    const payload = {...values, subPlan: 'BaseMode', subPlanStart: null, subPlanEnd: null };
    console.log(payload);
    fetchData(`https://ls2tngnk9ytt.share.zrok.io/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer f7b5b129-7dd1-4366-bd1e-031e03315c32'
      },
      body: JSON.stringify(payload)
    });
  };

  useEffect(() => {
    if (data) {
      if (data.success) {
        console.log('payload: ', data);
        Alert.alert(
          'Welcome aboard!',
          'You have successfully signed up. Get ready to explore and experience all that our platform has to offer!'
        );
        navigation.goBack();
      } else {
        Alert.alert(
          'Sign-up failed',
          'Encountered an error while trying to register your account, try again later!.'
        );
      }
    }
  }, [data]);

  return (
    <SafeAreaView style={{ backgroundColor: '#3E5A47' }}>
      <ScrollView contentContainerStyle={styles.scrollWrapper}>
        <View style={{ backgroundColor: '#F4F5F4', padding: 20 }}>
          <View style={styles.headerContainer}>
            <Text style={styles.registerHeader}>CREATE YOUR ACCOUNT</Text>
          </View>
          <Formik
            initialValues={{
              full_name: '',
              company: '',
              location: '',
              email: '',
              password: ''
            }}
            onSubmit={handleAuth}
            validationSchema={validationSchema}>
            {formikProps => (
              <>
                <View>
                  <Text style={styles.formInputHeader}>Full Name</Text>
                  <TextInput
                    style={styles.formInput}
                    onChangeText={formikProps.handleChange('full_name')}
                    placeholderTextColor={'#8d929f'}
                    placeholder="Enter your full name"
                    autoFocus></TextInput>
                  <Text style={styles.formErrorText}>
                    {formikProps.touched.full_name &&
                      formikProps.errors.full_name}
                  </Text>
                  <Text style={styles.formInputHeader}>Company</Text>
                  <TextInput
                    style={styles.formInput}
                    onChangeText={formikProps.handleChange('company')}
                    placeholderTextColor={'#8d929f'}
                    placeholder="Enter your company"></TextInput>
                  <Text style={styles.formErrorText}>
                    {formikProps.touched.company && formikProps.errors.company}
                  </Text>
                  <Text style={styles.formInputHeader}>Location</Text>
                  <TextInput
                    style={styles.formInput}
                    onChangeText={formikProps.handleChange('location')}
                    placeholderTextColor={'#8d929f'}
                    placeholder="Enter your location"></TextInput>
                  <Text style={styles.formErrorText}>
                    {formikProps.touched.location &&
                      formikProps.errors.location}
                  </Text>
                  <Text style={styles.formInputHeader}>E-mail</Text>
                  <TextInput
                    style={styles.formInput}
                    onChangeText={formikProps.handleChange('email')}
                    placeholderTextColor={'#8d929f'}
                    placeholder="Enter your email"></TextInput>
                  <Text style={styles.formErrorText}>
                    {formikProps.touched.email && formikProps.errors.email}
                  </Text>
                  <Text style={styles.formInputHeader}>Password</Text>
                  <TextInput
                    style={styles.formInput}
                    onChangeText={formikProps.handleChange('password')}
                    placeholderTextColor={'#8d929f'}
                    placeholder="Enter your password"
                    secureTextEntry></TextInput>
                  <Text style={styles.formErrorText}>
                    {formikProps.touched.password &&
                      formikProps.errors.password}
                  </Text>
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
                      <Text style={styles.formSubmitBtnText}>Register Now</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        <View style={styles.footerHelpContainer}>
          <Text style={styles.footerHeaderText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.signInBtnText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 50
  },
  registerHeader: {
    alignSelf: 'center',
    color: '#3E5A47',
    flexWrap: 'wrap',
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    marginTop: 50
  },
  loginSubHeader: {
    color: '#3E5A47',
    flexWrap: 'wrap',
    fontFamily: 'Inter-Medium',
    fontSize: RFValue(20),
    marginTop: 10
    // width: 290,
  },
  formContainer: {
    justifyContent: 'flex-end'
  },
  formInputHeader: {
    color: '#95B6A0',
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    paddingLeft: 10
  },
  formInput: {
    borderColor: '#3E5A47',
    borderRadius: 10,
    borderBottomWidth: 1,
    color: '#3E5A47',
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
    backgroundColor: '#3E5A47',
    borderRadius: 10,
    elevation: 10,
    padding: 20,
    marginBottom: 20,
    marginTop: 20
  },
  formSubmitBtnText: {
    color: '#F4F5F4',
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
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    padding: 10,
    marginTop: 30,
    marginBottom: 30
  },
  footerHeaderText: {
    color: '#F4F5F4',
    fontFamily: 'Inter-Bold',
    fontSize: RFValue(14)
  },
  signInBtnText: {
    color: '#95B6A0',
    fontFamily: 'Inter-Bold',
    fontSize: RFValue(14),
    textDecorationLine: 'underline'
  }
});

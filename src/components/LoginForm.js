import {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Formik} from 'formik';
import {RFValue} from 'react-native-responsive-fontsize';
import {AuthContext} from '../context/AuthContext';
import {validationSchema} from '../utils/FormValidation';
import useFetch from '../hooks/useFetch';
import CheckBox from '@react-native-community/checkbox';
import uuid from 'react-native-uuid';
import '../utils/FormValidation';

export default function LoginForm() {
  // States
  const {data, loading, error, fetchData} = useFetch(); // Custom useFetch hook
  const {session, setSession} = useContext(AuthContext); // Session Context
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  // Authentication Handler

  const handleAuth = async values => {
    await fetchData('/auth/', 'post', values); // API request to validate the authentication.
    if (error) console.error('Authentication failed: ', error);
  };

  // UseEffect Hook to validate the authentication status (if true, add the session and proceed to the app. Else, pop up the alert box)

  useEffect(() => {
    console.log('Returned Data: ', data); // Return

    if (data.hasOwnProperty('authStatus') && data.authStatus === true) {
      setSession({token: uuid.v4(), data: data});
      console.log('Authentication successful:');
      console.log('Session Token: ', session);
    }

    if (data.hasOwnProperty('authStatus') && data.authStatus === false) {
      Alert.alert('Invalid credentials!');
    }
  }, [data]);

  return (
    <ScrollView
      style={{backgroundColor: 'white'}}
      contentContainerStyle={styles.scrollWrapper}>
      <View style={styles.headerContainer}>
        <Text style={styles.loginHeader}>Let's Sign you in.</Text>
        <Text style={styles.loginSubHeader}>Welcome to Litter Integrated!</Text>
      </View>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={handleAuth}
        validationSchema={validationSchema}>
        {formikProps => (
          <>
            <View style={{flex: 1}}>
              <TextInput
                style={styles.formInput}
                onChangeText={formikProps.handleChange('email')}
                placeholderTextColor={'#8d929f'}
                placeholder="Enter your email"
                autoFocus></TextInput>
              <Text style={styles.formErrorText}>
                {formikProps.touched.email && formikProps.errors.email}
              </Text>
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
              <View style={styles.checkBoxContainer}>
                <CheckBox
                  disabled={false}
                  value={toggleCheckBox}
                  onValueChange={newValue => setToggleCheckBox(newValue)}
                />
                <Text style={styles.checkBoxText}>Remember Me</Text>
              </View>
              <TouchableOpacity onPress={() => console.log('pressed')}>
                <Text style={styles.forgotPwText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.footerContainer}>
              <TouchableOpacity
                onPress={formikProps.handleSubmit}
                style={styles.formSubmitBtn}>
                {loading ? (
                  <ActivityIndicator size="small"></ActivityIndicator>
                ) : (
                  <Text style={styles.formSubmitBtnText}>Sign In</Text>
                )}
              </TouchableOpacity>
              <View style={styles.footerHelpContainer}>
                <Text style={styles.footerHeaderText}>
                  Don't have an account?
                </Text>
                <TouchableOpacity>
                  <Text style={styles.registerBtnText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollWrapper: {
    // height: '100%',
    backgroundColor: 'white',
    padding: 20,
    // justifyContent: 'space-around',
  },
  headerContainer: {
    marginBottom: 50,
  },
  loginHeader: {
    color: '#46574C',
    flexWrap: 'wrap',
    fontFamily: 'Inter-Bold',
    fontSize: RFValue(22),
    marginTop: 20,
    width: 300,
  },
  loginSubHeader: {
    color: '#5D7365',
    flexWrap: 'wrap',
    fontFamily: 'Inter-Medium',
    fontSize: RFValue(20),
    marginTop: 10,
    // width: 290,
  },
  formContainer: {
    justifyContent: 'flex-end',
  },
  formInput: {
    borderColor: '#eceff0',
    borderRadius: 10,
    borderWidth: 1,
    color: '#5D7365',
    fontFamily: 'Inter-SemiBold',
    fontSize: RFValue(14),
    // marginBottom: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  formOptionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 50,
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
    color: 'darkred',
    fontFamily: 'Inter-Bold',
    fontSize: RFValue(14),
    marginBottom: 3,
  },
  formSubmitBtn: {
    alignItems: 'center',
    backgroundColor: '#46574C',
    borderRadius: 10,
    padding: 20,
  },
  formSubmitBtnText: {
    color: 'white',
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
    marginTop: 10,
    marginBottom: 10,
  },
  footerHeaderText: {
    fontFamily: 'Inter-Bold',
    fontSize: RFValue(14),
  },
  registerBtnText: {
    color: '#46574C',
    fontFamily: 'Inter-Bold',
    fontSize: RFValue(14),
  },
});

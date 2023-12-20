import {useContext, useEffect, useState} from 'react';
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
  Pressable,
  TouchableHighlight,
} from 'react-native';
import {Formik} from 'formik';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {AuthContext} from '../context/AuthContext';
import {validationSchema} from '../utils/FormValidation';
import useFetch from '../hooks/useFetch';
import CheckBox from '@react-native-community/checkbox';
import '../utils/FormValidation';

export default function LoginForm() {
  const {data, loading, error} = useFetch();
  const {session, setSession} = useContext(AuthContext);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

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
        onSubmit={values => {
          // Fetch({
          //   API_DIR: '/auth/index.php',
          //   method: 'post',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   data: {
          //     validationType: 'auth',
          //     email: values.email,
          //     password: values.password,
          //   },
          // }).then(response => {
          //   if (response.userToken) {
          //     setSession(response);
          //   } else {
          //     Alert.alert('Failed to Sign In', response);
          //   }
          // });
          console.log('Stringified JSON: ', JSON.stringify(values));
          console.log('Session Token: ', session);
          // Condition Statement based on the returned value from the custom hook.
        }}
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
                <Text style={styles.formSubmitBtnText}>Sign In</Text>
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

import { useContext, useEffect, useState } from 'react';
import { Formik } from 'formik';
import { RFValue } from 'react-native-responsive-fontsize';
import { registrationSchema } from '../../utils/InputValidation';
import { AuthContext } from '../../context/AuthContext';
import { register } from '../../services/authService';

import Toast from 'react-native-toast-message';

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

  const { session, setSession, userType } = useContext(AuthContext); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Reg UT: ', userType);
    console.log('Session Token: ', session);
  }, [session, userType]);

  const errorToast = errorMsg => {
    Toast.show({
      type: 'errorToast',
      props: { error_message: errorMsg }
    });
  };

  const successToast = successMsg => {
    Toast.show({
      type: 'successToast',
      props: { success_message: successMsg }
    });
  };

  const handleAuth = async values => {
    try {
      setLoading(true);

      const data = {
        user_type: userType,
        last_name: values?.last_name,
        first_name: values?.first_name,
        middle_initial: values?.middle_initial,
        date_of_birth: null,
        affiliation: values?.affiliation,
        location: values?.location,
        email: values?.email,
        username: values?.username,
        password: values?.password,
        password_confirmation: values?.password_confirmation
      };

      console.log(JSON.stringify(data, 2, null));

      const response = await register(data);

      setLoading(false);

      console.log(response);

      successToast("Welcome aboard! You have successfully signed up.");

      navigation.navigate('Login');
    } catch (error) {
      
      console.log(error);
      errorToast("The email/username you used has been already registered in our application!");

      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#3E5A47' }}>
      <ScrollView contentContainerStyle={styles.scrollWrapper}>
        <View style={{ backgroundColor: '#F4F5F4', padding: 20 }}>
          <View style={styles.headerContainer}>
            <Text style={styles.registerHeader}>CREATE YOUR ACCOUNT</Text>
          </View>
          <Formik
            initialValues={{
              last_name: '',
              first_name: '',
              middle_initial: '',
              affiliation: '',
              location: '',
              email: '',
              username: '',
              password: '',
              password_confirmation: ''
            }}
            validationSchema={registrationSchema}
            onSubmit={handleAuth}>
            {formikProps => (
              <>
                <View>
                  <Text style={styles.formInputHeader}>Last Name</Text>
                  <TextInput
                    style={styles.formInput}
                    onChangeText={formikProps.handleChange('last_name')}
                    placeholderTextColor={'#8d929f'}
                    placeholder="Enter your last name"
                    autoFocus></TextInput>
                  <Text style={styles.formErrorText}>
                    {formikProps.touched.last_name &&
                      formikProps.errors.last_name}
                  </Text>
                  <Text style={styles.formInputHeader}>First Name</Text>
                  <TextInput
                    style={styles.formInput}
                    onChangeText={formikProps.handleChange('first_name')}
                    placeholderTextColor={'#8d929f'}
                    placeholder="Enter your first name"
                    autoFocus></TextInput>
                  <Text style={styles.formErrorText}>
                    {formikProps.touched.first_name &&
                      formikProps.errors.first_name}
                  </Text>
                  <Text style={styles.formInputHeader}>
                    Middle Initial (Optional)
                  </Text>
                  <TextInput
                    style={styles.formInput}
                    onChangeText={formikProps.handleChange('middle_initial')}
                    placeholderTextColor={'#8d929f'}
                    placeholder="Enter your middle initial (if applicable)"
                    autoFocus></TextInput>
                  <Text style={styles.formErrorText}>
                    {formikProps.touched.middle_initial &&
                      formikProps.errors.middle_initial}
                  </Text>
                  <Text style={styles.formInputHeader}>Company</Text>
                  <TextInput
                    style={styles.formInput}
                    onChangeText={formikProps.handleChange('affiliation')}
                    placeholderTextColor={'#8d929f'}
                    placeholder="Enter your company"></TextInput>
                  <Text style={styles.formErrorText}>
                    {formikProps.touched.affiliation &&
                      formikProps.errors.affiliation}
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
                  <Text style={styles.formInputHeader}>Username</Text>
                  <TextInput
                    style={styles.formInput}
                    onChangeText={formikProps.handleChange('username')}
                    placeholderTextColor={'#8d929f'}
                    placeholder="Enter your username"></TextInput>
                  <Text style={styles.formErrorText}>
                    {formikProps.touched.username &&
                      formikProps.errors.username}
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
                  <Text style={styles.formInputHeader}>Confirm Password</Text>
                  <TextInput
                    style={styles.formInput}
                    onChangeText={formikProps.handleChange(
                      'password_confirmation'
                    )}
                    placeholderTextColor={'#8d929f'}
                    placeholder="Re-enter your password"
                    secureTextEntry></TextInput>
                  <Text style={styles.formErrorText}>
                    {formikProps.touched.password_confirmation &&
                      formikProps.errors.password_confirmation}
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

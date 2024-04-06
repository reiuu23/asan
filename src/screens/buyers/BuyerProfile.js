import {
  Pressable,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BackButtonIcon, EditIcon, PencilIcon} from '../../components/Icons';
import {Formik} from 'formik';
import {validationSchema} from '../../utils/FormValidation';
import {RFValue} from 'react-native-responsive-fontsize';

export default function BuyerProfile({navigation}) {
  const handleAuth = values => {
    fetchData('https://jwtdphluugg6.share.zrok.io/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(values),
    });
  };

  const loading = true;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.header_buttons}>
            <Pressable onPress={() => navigation.goBack()}>
              <BackButtonIcon color={'#F4F5F4'}></BackButtonIcon>
            </Pressable>
            <Text style={styles.header_buttons_text}>Edit Profile</Text>
            <EditIcon></EditIcon>
          </View>

          <View style={styles.header_select_pic}>
            <TouchableOpacity>
              <Image
                style={styles.header_image}
                source={require('../../assets/img/chaewon.jpg')}></Image>
              <View style={styles.header_edit_icon}>
                <PencilIcon></PencilIcon>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <Formik
          initialValues={{
            name: '',
            company: '',
            location: '',
            email: '',
            password: '',
          }}
          onSubmit={handleAuth}
          validationSchema={validationSchema}>
          {formikProps => (
            <>
              <View style={{paddingLeft: 10, paddingRight: 10}}>
                <Text style={styles.formInputHeader}>Full Name</Text>
                <TextInput
                  style={styles.formInput}
                  onChangeText={formikProps.handleChange('name')}
                  placeholderTextColor={'#8d929f'}
                  placeholder="Enter your full name"
                  autoFocus></TextInput>
                <Text style={styles.formErrorText}>
                  {formikProps.touched.name && formikProps.errors.name}
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
                  {formikProps.touched.location && formikProps.errors.location}
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
                  {formikProps.touched.password && formikProps.errors.password}
                </Text>
              </View>
              <View style={styles.footerContainer}>
                <TouchableOpacity
                  onPress={formikProps.handleSubmit}
                  style={styles.formSubmitBtn}>
                  {/* {loading ? (
                    <ActivityIndicator size="small"></ActivityIndicator>
                  ) : (
                    <Text style={styles.formSubmitBtnText}>Update Profile</Text>
                  )} */}
                  <Text style={styles.formSubmitBtnText}>Update Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      'Are you sure?',
                      'You have unsaved changes, would you like to cancel?',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => {},
                        },
                        {text: 'Yes', onPress: () => navigation.goBack()},
                      ],
                    );
                  }}
                  style={styles.formCancelBtn}>
                  <Text style={styles.formCancelBtnText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#3E5A47',
    height: 250,
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 30,
  },
  header_buttons: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header_buttons_text: {
    fontFamily: 'Inter-Medium',
    fontSize: 20,
    color: '#F4F5F4',
  },
  header_select_pic: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    marginTop: 35,
  },
  header_image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  header_edit_icon: {
    position: 'absolute',
    left: 35,
    top: 35,
  },
  registerHeader: {
    alignSelf: 'center',
    color: '#3E5A47',
    flexWrap: 'wrap',
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    marginTop: 50,
  },
  loginSubHeader: {
    color: '#3E5A47',
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
    color: '#95B6A0',
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    paddingLeft: 10,
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
    backgroundColor: '#3E5A47',
    borderRadius: 10,
    elevation: 10,
    padding: 20,
    marginTop: 20,
  },
  formCancelBtn: {
    alignItems: 'center',
    backgroundColor: '#F4F5F4',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3E5A47',
    elevation: 10,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  formSubmitBtnText: {
    color: '#F4F5F4',
    fontFamily: 'Inter-SemiBold',
    fontSize: RFValue(16),
  },
  formCancelBtnText: {
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
  footerContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10,
  },
  footerHelpContainer: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    padding: 10,
    marginTop: 30,
    marginBottom: 30,
  },
  footerHeaderText: {
    color: '#F4F5F4',
    fontFamily: 'Inter-Bold',
    fontSize: RFValue(14),
  },
  signInBtnText: {
    color: '#95B6A0',
    fontFamily: 'Inter-Bold',
    fontSize: RFValue(14),
    textDecorationLine: 'underline',
  },
});

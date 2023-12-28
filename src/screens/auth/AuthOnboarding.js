import {View, Text, Image, TouchableOpacity, StatusBar} from 'react-native';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

const AuthOnboarding = ({navigation}) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.onboardingHeader}>
        Warehouse management on the go!
      </Text>
      <Image
        source={require('../../assets/img/auth-select-mainpic.jpg')}
        style={styles.onboardingPic}></Image>
      <View style={styles.footerContainer}>
        <Text style={styles.footerHeaderText}>Are you a?</Text>
        {/* <TouchableOpacity>
            <Text style={styles.helpBtnText}>Click Here</Text>
          </TouchableOpacity> */}
      </View>
      <View style={styles.authBtnContainer}>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate('Login', {userType: 'owner'})}>
          <Text style={styles.loginBtnText}>Warehouse Owner</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signUpBtn}
          onPress={() => navigation.navigate('Login', {userType: 'buyer'})}>
          <Text style={styles.signUpBtnText}>Scrap Buyer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  onboardingHeader: {
    color: '#46574C',
    flexWrap: 'wrap',
    fontFamily: 'Inter-Bold',
    fontSize: 25,
    marginTop: 10,
    width: 300,
    flex: 3,
    // backgroundColor: 'red',
  },
  onboardingPic: {
    flex: 6,
    width: '100%',
    resizeMode: 'contain',
    // backgroundColor: 'green',
  },
  authBtnContainer: {
    flex: 4,
    justifyContent: 'flex-end',
    // backgroundColor: 'blue',
  },
  loginBtn: {
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  loginBtnText: {
    color: '#46574C',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  signUpBtn: {
    alignItems: 'center',
    backgroundColor: '#46574C',
    borderRadius: 8,
    padding: 15,
  },
  signUpBtnText: {
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  footerContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    padding: 10,
    marginTop: 10,
  },
  footerHeaderText: {
    color: 'darkgray',
    fontFamily: 'Inter-Bold',
    fontSize: 14,
  },
  helpBtnText: {
    fontFamily: 'Inter-Bold',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
});

export default AuthOnboarding;

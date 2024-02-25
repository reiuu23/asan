import {View, Text, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const AuthOnboarding = ({navigation}) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.onboardingHeader}>Stock management on the go!</Text>
      {/*  */}
      <View style={styles.authBtnContainer}>
        <TouchableOpacity
          style={styles.signUpBtn}
          onPress={() => navigation.navigate('Login', {userType: 'owner'})}>
          <Text style={styles.signUpBtnText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.footerHeaderText}>
          Already have an account? Sign in as a
        </Text>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate('Login', {userType: 'owner'})}>
          <Text style={styles.loginBtnText}>Scrapyard Owner</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signInBtn}
          onPress={() => navigation.navigate('Login', {userType: 'buyer'})}>
          <Text style={styles.signInBtnText}>Scrap Buyer</Text>
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
    fontSize: RFValue(25),
    marginTop: 10,
    width: 200,
    flex: 3,
    // backgroundColor: 'red',
  },
  onboardingPic: {
    flex: 3,
    width: '100%',
    resizeMode: 'contain',
    // backgroundColor: 'green',
  },
  authBtnContainer: {
    flex: 5,
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
    fontSize: RFValue(16),
  },
  signUpBtn: {
    alignItems: 'center',
    backgroundColor: '#5D7365',
    borderRadius: 8,
    padding: 15,
  },
  signUpBtnText: {
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: RFValue(16),
  },
  signInBtn: {
    alignItems: 'center',
    backgroundColor: '#46574C',
    borderRadius: 8,
    padding: 15,
  },
  signInBtnText: {
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: RFValue(16),
  },
  footerHeaderText: {
    alignSelf: 'center',
    color: 'darkgray',
    fontFamily: 'Inter-Bold',
    fontSize: RFValue(14),
    marginBottom: 20,
    marginTop: 20,
  },
  helpBtnText: {
    fontFamily: 'Inter-Bold',
    textDecorationLine: 'underline',
    fontSize: RFValue(12),
  },
});

export default AuthOnboarding;

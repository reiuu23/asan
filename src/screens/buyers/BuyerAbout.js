// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';

// export default function BuyerAbout() {
//   return (
//     <View>
//       <Text>BuyerAbout</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({});

// Main Component Imports

import React, {Component, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  BackHandler,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';

// Icon Imports

import {Ionicons, Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';

const About = ({navigation}) => {
  // Back Button + Back-Device Handler

  React.useEffect(() => {
    function handleBackButton() {
      navigation.goBack();
      return true;
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );

    return () => backHandler.remove();
  }, [navigation]);

  // Main About Component

  return (
    <View style={styles.container}>
      <View style={styles.navbarContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons name="arrow-back" size={24} color="#3E5A47" />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>About Litter</Text>
      </View>
      <View style={styles.aboutContainer}>
        <LinearGradient
          colors={['#3E5A47', '#95B6A0']}
          style={{
            flex: 1,
            padding: 20,
          }}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}>
          <View style={styles.about}>
            <View style={styles.aboutLitter}>
              <Text style={styles.appTitle}>The Litter App</Text>
              <Text style={styles.appDesc}>
                Effortlessly manage inventory and track scrap collections with
                Litter App. Gain valuable insights and improve sustainability
                practices for informed business decisions. Simplify your
                inventory management and take your business to the next level.
              </Text>
              <Image
                style={styles.firstKnot}
                source={require('../assets/img/knot.png')}
              />
              <Image
                style={styles.secondKnot}
                source={require('../assets/img/knot.png')}
              />
            </View>
            <View style={styles.aboutTeamLitter}>
              <Text style={styles.teamTitle}>Team Behind Litter</Text>
              <Text style={styles.teamDesc}>
                We're a team of third-year college students from TUP-Manila
                passionate about sustainability and innovation. Our Litter App
                simplifies waste management and improves inventory management
                for junkshops. Thanks for supporting our project!
              </Text>
            </View>
            <Image
              style={styles.thirdKnot}
              source={require('../assets/img/knot.png')}
            />
            <Image
              style={styles.fourthKnot}
              source={require('../assets/img/knot.png')}
            />
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 25,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 36,
    textAlign: 'right',
    color: '#3E5A47',
  },
  aboutContainer: {
    flex: 1,
  },
  about: {
    backgroundColor: '#F4F5F4',
    borderRadius: 14,
    padding: 20,
  },
  firstKnot: {
    position: 'absolute',
    top: 7,
    left: 7,
    width: 20,
    height: 20,
  },
  secondKnot: {
    position: 'absolute',
    top: 7,
    right: 7,
    width: 20,
    height: 20,
  },
  thirdKnot: {
    position: 'absolute',
    bottom: 7,
    left: 7,
    width: 20,
    height: 20,
  },
  fourthKnot: {
    position: 'absolute',
    bottom: 7,
    right: 7,
    width: 20,
    height: 20,
  },
  aboutLitter: {
    alignItems: 'center',
    borderColor: '#3E5A47',
    borderWidth: 1,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    justifyContent: 'center',
  },
  appTitle: {
    color: '#365540',
    fontFamily: 'Inter-Bold',
    fontSize: 25,
    marginTop: 15,
  },
  appDesc: {
    color: '#365540',
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'justify',
    width: 270,
  },
  aboutTeamLitter: {
    alignItems: 'center',
    borderColor: '#3E5A47',
    borderWidth: 1,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  teamTitle: {
    color: '#365540',
    fontFamily: 'Inter-Bold',
    fontSize: 25,
    marginTop: 15,
  },
  teamDesc: {
    color: '#365540',
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'justify',
    width: 270,
  },
  teamGridOne: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: '#3E5A47',
    borderTopWidth: 1,
    width: '100%',
  },
  teamGridTwo: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: '#3E5A47',
    borderTopWidth: 1,
    width: '100%',
  },
  gridOne: {
    borderRightWidth: 0.8,
    width: 110.6,
    height: 83.5,
  },
  gridTwo: {
    width: 110.6,
    height: 83.5,
  },
  gridThree: {
    borderLeftWidth: 1,
    width: 110.6,
    height: 83.5,
  },
  gridFour: {
    borderRightWidth: 0.8,
    width: 110.6,
    height: 83.5,
  },
  gridFive: {
    width: 110.6,
    height: 83.5,
  },
  gridSix: {
    borderLeftWidth: 1,
    width: 110.6,
    height: 83.5,
  },
});

export default About;

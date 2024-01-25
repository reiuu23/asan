import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import {useContext, useEffect} from 'react';
import {AuthContext} from '../../context/AuthContext';
import Svg, {Path} from 'react-native-svg';
import {
  ChatIcon,
  LitterIcon,
  CartIcon,
  HomeIcon,
  StatsIcon,
  LogoutIcon,
} from '../../components/Icons';
import React from 'react';

export default function BuyerHome() {
  const {session} = useContext(AuthContext);
  return (
    // <View style={{marginTop: 50}}>
    //   {/* <Text>Session Token: {JSON.stringify(session)}</Text> */}
    // </View>
    <SafeAreaView>
      <ScrollView>
        <View style={styles.topBarContainer}>
          <View style={styles.topBarProfileContainer}>
            <Image
              style={styles.topBarProfileImage}
              source={require('../../assets/img/chaewon.webp')}
            />
            <Text style={styles.topBarProfileName}>Hey, Hee</Text>
          </View>
          <TouchableOpacity style={styles.topBarSignOut}>
            <LogoutIcon></LogoutIcon>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBarContainer: {
    alignItems: 'center',
    backgroundColor: '#3E5A47',
    display: 'flex',
    flexDirection: 'row',
    height: 119,
    justifyContent: 'space-between',
    paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
  },
  topBarProfileContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    // borderWidth: 2,
  },
  topBarProfileImage: {
    // borderColor: 'black',
    // borderWidth: 2,
    borderRadius: 50,
    height: 50,
    width: 50,
    padding: 0,
    resizeMode: 'cover',
  },
  topBarProfileName: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
    fontSize: 20,
    fontStyle: 'italic',
  },
});

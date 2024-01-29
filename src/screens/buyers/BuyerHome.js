import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Platform,
  TextInput,
} from 'react-native';
import {useContext, useEffect} from 'react';
import {AuthContext} from '../../context/AuthContext';
import {Shadow} from 'react-native-shadow-2';
import Svg, {Path} from 'react-native-svg';
import {
  ChatIcon,
  LitterIcon,
  CartIcon,
  HomeIcon,
  StatsIcon,
  LogoutIcon,
  SearchIcon,
  MagnifyIcon,
} from '../../components/Icons';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';

export default function BuyerHome() {
  const {session} = useContext(AuthContext);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.top_bar__container}>
          <View style={styles.top_bar__profile_container}>
            <Image
              style={styles.top_bar__profile_image}
              source={require('../../assets/img/chaewon.webp')}
            />
            <Text style={styles.top_bar__profile_name}>Hey, Hee</Text>
          </View>
          <TouchableOpacity style={styles.top_bar__signout}>
            <LogoutIcon></LogoutIcon>
          </TouchableOpacity>
        </View>

        <View style={styles.top_nav__container}>
          {/* <TouchableOpacity style={styles.top_nav__search_button}>
            <SearchIcon></SearchIcon>
          </TouchableOpacity> */}

          <View style={styles.top_nav__searchbar_container}>
            <View style={styles.top_nav__searchbar_icon}>
              <MagnifyIcon></MagnifyIcon>
            </View>
            <TextInput
              style={styles.top_nav__searchbar}
              placeholder="Search"
              placeholderTextColor={'#3E5A47'}></TextInput>
          </View>
          <Text style={styles.top_nav__menu_header}>Scrap Categories</Text>

          {/* Refactor this code asap -- temporary code for debugging */}
          <View style={styles.top_nav__gridnav_container}>
            <View style={styles.top_nav__gridnav_column}>
              <Shadow offset={[0, 3]} distance={1} startColor="#00000040">
                <TouchableOpacity
                  style={styles.top_nav__gridnav_button}></TouchableOpacity>
              </Shadow>
              <Shadow offset={[0, 3]} distance={1} startColor="#00000040">
                <TouchableOpacity
                  style={styles.top_nav__gridnav_button}></TouchableOpacity>
              </Shadow>
              <Shadow offset={[0, 3]} distance={1} startColor="#00000040">
                <TouchableOpacity
                  style={styles.top_nav__gridnav_button}></TouchableOpacity>
              </Shadow>
              <Shadow offset={[0, 3]} distance={1} startColor="#00000040">
                <TouchableOpacity
                  style={styles.top_nav__gridnav_button}></TouchableOpacity>
              </Shadow>
              <Shadow offset={[0, 3]} distance={1} startColor="#00000040">
                <TouchableOpacity
                  style={styles.top_nav__gridnav_button}></TouchableOpacity>
              </Shadow>
              <Shadow offset={[0, 3]} distance={1} startColor="#00000040">
                <TouchableOpacity
                  style={styles.top_nav__gridnav_button}></TouchableOpacity>
              </Shadow>
              <Shadow offset={[0, 3]} distance={1} startColor="#00000040">
                <TouchableOpacity
                  style={styles.top_nav__gridnav_button}></TouchableOpacity>
              </Shadow>
              <Shadow offset={[0, 3]} distance={1} startColor="#00000040">
                <TouchableOpacity
                  style={styles.top_nav__gridnav_button}></TouchableOpacity>
              </Shadow>
            </View>
          </View>
        </View>
        <View style={styles.scrap_list__container}>
          <Text style={styles.scrap_list__header}>PLASTIC</Text>
        </View>
        <LinearGradient colors={['#F2F2F2', '#3E5A47']}></LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  top_bar__container: {
    alignItems: 'center',
    backgroundColor: '#3E5A47',
    display: 'flex',
    flexDirection: 'row',
    height: 115,
    justifyContent: 'space-between',
    paddingTop: 25,
    paddingLeft: 25,
    paddingRight: 25,
  },
  top_bar__profile_container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
  },
  top_bar__profile_image: {
    borderRadius: 50,
    height: 50,
    width: 50,
    padding: 0,
    resizeMode: 'cover',
  },
  top_bar__profile_name: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
    fontSize: 20,
  },
  top_nav__container: {
    paddingTop: 28,
    paddingLeft: 28,
    paddingRight: 28,
    height: 420,

    // borderWidth: 1, // For debugging.
  },
  top_nav__searchbar_container: {
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    height: 40,
  },
  top_nav__searchbar: {
    color: '#3E5A47',
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    paddingLeft: 45,
    paddingRight: 20,
  },
  top_nav__searchbar_icon: {
    position: 'absolute',
    top: 12,
    left: 15,
  },
  top_nav__search_button: {
    alignItems: 'center',
    backgroundColor: '#3E5A47',
    borderRadius: 8,
    height: 35,
    justifyContent: 'center',
    width: 47,
  },
  top_nav__menu_header: {
    // alignSelf: 'center',
    color: '#3E5A47',
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    paddingTop: 20,
    paddingBottom: 25,
  },
  top_nav__gridnav_column: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  top_nav__gridnav_button: {
    backgroundColor: '#F2F2F2',
    borderRadius: 3,
    width: 80.34,
    height: 99,
    marginBottom: 15,
  },
  scrap_list__header: {
    alignSelf: 'center',
    color: '#3E5A47',
    fontFamily: 'Inter-Bold',
    fontSize: 20,
  },
});

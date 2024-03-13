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
import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../context/AuthContext';
import {Shadow} from 'react-native-shadow-2';
import {Divider} from '@rneui/themed';
import Svg, {Path} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import Scraps from '../../components/Scraps';
import axios from 'axios';

export default function BuyerHome() {
  // Authentication Session Context
  const {session} = useContext(AuthContext);

  // Scrap Categories Array

  const scrapCategories = [
    {id: 1, categoryName: 'Plastic', iconDir: 'none'},
    {id: 2, categoryName: 'Paper', iconDir: 'none'},
    {id: 3, categoryName: 'Metal', iconDir: 'none'},
    {id: 4, categoryName: 'Silicone', iconDir: 'none'},
    {id: 5, categoryName: 'Test1', iconDir: 'none'},
    {id: 6, categoryName: 'Test2', iconDir: 'none'},
    {id: 7, categoryName: 'Test3', iconDir: 'none'},
    {id: 8, categoryName: 'Test4', iconDir: 'none'},
  ];

  // Navigation States

  const [category, setCategory] = useState('Plastic');

  // Navigation Button Function

  const scrapSetter = categoryName => {
    setCategory(categoryName);
  };

  // useEffect(() => {
  //   console.log(category);
  // }, [category]);

  const sampleFetch = () => {
    fetch('http://192.168.100.5:80/test/_get.php')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Do something with the JSON data
        console.log(data);
      })
      .catch(error => {
        // Handle errors
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  useEffect(() => {
    console.log(sampleFetch());
  }, []);

  // console.log(sampleFetch());

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top_bar__container}>
        <View style={styles.top_bar__profile_container}>
          <Image
            style={styles.top_bar__profile_image}
            source={require('../../assets/img/chaewon.jpg')}
          />
          <Text style={styles.top_bar__profile_name}>Hey, Hee</Text>
        </View>
        <TouchableOpacity style={styles.top_bar__signout}>
          <LogoutIcon></LogoutIcon>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
        <View style={styles.top_nav__container}>
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
            {/* Array Map to prevent code duplication. */}
            <View style={styles.top_nav__gridnav_column}>
              {scrapCategories.map(({id, categoryName, iconDir}) => {
                return (
                  <Shadow
                    offset={[0, 3]}
                    distance={1}
                    startColor="#00000040"
                    key={id}>
                    <TouchableOpacity
                      style={styles.top_nav__gridnav_button}
                      onPress={() => setCategory(categoryName)}>
                      {/* Icons should be used here. Remove the Text component once done. */}
                      <Text>{categoryName}</Text>
                    </TouchableOpacity>
                  </Shadow>
                );
              })}
            </View>
          </View>
        </View>
        <Text style={styles.scrap_list__header}>PLASTIC</Text>
        <Divider
          style={{alignSelf: 'center', marginBottom: 25, width: '90%'}}
          width={1}
        />
        <LinearGradient
          colors={['#F2F2F2', '#3E5A47']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 0.35}}
          style={styles.scrap_list__card}>
          <View style={styles.scrap_list__container}>
            <Scraps scrapCategory={category}></Scraps>
          </View>
        </LinearGradient>
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
    paddingLeft: 20,
    paddingRight: 20,
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
    // fontStyle: 'italic',
  },
  top_nav__container: {
    paddingTop: 28,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 30,
    // height: 420,
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
  top_nav__gridnav_container: {},
  top_nav__gridnav_column: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
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
    marginBottom: 10,
  },
  scrap_list__card: {
    marginBottom: 50,
    paddingBottom: 80,
    height: '100%',
  },
});

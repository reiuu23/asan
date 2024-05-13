import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  Alert,
  RefreshControl
} from 'react-native';
import {
  LogoutIcon,
  MagnifyIcon,
  PlasticCatIcon,
  WhitePaperCat,
  SelectedPaperCat,
  KartonCat,
  AssortedMetalCat,
  MixedPaperCat,
  SolidMetalCat,
  AsanIconBottom
} from '../../components/Icons';

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ScrapContext } from '../../context/ScrapContext';
import { Shadow } from 'react-native-shadow-2';
import { Divider } from '@rneui/themed';

import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import Scraps from '../../components/Scraps';
import axios from 'axios';
import _ from 'lodash';


export default function BuyerHome({ navigation }) {

  const [isActive, setIsActive] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { session, setSession } = useContext(AuthContext);
  const { scrapData, loadScrap } = useContext(ScrapContext);

  const fetchScraps = () => {
    const local = 'http://192.168.100.5/rest/scrapdata/read';
    const server = 'https://ls2tngnk9ytt.share.zrok.io/scrapdata/read';
    const payload = { warehouse_id: session.selectedWarehouse };
    loadScrap(local, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer f7b5b129-7dd1-4366-bd1e-031e03315c32'
      },
      body: JSON.stringify(payload)
    });
  }

  useEffect(() => {
    fetchScraps();
  }, []);

  const [category, setCategory] = useState('Plastic');
  const [searchQuery, setSearchQuery] = useState('');

  // console.log('re-rendered');

  const debouncedSetSearchQuery = _.debounce(text => setSearchQuery(text), 300);

  useEffect(() => {
    console.log(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    console.log(session);
  }, [session]);

  // Navigation Button Function

  const scrapSetter = categoryName => {
    setCategory(categoryName);
  };

  const signOut = () => {
    Alert.alert('Are you sure?', 'Do you wish to sign out?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      { text: 'OK', onPress: () => setSession({ token: null }) }
    ]);
  };

  const scrapCategories = [
    {
      id: 1,
      categoryName: 'Plastic',
      iconDir: <PlasticCatIcon color={'#3E5A47'} />
    },
    {
      id: 2,
      categoryName: 'White Paper',
      iconDir: <WhitePaperCat color={isActive === 2 ? '#FFFFFF' : '#3E5A47'} />
    },
    {
      id: 3,
      categoryName: 'Selected Paper',
      iconDir: (
        <SelectedPaperCat color={isActive === 3 ? '#FFFFFF' : '#3E5A47'} />
      )
    },
    {
      id: 4,
      categoryName: 'Karton Paper',
      iconDir: <KartonCat color={isActive === 4 ? '#FFFFFF' : '#3E5A47'} />
    },
    {
      id: 5,
      categoryName: 'Mixed Paper',
      iconDir: <MixedPaperCat color={isActive === 5 ? '#FFFFFF' : '#3E5A47'} />
    },
    {
      id: 6,
      categoryName: 'Solid Metal',
      iconDir: <SolidMetalCat color={isActive === 6 ? '#FFFFFF' : '#3E5A47'} />
    },
    {
      id: 7,
      categoryName: 'Assorted Metal',
      iconDir: (
        <AssortedMetalCat color={isActive === 7 ? '#FFFFFF' : '#3E5A47'} />
      )
    },
    {
      id: 8,
      categoryName: 'All',
      iconDir: <AsanIconBottom color={isActive === 8 ? '#FFFFFF' : '#3E5A47'} />
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top_bar__container}>
        <View style={styles.top_bar__profile_container}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            {/* <Image
              style={styles.top_bar__profile_image}
              source={require('../../assets/img/chaewon.jpg')}
            /> */}
            {session.userImage ? (
              <Image
                style={styles.top_bar__profile_image}
                source={{
                  uri: session.userImage
                }}></Image>
            ) : (
              <Image
                style={styles.top_bar__profile_image}
                source={require('../../assets/img/placeholderUser.jpg')}></Image>
            )}
          </TouchableOpacity>
          <Text style={styles.top_bar__profile_name}>Hey, {session.firstName}</Text>
        </View>
        <TouchableOpacity
          style={styles.top_bar__signout}
          onPress={() => {
            signOut();
          }}>
          <LogoutIcon></LogoutIcon>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchScraps}
            colors={['#3E5A47']}
          />
        }>
        <View style={styles.top_nav__container}>
          <View style={styles.top_nav__searchbar_container}>
            <View style={styles.top_nav__searchbar_icon}>
              <MagnifyIcon></MagnifyIcon>
            </View>
            <TextInput
              style={styles.top_nav__searchbar}
              placeholder="Search"
              placeholderTextColor={'#3E5A47'}
              onChangeText={debouncedSetSearchQuery}></TextInput>
          </View>
          <Text style={styles.top_nav__menu_header}>Scrap Categories</Text>
          {/* Refactor this code asap -- temporary code for debugging */}
          <View style={styles.top_nav__gridnav_container}>
            {/* Array Map to prevent code duplication. */}
            <View style={styles.top_nav__gridnav_column}>
              {scrapCategories.map(({ id, categoryName, iconDir }) => {
                return (
                  <Shadow
                    offset={[0, 3]}
                    distance={1}
                    startColor="#00000040"
                    key={id}>
                    <TouchableOpacity
                      style={[
                        styles.top_nav__gridnav_button,
                        isActive === id && styles.top_nav__gridnav_button_active
                      ]}
                      onPress={() => {
                        setCategory(categoryName);
                        setIsActive(id);
                      }}>
                      <View style={{ marginBottom: 10 }}>{iconDir}</View>
                      <Text
                        style={[
                          styles.top_nav_gridnav_button_header,
                          isActive === id &&
                            styles.top_nav_gridnav_button_header_active
                        ]}>
                        {categoryName}
                      </Text>
                    </TouchableOpacity>
                  </Shadow>
                );
              })}
            </View>
          </View>
        </View>
        <Text style={styles.scrap_list__header}>{category}</Text>
        <Divider
          style={{ alignSelf: 'center', marginBottom: 25, width: '90%' }}
          width={1}
        />
        <LinearGradient
          colors={['#F2F2F2', '#3E5A47']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.35 }}
          style={styles.scrap_list__card}>
          <View style={styles.scrap_list__container}>
            {scrapData && (
              <Scraps
                warehouseId={session.selectedWarehouse}
                scrapData={scrapData}
                scrapCategory={category}
                searchQuery={searchQuery}
              />
            )}
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
    paddingRight: 20
  },
  top_bar__profile_container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 15
  },
  top_bar__profile_image: {
    borderRadius: 50,
    height: 50,
    width: 50,
    padding: 0,
    resizeMode: 'cover'
  },
  top_bar__profile_name: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
    fontSize: 20
    // fontStyle: 'italic',
  },
  top_nav__container: {
    paddingTop: 28,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 30
    // height: 420,
    // borderWidth: 1, // For debugging.
  },
  top_nav__searchbar_container: {
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    height: 40
  },
  top_nav__searchbar: {
    color: '#3E5A47',
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    paddingLeft: 45,
    paddingRight: 20
  },
  top_nav__searchbar_icon: {
    position: 'absolute',
    top: 12,
    left: 15
  },
  top_nav__search_button: {
    alignItems: 'center',
    backgroundColor: '#3E5A47',
    borderRadius: 8,
    height: 35,
    justifyContent: 'center',
    width: 47
  },
  top_nav__menu_header: {
    // alignSelf: 'center',
    color: '#3E5A47',
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    paddingTop: 20,
    paddingBottom: 25
  },
  top_nav__gridnav_container: {},
  top_nav__gridnav_column: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    gap: 10
  },
  top_nav__gridnav_button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 3,
    width: 80.34,
    height: 99,
    marginBottom: 15
  },
  top_nav__gridnav_button_active: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3E5A47',
    borderRadius: 3,
    width: 80.34,
    height: 99,
    marginBottom: 15
  },
  top_nav_gridnav_button_header: {
    color: '#3E5A47',
    fontFamily: 'Inter-Bold',
    fontSize: 11,
    textAlign: 'center'
  },
  top_nav_gridnav_button_header_active: {
    color: '#FFFFFF'
  },
  scrap_list__header: {
    alignSelf: 'center',
    color: '#3E5A47',
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    marginBottom: 10
  },
  scrap_list__card: {
    marginBottom: 50,
    paddingBottom: 80,
    height: '100%'
  },
  scrap_list__container: {
    width: '100%',
    alignItems: 'center'
  }
});

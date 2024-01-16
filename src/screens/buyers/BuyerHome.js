// import {StyleSheet, Text, View} from 'react-native';
// import {useContext, useEffect} from 'react';
// import {AuthContext} from '../../context/AuthContext';
// import Svg, {Path} from 'react-native-svg';
// import {ChatIcon, LitterIcon} from '../../components/Icons';
// import React from 'react';

// export default function BuyerHome() {
//   const {session} = useContext(AuthContext);
//   return (
//     <View>
//       <Text>BuyerHome</Text>
//       <Text>Session Token: {JSON.stringify(session)}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({});

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  Alert,
  Dimensions,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {AuthContext} from '../auth/context';
import {
  VictoryChart,
  VictoryGroup,
  VictoryBar,
  VictoryStack,
  VictoryAxis,
  VictoryTheme,
  VictoryLegend,
} from 'victory-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Divider} from '@rneui/themed';
import {useIsFocused} from '@react-navigation/native';

//* Device Width x Height

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

//* Get Month

const months = [
  {id: '01', month: 'January'},
  {id: '02', month: 'February'},
  {id: '03', month: 'March'},
  {id: '04', month: 'April'},
  {id: '05', month: 'May'},
  {id: '06', month: 'June'},
  {id: '07', month: 'July'},
  {id: '08', month: 'August'},
  {id: '09', month: 'September'},
  {id: '10', month: 'October'},
  {id: '11', month: 'November'},
  {id: '12', month: 'December'},
];

const OverviewBuyer = ({navigation, route}) => {
  // User Token

  const {userToken} = route.params;

  console.log('usertoken post-login: ' + userToken);

  //Auth Context

  const {signOut} = React.useContext(AuthContext);

  // Back Handler

  function handleBackButtonClick() {
    showConfirmDialog();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  // State Hooks

  const [showBox, setShowBox] = useState(true);

  // Alert Handler (Device Back button logout handler)

  //* Refresh Control for Overview

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    getProfileData();
    getScrapWeekData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const showConfirmDialog = () => {
    return Alert.alert(
      'Do wish to log out?',
      'Changes will be automatically be updated!',
      [
        {
          text: 'Yes',
          onPress: () => {
            setShowBox(false);
            signOut();
          },
        },
        {
          text: 'No',
        },
      ],
    );
  };

  //* Inventory Level Count

  const [inventoryLevel, setInventoryLevel] = useState(0);

  const getTotalScraps = () => {
    return fetch('https://sseoll.com/overviewScraps.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({readcode: 2}),
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log('2 data: ', data.totalWeight);
        setInventoryLevel(data[0].totalWeight);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTotalScraps();
  }, []);

  //* Fetch Profile Data

  const [headerName, setHeaderName] = useState('');
  const [headerLastName, setHeaderLastName] = useState('');
  const [image, setImage] = useState('');

  const getProfileData = () => {
    return fetch('https://sseoll.com/fetchBuyerProfile.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({readcode: 1, userID: userToken}),
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log('Profile Data: ', data[0].firstName);
        setHeaderName(data[0].firstName);
        setHeaderLastName(data[0].lastName);
        setImage(data[0].profileImage);
      })
      .catch(err => {
        console.log(err);
      });
  };

  //* Fetch Scrap Weekly Data

  const [data, setData] = useState([]);

  //* Get the Current Month

  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const [startMonth, setStartMonth] = useState('');
  const [endMonth, setEndMonth] = useState('');

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const getScrapWeekData = () => {
    return fetch('https://sseoll.com/statisticsGraph.php')
      .then(data => {
        return data.json();
      })
      .then(scrapData => {
        setData(scrapData);
        setStartMonth(month[Number(scrapData[0].scrapAddDate.slice(5, 7)) - 1]);
        setEndMonth(
          month[
            Number(scrapData[scrapData.length - 1].scrapAddDate.slice(5, 7)) - 1
          ],
        );
        setStartDate(scrapData[0].scrapAddDate.slice(8, 10));
        setEndDate(scrapData[scrapData.length - 1].scrapAddDate.slice(8, 10));
        console.log('Start Month: ', startMonth);
        console.log('End Month: ', endMonth);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getImageData = () => {
    return image;
  };

  useEffect(() => {
    getProfileData();
    getScrapWeekData();
  }, []);

  const isFocused = useIsFocused();

  if (!isFocused) {
    getProfileData();
    getImageData();
  }

  // Note: All data used for the bar chart are temporary.

  return isFocused ? (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <LinearGradient
          colors={['#F2F2F2', '#3E5A47']}
          style={styles.gradientContainer}
          start={{x: 0, y: 0.5}}
          end={{x: 0, y: 0.9}}>
          <View style={styles.header}>
            <View style={styles.profileHeader}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('BuyerProfile');
                  }}>
                  {image !== null ? (
                    <Image
                      style={styles.pfp}
                      source={{uri: getImageData()}}></Image>
                  ) : (
                    <Image
                      style={styles.pfp}
                      source={require('../assets/img/pfp.jpg')}></Image>
                  )}
                </TouchableOpacity>
                <Text style={styles.profileName}>Hey, {headerName}</Text>
              </View>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => {
                  handleBackButtonClick();
                }}>
                <Image
                  style={{width: 34, height: 33}}
                  source={require('../assets/img/logout.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              width: '100%',
              paddingLeft: 30,
              marginBottom: 15,
            }}>
            <Text
              style={{
                fontFamily: 'Inter-Bold',
                fontSize: 15,
                color: '#627D6B',
              }}>
              Stats: Breakdown
            </Text>
          </View>
          <View
            style={{
              borderBottomColor: '#3E5A47',
              borderBottomWidth: 0.5,
              width: '100%',
            }}
          />
          <View style={styles.statsContainer}>
            {data !== null ? (
              data.map(data => {
                return (
                  <View
                    style={{
                      marginLeft: 20,
                      marginRight: 20,
                      marginBottom: 20,
                    }}
                    key={data.scrapID}>
                    <Text style={styles.statDate}>
                      {data.scrapDayAdded}, {startMonth}{' '}
                      {data.scrapAddDate.slice(8, 10)}
                    </Text>
                    <Text style={styles.statWeight}>{data.totalWeight} kg</Text>
                  </View>
                );
              })
            ) : (
              <View
                style={{
                  position: 'absolute',
                  width: 200,
                  top: 120,
                  left: Width > 380 ? 110 : 80,
                }}>
                <Text
                  style={{
                    color: '#3E5A47',
                    fontFamily: 'Inter-SemiBold',
                    fontSize: 16,
                    textAlign: 'center',
                  }}>
                  There are no available scrap information for this week.
                </Text>
              </View>
            )}
          </View>
          <View
            style={{
              borderBottomColor: '#3E5A47',
              borderBottomWidth: 0.42,
              width: '100%',
            }}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              width: '100%',
              paddingLeft: 30,
              marginTop: 20,
            }}>
            <Text
              style={{
                fontFamily: 'Inter-Medium',
                fontSize: 15,
                color: '#627D6B',
              }}>
              {!startMonth && !startDate && !endMonth && !endDate ? (
                <Text>Monthly</Text>
              ) : (
                startMonth +
                ' ' +
                startDate +
                ' ' +
                '-' +
                ' ' +
                endMonth +
                ' ' +
                endDate
              )}{' '}
              <Text>Scrap Statistics</Text>
            </Text>
          </View>
          <View style={styles.graphContainer}>
            <Text
              style={{
                position: 'absolute',
                fontFamily: 'Inter-Medium',
                fontSize: 12,
                color: '#5E5E5E',
                transform: [{rotate: '90deg'}],
                top: 160,
                left: Width > 380 ? 280 : 235,
              }}>
              weight of scrap per type
            </Text>
            <VictoryChart
              style={styles.chart}
              theme={VictoryTheme.material}
              padding={{top: 60, bottom: 60, left: 60, right: 60}}
              domain={{y: [0, inventoryLevel === null ? 50 : inventoryLevel]}}
              domainPadding={30}>
              <VictoryStack style={styles.chartStack}>
                {data !== null ? (
                  data.map(scrapdata => {
                    return (
                      <VictoryBar
                        color={scrapdata.scrapColor}
                        key={parseInt(scrapdata.scrapID)}
                        data={[
                          {
                            x:
                              scrapdata.scrapDayAdded === ''
                                ? 0
                                : scrapdata.scrapDayAdded,
                            y: parseInt(scrapdata.totalWeight),
                          },
                        ]}
                      />
                    );
                  })
                ) : (
                  <></>
                )}
              </VictoryStack>
            </VictoryChart>
            <View style={styles.chartLegend}>
              {data !== null ? (
                <>
                  {data.map(data => {
                    return (
                      <View key={parseInt(data.scrapID)}>
                        <View
                          style={{
                            width: 41,
                            height: 13,
                            backgroundColor: data.scrapColor,
                            margin: 10,
                          }}
                        />
                        <Text style={{textAlign: 'center'}}>
                          {data.scrapCategory}
                        </Text>
                      </View>
                    );
                  })}
                </>
              ) : (
                <Text
                  style={{
                    color: '#3E5A47',
                    fontFamily: 'Inter-SemiBold',
                    fontSize: 12,
                    textAlign: 'center',
                  }}>
                  No scrap data yet!
                </Text>
              )}
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  ) : (
    ''
  );
};

// define your styles
const styles = StyleSheet.create({
  profileHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: (Width * 90) / 100,
    marginTop: 20,
    marginBottom: 20,
  },
  pfp: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#3E5A47',
    marginRight: 10,
  },
  profileName: {
    fontFamily: 'Inter-Regular',
    fontSize: 20,
    fontStyle: 'italic',
    color: '#3E5A47',
  },
  gradientContainer: {
    flex: 1,
    backgroundColor: '#2c3e50',
    alignItems: 'center',
  },
  gradientButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 34,
    height: 34,
    borderRadius: 10,
  },
  logoutButton: {
    height: 34,
  },
  statsContainer: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    width: (Width * 100) / 100,
    height: 320,
    paddingTop: 20,
    paddingLeft: 10,
  },
  statDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 17,
    color: '#627D6B',
  },
  statWeight: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#627D6B',
  },
  graphContainer: {
    backgroundColor: 'white',
    width: (Width * 90) / 100,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chart: {
    background: {
      fill: 'white',
    },
  },
  chartLegend: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    width: '94%',
    borderColor: '#989E9A',
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 20,
    padding: 5,
  },
  chartStack: {
    data: {stroke: 'black', strokeWidth: 1},
  },
});

//make this component available to the app
export default OverviewBuyer;

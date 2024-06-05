import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  ActivityIndicator,
  BackHandler,
  Alert
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ArrowIcon, SidebarIcon } from '../../components/Icons';
import {
  VictoryChart,
  VictoryBar,
  VictoryStack,
  VictoryTheme
} from 'victory-native';

import LinearGradient from 'react-native-linear-gradient';

import { sessionUpdate } from '../../services/authService';

export default function OwnerHome({ navigation, route }) {
  const { session, dataSession, fetchSummary, setSession } = useContext(AuthContext);

  const [stockOverall, setStockOverall] = useState(null);

  const legendList = require('../../data/graphLegend.json');

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Logout',
          'Are you sure you want to log out?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', onPress: () => setSession({ token: null }) }
          ],
          { cancelable: false }
        );
        return true; // Prevent default behavior (navigating back)
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation])
  );

  const sessionRefetch = async () => {
    try {
      const response = await sessionUpdate(session.profile.id, session.token);
      if (response) {
        setSession(prev => ({
          ...prev,
          profile: response?.user,
          verificationStatus: response?.user.verification_status,
          subscription_status: response?.subscription.subscription_status,
          subscription: response?.subscription,
          token: response?.token
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSummary(session.warehouseId, session.token);
  }, []);

  useEffect(() => {
    console.log('DATA SESSION: ', dataSession);
    if (dataSession) {
      const stockRawPercentage = dataSession.overall_stocks / 5000;
      const stockFormattedPercentage = (stockRawPercentage * 100).toFixed(2);
      setStockOverall(stockFormattedPercentage);
    }
  }, [dataSession]);

  const [refreshing, setRefreshing] = useState(null);

  const onRefresh = () => {
    setRefreshing(true);
    sessionRefetch();
    fetchSummary(session.warehouseId, session.token);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <LinearGradient
          colors={['#F2F2F2', '#3E5A47']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 0, y: 1 }}>
          <View style={styles.topbar}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <SidebarIcon />
            </TouchableOpacity>
            <Text style={styles.topbar_header}>Hey, {session.firstName}</Text>
          </View>

          <View style={styles.stats_section}>
            <View style={styles.overview}>
              <Text style={styles.overviewHeader}>Overview</Text>
              <View style={styles.overviewStats}>
                <TouchableOpacity
                  style={styles.currentScraps}
                  disabled={session.subscription_status === 1 ? false : true}
                  onPress={() => navigation.navigate('Analytics')}>
                  <View style={styles.scrapsStat}>
                    <Text style={styles.scrapsStatHeader}>
                      Today's Scraps (kg)
                    </Text>
                    <Text style={styles.scrapsStatValue}>
                      {dataSession?.todays_scrap}
                    </Text>
                  </View>
                  {session.subscription_status === 1 && <ArrowIcon />}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.currentScraps}
                  disabled={session.subscription_status === 1 ? false : true}
                  onPress={() => navigation.navigate('Analytics')}>
                  <View style={styles.scrapsStat}>
                    <Text style={styles.scrapsStatHeader}>Week Total (kg)</Text>
                    <Text style={styles.scrapsStatValue} numberOfLines={1}>
                      {dataSession?.week_total}
                    </Text>
                  </View>
                  {session.subscription_status === 1 && <ArrowIcon />}
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inventoryStat}>
              <Text style={styles.inventoryStatLabel}>
                Overall Scrapyard Stock
              </Text>
              <Text style={styles.inventoryStatValue} numberOfLines={2}>
                {stockOverall}%
              </Text>
              <Text style={styles.inventoryStatLabel}>
                {5000 - dataSession?.overall_stocks} kg out of 5000 kg available
              </Text>
            </View>
          </View>

          <Text style={styles.graphStatDate}>
            {dataSession?.week_start_date} - {dataSession?.week_end_date} Scrap
            Statistics
          </Text>

          <View style={styles.stats__graphContainer}>
            {/* Graph */}
            <Text style={styles.stats__graphLabelX}>
              weight of scrap per type
            </Text>
            {dataSession ? (
              <VictoryChart
                style={styles.chart}
                theme={VictoryTheme.material}
                padding={{ top: 60, bottom: 60, left: 70, right: 70 }}
                maxDomain={{
                  y:
                    dataSession.overall_stocks !== 0
                      ? dataSession.overall_stocks + 50
                      : 50
                }}
                domainPadding={30}>
                <VictoryStack>
                  {dataSession?.week_stacked_data.map((scraps, index) => {
                    return (
                      <VictoryBar
                        key={index}
                        color={scraps.scrap_bar_color}
                        data={[
                          {
                            x: scraps.scrap_issued_day,
                            y: scraps.scrap_total_weight
                          }
                        ]}></VictoryBar>
                    );
                  })}
                </VictoryStack>
              </VictoryChart>
            ) : (
              <View style={{ height: 500, paddingVertical: 50 }}>
                <ActivityIndicator size={'large'} color={'#3E5A47'} />
              </View>
            )}
            {/* Graph Legend */}
            <View style={styles.stats__graph_legend}>
              {legendList.map(category => {
                return (
                  <View
                    style={styles.stats__graph_legend_inner}
                    key={category.scrap_category_id}>
                    <View
                      style={{
                        width: 41,
                        height: 13,
                        backgroundColor: category.scrap_bar_color,
                        margin: 10
                      }}></View>
                    <Text style={{ textAlign: 'center', color: '#3E5A47' }}>
                      {category.scrap_category}
                    </Text>
                  </View>
                );
              })}
            </View>
            {/* --- */}
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20
  },
  topbar_header: {
    color: '#3E5A47',
    fontFamily: 'Inter-Regular',
    fontSize: 20
  },
  stats_section: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  overview: {
    width: 160
  },
  overviewHeader: {
    color: '#3E5A47',
    fontFamily: 'Inter-SemiBold',
    fontSize: 30,
    // borderWidth: 1,
    marginBottom: 20
  },
  currentScraps: {
    alignItems: 'center',
    backgroundColor: '#61876E',
    borderRadius: 8,
    flexDirection: 'row',
    paddingTop: 5,
    paddingLeft: 10,
    paddingBottom: 10,
    marginBottom: 20
  },
  overviewStats: {
    borderRadius: 8
  },
  scrapsStat: {
    width: '85%',
    height: 74,
    justifyContent: 'center'
    // borderWidth: 1,
  },
  scrapsStatHeader: {
    color: '#F4F5F4',
    fontFamily: 'Inter-Medium',
    fontSize: 12
  },
  scrapsStatValue: {
    color: '#F4F5F4',
    fontFamily: 'Inter-Medium',
    fontSize: 30,
    numberOfLines: 1,
    ellipsizeMode: 'tail'
  },
  inventoryStat: {
    width: 160,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    textAlign: 'center'
  },
  inventoryStatLabel: {
    color: '#5E5E5E',
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    textAlign: 'center',
    paddingLeft: 15,
    paddingRight: 15
  },
  inventoryStatValue: {
    color: '#3E5A47',
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    textAlign: 'center',
    width: 120,
    ellipsizeMode: 'tail'
  },
  graphStatDate: {
    color: '#5E5E5E',
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    marginLeft: 20
  },
  stats__graphContainer: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: '90%',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#5E5E5E',
    alignItems: 'center',
    justifyContent: 'center'
  },
  stats__graph_legend: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    borderColor: '#989E9A',
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  stats__graph_legend_inner: {
    alignItems: 'center',
    width: 70,
    height: 70
    // borderWidth: 1,
  },
  stats_daily__divider: {
    alignSelf: 'center',
    marginBottom: 25,
    width: '100%'
  },
  stats__graphLabelX: {
    position: 'absolute',
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#5E5E5E',
    transform: [{ rotate: '90deg' }],
    top: '45%',
    left: '75%'
  }
});

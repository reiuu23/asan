import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import { Divider } from '@rneui/themed';
import {
  VictoryChart,
  VictoryGroup,
  VictoryBar,
  VictoryStack,
  VictoryAxis,
  VictoryTheme,
  VictoryLegend
} from 'victory-native';
import { useState } from 'react';
import { AsanIcon } from '../../components/Icons';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import useCustomFetch from '../../hooks/useCustomFetch';
import LinearGradient from 'react-native-linear-gradient';

export default function BuyerAnalytics() {
  const scrapList = require('../../data/analytics.json');
  const legendList = require('../../data/graphLegend.json');
  const scrapStats = require('../../data/scrapTotalDate.json');

  const { session } = useContext(AuthContext);
  const { data, error, fetchData } = useCustomFetch();

  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (data) {
      const uniqueDate = data.filter(
        (obj, index, self) =>
          index ===
          self.findIndex(t => t.scrap_issued_date === obj.scrap_issued_date)
      );
      setFilteredData(uniqueDate);
    }
  }, [data]);

  useEffect(() => {
    console.log(">:", filteredData);
  }, [filteredData]);

  const fetchAnalytics = () => {
    const local = 'http://192.168.100.5/rest/scrapdata/analytics';
    const payload = { warehouse_id: session.selectedWarehouse };
    fetchData(local, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer f7b5b129-7dd1-4366-bd1e-031e03315c32'
      },
      body: JSON.stringify(payload)
    });
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.top_bar__container}>
        <Text style={styles.top_bar__container_header}>Analytics</Text>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchAnalytics}
            colors={['#3E5A47']}
          />
        }>
        <LinearGradient
          colors={['#F2F2F2', '#3E5A47']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 0, y: 0.9 }}
          style={{
            height: '100%',
            marginBottom: 115
          }}>
          <View style={styles.stats_daily__container}>
            {!loading ? (
              <Text style={styles.stats_daily__topheader}>
                Stats: Break Down
              </Text>
            ) : (
              <Text style={styles.stats_daily__topheader}>Loading...</Text>
            )}
            <Divider
              color="#3E5A47"
              style={styles.stats_daily__divider}
              width={1}
            />
            {/* Stats Dates */}
            <View
              style={{
                flexDirection: 'column',
                flexWrap: 'wrap',
                gap: 15,
                height: 280,
                alignSelf: 'left',
                paddingBottom: 10,
                paddingLeft: 20
              }}>
              {filteredData ? (
                filteredData.length !== 0 ? (
                  filteredData?.map((breakdown, index) => {
                    return (
                      <View key={index}>
                        <Text
                          style={{
                            color: '#627D6B',
                            fontFamily: 'Inter-Regular',
                            fontSize: 17
                          }}>
                          {breakdown.scrap_issued_date}
                        </Text>
                        <Text
                          style={{
                            color: '#3E5A47',
                            fontFamily: 'Inter-Bold',
                            fontSize: 20
                          }}>
                          {breakdown.total_volume_per_day} kg
                          {/* {breakdown.total_volume_all_categories} kg */}
                        </Text>
                      </View>
                    );
                  })
                ) : (
                  <View
                    style={{
                      height: '95%',
                      width: '95%',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <Text
                      style={{
                        color: '#627D6B',
                        fontFamily: 'Inter-Regular',
                        fontSize: 17
                      }}>
                      There are no analytics data yet!
                    </Text>
                  </View>
                )
              ) : (
                <View
                  style={{
                    height: '95%',
                    width: '95%',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                  <ActivityIndicator size={'large'} color={'#3E5A47'} />
                </View>
              )}
            </View>
            <Divider
              color="#3E5A47"
              style={styles.stats_daily__container}
              width={1}
            />
            {data ? (
              data.length !== 0 ? (
                <Text style={styles.stats_daily__header}>
                  {data[0]?.data_generated_date}
                </Text>
              ) : (
                <Text style={styles.stats_daily__header}>Scrap Statistics</Text>
              )
            ) : (
              <Text style={styles.stats_daily__header}>Loading...</Text>
            )}
          </View>
          {/* Bar Graph Section */}
          {!loading ? (
            data ? (
              <View style={styles.stats__graphContainer}>
                {/* Graph */}
                <Text style={styles.stats__graphLabelX}>
                  weight of scrap per type
                </Text>
                <VictoryChart
                  style={styles.chart}
                  theme={VictoryTheme.material}
                  padding={{ top: 60, bottom: 60, left: 60, right: 60 }}
                  maxDomain={{ y: data ? data[0]?.max_volume : 100 }}
                  domainPadding={30}>
                  <VictoryStack>
                    {data?.map((scraps, index) => {
                      return (
                        <VictoryBar
                          key={index}
                          color={scraps?.scrap_color}
                          data={[
                            {
                              x: scraps?.day_of_week,
                              y: scraps?.total_volume
                            }
                          ]}></VictoryBar>
                      );
                    })}
                  </VictoryStack>
                </VictoryChart>
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
                        <Text style={{ textAlign: 'center' }}>
                          {category.scrap_category}
                        </Text>
                      </View>
                    );
                  })}
                </View>
                {/* --- */}
              </View>
            ) : <View style={{height: 50}}></View>
          ) : (
            <View
              style={{
                height: '20%',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <ActivityIndicator size={'large'} color={'#FFFFFF'} />
            </View>
          )}
          {/* --- */}
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  top_bar__container: {
    backgroundColor: '#3E5A47',
    height: 115,
    justifyContent: 'center',
    paddingTop: 25,
    paddingLeft: 20,
    paddingRight: 20
  },
  top_bar__container_header: {
    alignSelf: 'center',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    fontSize: 26
  },
  stats_daily__topheader: {
    color: '#3E5A47',
    fontFamily: 'Inter-Bold',
    fontSize: 15,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 15
  },
  stats_daily__header: {
    color: '#3E5A47',
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    paddingLeft: 15,
    marginTop: 20
  },
  stats__graphContainer: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: '93%',
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
    paddingBottom: 10,
  },
  stats__graph_legend_inner: {
    alignItems: 'center',
    width: 100,
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

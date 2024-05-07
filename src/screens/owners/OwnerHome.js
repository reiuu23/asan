import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { SidebarIcon } from '../../components/Icons';

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

import LinearGradient from 'react-native-linear-gradient';

export default function OwnerHome({ navigation, route }) {

  const { session } = useContext(AuthContext);

  // console.log("session (home): ", session);

  const scrapList = require('../../data/analytics.json');
  const legendList = require('../../data/graphLegend.json');
  const scrapStats = require('../../data/scrapTotalDate.json');

  return (
    <SafeAreaView>
      <ScrollView>
        <LinearGradient
          colors={['#F2F2F2', '#3E5A47']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 0, y: 1 }}>
          <View style={styles.topbar}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <SidebarIcon />
            </TouchableOpacity>
            <Text style={styles.topbar_header}>Hey, John</Text>
          </View>

          <View style={styles.stats_section}>
            <View style={styles.overview}>
              <Text style={styles.overviewHeader}>Overview</Text>
              <View style={styles.overviewStats}>
                <View style={styles.currentScraps}>
                  <View style={styles.scrapsStat}>
                    <Text style={styles.scrapsStatHeader}>Today's Scraps</Text>
                    <Text style={styles.scrapsStatValue}>14</Text>
                  </View>
                  <TouchableOpacity styles={styles.scrapsButton}>
                    <Text style={{color: '#E5E5E5'}}>{'>'}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.currentScraps}>
                  <View style={styles.scrapsStat}>
                    <Text style={styles.scrapsStatHeader}>Total Received</Text>
                    <Text style={styles.scrapsStatValue}>14</Text>
                  </View>
                  <TouchableOpacity styles={styles.scrapsButton}>
                    <Text style={{color: '#E5E5E5'}}>{'>'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.inventoryStat}>
              <Text style={styles.inventoryStatLabel}>
                Overall Scrapyard Stock
              </Text>
              <Text style={styles.inventoryStatValue}>97.60%</Text>
              <Text style={styles.inventoryStatLabel}>
                976 kg out of 1000 kg available
              </Text>
            </View>
          </View>

          <Text style={styles.graphStatDate}>
            May 7 - May 13 Scrap Statistics
          </Text>

          <View style={styles.stats__graphContainer}>
            {/* Graph */}
            <Text style={styles.stats__graphLabelX}>
              weight of scrap per type
            </Text>
            <VictoryChart
              style={styles.chart}
              theme={VictoryTheme.material}
              padding={{ top: 60, bottom: 60, left: 70, right: 70 }}
              maxDomain={{ y: 150 }}
              domainPadding={30}>
              <VictoryStack>
                {scrapList.map(scraps => {
                  return (
                    <VictoryBar
                      key={scraps.scrap_id}
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
    fontSize: 15
  },
  scrapsStatValue: {
    color: '#F4F5F4',
    fontFamily: 'Inter-Medium',
    fontSize: 30
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
    fontSize: 32
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
    justifyContent: 'center',
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

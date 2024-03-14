import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import {Divider} from '@rneui/themed';
import {
  VictoryChart,
  VictoryGroup,
  VictoryBar,
  VictoryStack,
  VictoryAxis,
  VictoryTheme,
  VictoryLegend,
} from 'victory-native';
import LinearGradient from 'react-native-linear-gradient';
import {AsanIcon} from '../../components/Icons';

export default function BuyerAnalytics() {
  const scrapList = require('../../data/analytics.json');
  const legendList = require('../../data/graphLegend.json');
  const scrapStats = require('../../data/scrapTotalDate.json');

  return (
    <SafeAreaView>
      <View style={styles.top_bar__container}>
        <Text style={styles.top_bar__container_header}>Analytics</Text>
      </View>
      <ScrollView>
        <LinearGradient
          colors={['#F2F2F2', '#3E5A47']}
          style={{
            height: '100%',
            marginBottom: 115,
          }}>
          <View style={styles.stats_daily__container}>
            <Text style={styles.stats_daily__topheader}>Stats: Break Down</Text>
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
                gap: 10,
                height: 280,
                alignSelf: 'center',
                paddingBottom: 10,
              }}>
              {scrapStats.map((dateTotal, index) => {
                return (
                  <View key={index}>
                    <Text
                      style={{
                        color: '#627D6B',
                        fontFamily: 'Inter-Regular',
                        fontSize: 17,
                        marginRight: 20,
                      }}>
                      {dateTotal.scrap_issued_date}
                    </Text>
                    <Text
                      style={{
                        color: '#3E5A47',
                        fontFamily: 'Inter-Bold',
                        fontSize: 20,
                      }}>
                      {dateTotal.scrap_total_weight}
                    </Text>
                  </View>
                );
              })}
            </View>
            <Divider
              color="#3E5A47"
              style={styles.stats_daily__container}
              width={1}
            />
            <Text style={styles.stats_daily__header}>
              May 7 - May 13 Scrap Statistics
            </Text>
          </View>
          {/* Bar Graph Section */}
          <View style={styles.stats__graphContainer}>
            {/* Graph */}
            <Text style={styles.stats__graphLabelX}>
              weight of scrap per type
            </Text>
            <VictoryChart
              style={styles.chart}
              theme={VictoryTheme.material}
              padding={{top: 60, bottom: 60, left: 60, right: 60}}
              // domain={{y: [0, inventoryLevel === null ? 50 : inventoryLevel]}}
              // minDomain={{x: 0, y: 0}}
              maxDomain={{y: 200}}
              domainPadding={30}>
              <VictoryStack>
                {scrapList.map(scraps => {
                  return (
                    <VictoryBar
                      color={scraps.scrap_bar_color}
                      key={scraps.scrap_id}
                      data={[
                        {
                          x: scraps.scrap_issued_day,
                          y: scraps.scrap_total_weight,
                        },
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
                        margin: 10,
                      }}></View>
                    <Text style={{textAlign: 'center'}}>
                      {category.scrap_category}
                    </Text>
                  </View>
                );
              })}
            </View>
            {/* --- */}
          </View>
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
    paddingRight: 20,
  },
  top_bar__container_header: {
    alignSelf: 'center',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    fontSize: 26,
  },
  stats_daily__topheader: {
    color: '#3E5A47',
    fontFamily: 'Inter-Bold',
    fontSize: 15,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 15,
  },
  stats_daily__header: {
    color: '#3E5A47',
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    paddingLeft: 15,
    marginTop: 20,
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
    padding: 0,
  },
  stats__graph_legend_inner: {
    alignItems: 'center',
  },
  stats_daily__divider: {
    alignSelf: 'center',
    marginBottom: 25,
    width: '100%',
  },
  stats__graphLabelX: {
    position: 'absolute',
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#5E5E5E',
    transform: [{rotate: '90deg'}],
    top: '45%',
    left: '77%',
  },
});

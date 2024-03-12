import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import {Divider} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';

export default function BuyerAnalytics() {
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
            <Text>Stats: Break Down</Text>
            <Divider
              color="#3E5A47"
              style={{alignSelf: 'center', marginBottom: 25, width: '100%'}}
              width={1}
            />
            <Text>Stats: Break Down</Text>
            <Divider
              color="#3E5A47"
              style={{
                alignSelf: 'center',
                marginBottom: 25,
                width: '100%',
              }}
              width={1}
            />
            <Text>May 7 - May 13 Scrap Statistics</Text>
          </View>
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
});

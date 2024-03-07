import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

// Stocks Sample Data

const stocks = require('../../data/scraps.json');

const renderItem = ({item}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <View>
        <Text>1</Text>
      </View>
      <View>
        <Text>2</Text>
      </View>
    </View>
  );
};

export default function BuyerStocks() {
  return (
    <SafeAreaView>
      <View style={styles.top_bar__container}>
        <Text style={styles.top_bar__container_header}>Available Stocks</Text>
      </View>
      <LinearGradient colors={['#F2F2F2', '#3E5A47']} style={{height: '100%'}}>
        <FlatList
          data={stocks} // find a way to filter this data first before rendering. (FINAL HINT)
          renderItem={renderItem}
          keyExtractor={item => item.scrapID.toString()}></FlatList>
      </LinearGradient>
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

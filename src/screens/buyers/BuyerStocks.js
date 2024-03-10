import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  CardboardIcon,
  ClothIcon,
  ElectronicsIcon,
  GlassIcon,
  MetalIcon,
  PlasticIcon,
} from '../../components/Icons';

// Stocks Sample Data

const stocks = require('../../data/scraps.json');

const renderItem = ({item}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        flexDirection: 'row',
        width: 50,
        height: 50,
        borderWidth: 1,
      }}>
      <Text style={{alignSelf: 'center'}}>{item.scrapSizeVolume}</Text>
    </View>
  );
};

export default function BuyerStocks() {
  return (
    <SafeAreaView>
      <View style={styles.top_bar__container}>
        <Text style={styles.top_bar__container_header}>Available Stocks</Text>
      </View>
      <LinearGradient
        colors={['#F2F2F2', '#3E5A47']}
        style={{height: '100%', padding: 50}}>
        <View style={{flexDirection: 'row', borderWidth: 1}}>
          <View
            style={{
              flexDirection: 'column',
              borderWidth: 1,
              borderColor: 'blue',
              alignItems: 'center',
              flex: 1,
            }}>
            <Text>Types</Text>
            <View style={styles.scrapStock__icons}>
              <PlasticIcon></PlasticIcon>
              <Text>Plastic</Text>
            </View>
            <View style={styles.scrapStock__icons}>
              <CardboardIcon></CardboardIcon>
              <Text>Paper/Cardboard</Text>
            </View>
            <View style={styles.scrapStock__icons}>
              <MetalIcon></MetalIcon>
              <Text>Metal</Text>
            </View>
            <View style={styles.scrapStock__icons}>
              <GlassIcon></GlassIcon>
              <Text>Glass</Text>
            </View>
            <View style={styles.scrapStock__icons}>
              <ElectronicsIcon></ElectronicsIcon>
              <Text>Electronic Waste</Text>
            </View>
            <View style={styles.scrapStock__icons}>
              <ClothIcon></ClothIcon>
              <Text>Cloth</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'column',
              borderWidth: 1,
              borderColor: 'blue',
              alignItems: 'center',
              flex: 1.5,
            }}>
            <Text>Total Weight (kg)</Text>
            <FlatList
              data={stocks} // find a way to filter this data first before rendering. (FINAL HINT)
              renderItem={renderItem}
              scrollEnabled={false}
              keyExtractor={item => item.scrapID.toString()}></FlatList>
          </View>
        </View>
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
  scrapStock__icons: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    borderWidth: 1,
    marginBottom: 50,
  },
});

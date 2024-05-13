import React from 'react';
import {StyleSheet, Text, View, FlatList, Image, Pressable} from 'react-native';

export default function ScrapCat({scraps}) {
  // Group scraps by type
  const groupedScraps = scraps.reduce((acc, scrap) => {
    if (!acc[scrap.scrapType]) {
      acc[scrap.scrapType] = [];
    }
    acc[scrap.scrapType].push(scrap);
    return acc;
  }, {});

  // Render a horizontal FlatList for each type
  const renderCategory = ({item}) => {
    return (
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>{item.type}</Text>
        <FlatList
          data={item.data}
          horizontal
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };

  // Render each scrap item
  const renderItem = ({item}) => {
    return (
      <View style={styles.scrapItem}>
        <Image
          style={styles.scrapImage}
          source={require('../assets/img/plasticImg.png')}
        />
        <Text numberOfLines={1} style={styles.scrap_list__scrap_name}>
          {item.scrapName}
        </Text>
        <View style={styles.scrap_list__scrap_details}>
          <View>
            <Text style={styles.scrap_list__scrap_size}>
              Size: {item.scrapSizeVolume} {item.scrapSizeUnit}
            </Text>
            <Text style={styles.scrap_list__scrap_cost}>
              Cost: {item.scrapCostCurrency} {item.scrapCostValue} / kg
            </Text>
            <Text style={styles.scrap_list__scrap_quantity}>
              Quantity: {item.scrapQuantity} pieces
            </Text>
            <Pressable
              style={{borderWidth: 1, backgroundColor: '#3E5A47'}}
              onPress={() => console.log(item)}>
              <Text>Submit</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={Object.entries(groupedScraps).map(([type, data]) => ({
        type,
        data,
      }))}
      renderItem={renderCategory}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrapItem: {
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 1,
    height: 200,
    width: 140,
    paddingTop: 10,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 10,
  },
  scrapImage: {
    alignSelf: 'center',
    borderRadius: 8,
    width: 120,
    height: 88,
    marginBottom: 10,
  },
  scrap_list__scrap_name: {
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    width: 120,
    color: '#3E5A47',
  },
  scrap_list__scrap_size: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#3E5A47',
  },
  scrap_list__scrap_cost: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#3E5A47',
  },
  scrap_list__scrap_quantity: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#3E5A47',
  },
});

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useEffect} from 'react';

export default function Scraps({scrapCategory}) {
  // Scrap List Example

  // useEffect(() => {
  //   console.log(':' + scrapCategory);
  // }, [scrapCategory]);

  const scrapList = [
    {
      scrapID: 1,
      scrapType: 'Plastic',
      scrapName: 'Plastic Bottles',
      scrapSizeVolume: 350,
      scrapSizeUnit: 'ml',
      scrapCostValue: 7,
      scrapCostCurrency: 'PHP',
      scrapQuantity: 9,
    },
    {
      scrapID: 2,
      scrapType: 'Paper',
      scrapName: 'Manila Paper',
      scrapSizeVolume: 1,
      scrapSizeUnit: 'L',
      scrapCostValue: 60,
      scrapCostCurrency: 'PHP',
      scrapQuantity: 12,
    },
    {
      scrapID: 3,
      scrapType: 'Metal',
      scrapName: 'Broken Bike Frame',
      scrapSizeVolume: 1,
      scrapSizeUnit: 'L',
      scrapCostValue: 60,
      scrapCostCurrency: 'PHP',
      scrapQuantity: 12,
    },
    {
      scrapID: 4,
      scrapType: 'Plastic',
      scrapName: 'Plastic Buttlez',
      scrapSizeVolume: 350,
      scrapSizeUnit: 'ml',
      scrapCostValue: 7,
      scrapCostCurrency: 'PHP',
      scrapQuantity: 9,
    },
    {
      scrapID: 5,
      scrapType: 'Plastic',
      scrapName: 'Plastic Buttlez',
      scrapSizeVolume: 350,
      scrapSizeUnit: 'ml',
      scrapCostValue: 7,
      scrapCostCurrency: 'PHP',
      scrapQuantity: 9,
    },
    {
      scrapID: 6,
      scrapType: 'Plastic',
      scrapName: 'Plastic Buttlez',
      scrapSizeVolume: 350,
      scrapSizeUnit: 'ml',
      scrapCostValue: 7,
      scrapCostCurrency: 'PHP',
      scrapQuantity: 9,
    },
  ];

  const testArr = [];

  const renderItem = ({item}) => {
    if (item.scrapType.includes(scrapCategory)) {
      testArr.push(item);
      console.log(testArr);
      for (let i = 0; i <= testArr.length; i++) {
        console.log('testarr length: ' + testArr.length);
        return (
          <View style={styles.scrap_list__scrap_item}>
            <Image
              style={styles.scrapImage}
              source={require('../assets/img/plasticImg.png')}
            />
            <Text
              numberOfLines={1}
              // ellipsizeMode="head"
              style={styles.scrap_list__scrap_name}>
              {testArr[i].scrapName}
            </Text>
            <View style={styles.scrap_list__scrap_details}>
              <View>
                <View style={styles.scrap_list__scrap_size}>
                  <Text style={styles.scrap_list__scrap_size_label}>Size:</Text>
                  <Text style={styles.scrap_list__scrap_size_output}>
                    {testArr[i].scrapSizeVolume +
                      ' ' +
                      testArr[i].scrapSizeUnit}
                  </Text>
                </View>
                <View style={styles.scrap_list__scrap_cost}>
                  <Text style={styles.scrap_list__scrap_cost_label}>Cost:</Text>
                  <Text style={styles.scrap_list__scrap_cost_output}>
                    {testArr[i].scrapCostCurrency +
                      ' ' +
                      testArr[i].scrapCostValue +
                      ' / ' +
                      'kg'}
                  </Text>
                </View>
                <View style={styles.scrap_list__scrap_quantity}>
                  <Text style={styles.scrap_list__scrap_quantity_label}>
                    Quantity:
                  </Text>
                  <Text style={styles.scrap_list__scrap_quantity_output}>
                    {testArr[i].scrapQuantity + ' pieces'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        );
      }
    }
  };

  // if (!item.scrapType.includes(scrapCategory)) {
  //   return <Text>No data</Text>;
  // }
  //};

  return (
    <ScrollView onScroll={e => console.log(e.nativeEvent.contentOffset.x)}>
      <FlatList
        data={scrapList} // find a way to filter this data first before rendering. (FINAL HINT)
        renderItem={renderItem}
        keyExtractor={item => item.scrapID.toString()}
        overScrollMode="never"
        horizontal></FlatList>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrap_list__scrap_item: {
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 1,
    height: 200,
    width: 140,
    paddingTop: 10,
    marginBottom: 20,
    marginLeft: 15,
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
    flexDirection: 'row',
    gap: 34,
    paddingLeft: 1,
    marginTop: 5,
  },
  scrap_list__scrap_size_label: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#3E5A47',
  },
  scrap_list__scrap_size_output: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    fontWeight: 'bold',
    color: '#3E5A47',
  },
  scrap_list__scrap_cost: {
    flexDirection: 'row',
    gap: 32,
    paddingLeft: 1,
  },
  scrap_list__scrap_cost_label: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#3E5A47',
  },
  scrap_list__scrap_cost_output: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    fontWeight: 'bold',
    color: '#3E5A47',
  },
  scrap_list__scrap_quantity: {
    flexDirection: 'row',
    gap: 12,
    paddingLeft: 1,
  },
  scrap_list__scrap_quantity_label: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#3E5A47',
  },
  scrap_list__scrap_quantity_output: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    fontWeight: 'bold',
    color: '#3E5A47',
  },
});

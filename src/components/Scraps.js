import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';

// This component is strictly made for testing purposes only. Future changes will be made after finalizing the components.

// Scrap List Example

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
    scrapType: 'Plastic',
    scrapName: 'Plastic Containers',
    scrapSizeVolume: 1,
    scrapSizeUnit: 'L',
    scrapCostValue: 60,
    scrapCostCurrency: 'PHP',
    scrapQuantity: 12,
  },
];

export default function Scraps() {
  return (
    <>
      {scrapList.map(scrap => {
        return (
          <View style={styles.scrap_list__scrap_item}>
            <Image
              style={styles.scrapImage}
              source={require('../assets/img/plasticImg.png')}
            />
            <Text>{scrap.scrapName}</Text>
            <View style={styles.scrap_list__scrap_details}>
              <View>
                <View style={styles.scrap_list__scrap_size}>
                  <Text style={styles.scrap_list__scrap_size_label}>Size:</Text>
                  <Text style={styles.scrap_list__scrap_size_output}>
                    {scrap.scrapSizeVolume + ' ' + scrap.scrapSizeUnit}
                  </Text>
                </View>
                <View style={styles.scrap_list__scrap_cost}>
                  <Text style={styles.scrap_list__scrap_cost_label}>Cost:</Text>
                  <Text style={styles.scrap_list__scrap_cost_output}>
                    {scrap.scrapCostCurrency +
                      ' ' +
                      scrap.scrapCostValue +
                      ' / ' +
                      'kg'}
                  </Text>
                </View>
                <View style={styles.scrap_list__scrap_quantity}>
                  <Text style={styles.scrap_list__scrap_quantity_label}>
                    Quantity:
                  </Text>
                  <Text style={styles.scrap_list__scrap_quantity_output}>
                    {scrap.scrapQuantity + ' pieces'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  scrap_list__scrap_item: {
    alignItems: 'center',
    backgroundColor: 'gray',
    height: 142,
    width: 111,
    marginBottom: 20,
  },
  scrap_list__scrap_size: {
    flexDirection: 'row',
    position: 'absolute',
  },
  scrapImage: {
    alignSelf: 'center',
    width: 94,
    height: 69,
  },
});

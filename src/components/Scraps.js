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
    <View style={styles.scrap_list__scrap_item}>
      {scrapList.map(scrap => {
        return (
          <>
            <Image source={require('../assets/img/plasticImg.png')} />
            <Text>{scrap.scrapName}</Text>
            <View style={styles.scrap_list__scrap_details}>
              <View>
                <Text>Size:</Text>
                <Text>Cost:</Text>
                <Text>Quantity:</Text>
              </View>
              <View>
                <Text>{scrap.scrapSizeVolume + ' ' + scrap.scrapSizeUnit}</Text>
                <Text>
                  {scrap.scrapCostCurrency +
                    ' ' +
                    scrap.scrapCostValue +
                    ' / ' +
                    'kg'}
                </Text>
                <Text>{scrap.scrapQuantity + ' pieces'}</Text>
              </View>
            </View>
          </>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({});

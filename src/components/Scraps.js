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
            <Image></Image>
            <Text>{scrap.scrapName}</Text>
            <TouchableOpacity>
              <Text>Add to Cart</Text>
            </TouchableOpacity>
          </>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({});

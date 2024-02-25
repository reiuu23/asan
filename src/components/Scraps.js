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
            <Text
              numberOfLines={1}
              // ellipsizeMode="head"
              style={styles.scrap_list__scrap_name}>
              {scrap.scrapName}
            </Text>
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
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    height: 200,
    width: 140,
    paddingTop: 10,
    marginBottom: 20,
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

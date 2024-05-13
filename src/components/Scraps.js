import { useField } from 'formik';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';

export default function Scraps({ scrapCategory, searchQuery, scrapData }) {
  const scrapList = require('../data/scraps.json');
  const [scrollStatus, setScrollStatus] = useState(true);

  const data = !Array.isArray(scrapData) ? [scrapData] : scrapData;

  useEffect(() => {
    console.log('scrapData (scraps): ', scrapData);
  }, [scrapData]);

  useEffect(() => {
    if (scrapData) return setScrollStatus(true);
    setScrollStatus(false);
  }, [scrapData]);

  const filteredScraps = data.filter(item =>
    item.scrap_category.includes(scrapCategory)
  );

  const filteredScrapsByCategory = filteredScraps.filter(item =>
    item.scrap_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredScrapsByAll = data.filter(item =>
    item.scrap_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.scrapItemContents}>
          <Image
            style={styles.scrapImage}
            source={
              item.scrap_image
                ? { uri: item.scrap_image }
                : require('../assets/img/plasticImg.png')
            }
          />
          <Text style={styles.title} numberOfLines={1}>
            {item.scrap_name}
          </Text>
          <View style={styles.row}>
            <Text style={styles.label}>Volume</Text>
            <Text style={styles.value}>
              {item.scrap_volume ? item.scrap_volume : 'Unspecified'}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total Weight (kg)</Text>
            <Text style={styles.value}>{item.scrap_total_weight}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Stocks</Text>
            <Text style={styles.value}>{item.scrap_stock_count} pieces</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Scrap Price (per kg)</Text>
            <Text style={styles.value}>&#8369; {item.scrap_price_per_kg}</Text>
          </View>
        </View>
      </View>
    );
  };

  const onEmptyList = () => {
    return <Text style={styles.onEmptyData}>No results found.</Text>;
  };

  return (
    <FlatList
      data={
        scrapCategory !== 'All' ? filteredScrapsByCategory : filteredScrapsByAll
      }
      renderItem={renderItem}
      keyExtractor={item => item.scrap_id.toString()}
      ListEmptyComponent={onEmptyList}
      scrollEnabled={scrollStatus}
      horizontal
    />
  );
}

const styles = StyleSheet.create({
  onEmptyData: {
    color: '#3E5A47',
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginTop: 30,
    marginBottom: 30,
  },
  scrap_list__scrap_item: {
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    elevation: 5,
    height: 200,
    width: 140,
    paddingTop: 10,
    marginBottom: 20,
    marginLeft: 15,
    marginRight: 10
  },
  scrapImage: {
    alignSelf: 'center',
    borderRadius: 8,
    width: 120,
    height: 88,
    marginBottom: 10
  },
  scrap_list__scrap_name: {
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    width: 120,
    color: '#3E5A47'
  },
  scrap_list__scrap_size: {
    flexDirection: 'row',
    gap: 34,
    paddingLeft: 1,
    marginTop: 5
  },
  scrap_list__scrap_size_label: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#3E5A47'
  },
  scrap_list__scrap_size_output: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    fontWeight: 'bold',
    color: '#3E5A47'
  },
  scrap_list__scrap_cost: {
    flexDirection: 'row',
    gap: 32,
    paddingLeft: 1
  },
  scrap_list__scrap_cost_label: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#3E5A47'
  },
  scrap_list__scrap_cost_output: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    fontWeight: 'bold',
    color: '#3E5A47'
  },
  scrap_list__scrap_quantity: {
    flexDirection: 'row',
    gap: 12,
    paddingLeft: 1
  },
  scrap_list__scrap_quantity_label: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#3E5A47'
  },
  scrap_list__scrap_quantity_output: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    fontWeight: 'bold',
    color: '#3E5A47'
  },
  
  scrapItemContents: {
    width: 200,
    backgroundColor: '#E5E5E5',
    borderRadius: 8,
    marginRight: 20,
    marginLeft: 20,
    paddingTop: 10,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },

  // Scrap Item Content Styles
  scrapImage: {
    width: 180,
    height: 140,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 8,
    borderColor: '#3E5A47'
  },
  title: {
    color: '#3E5A47',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    alignSelf: 'center',
    marginBottom: 10,
    width: 150,
    overflow: 'hidden',
    numberOfLines: 1,
    ellipsizeMode: 'tail'
  },
  row: {
    flexDirection: 'column',
    marginLeft: 20
  },
  label: {
    color: '#3E5A47',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14
  },
  value: {
    color: '#3E5A47',
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 5
  },
  editButton: {
    backgroundColor: '#3E5A47',
    borderRadius: 8,
    marginTop: 20,
    marginHorizontal: 20,
    padding: 10
  },
  editButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
    textAlign: 'center'
  }
});

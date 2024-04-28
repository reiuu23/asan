import { useField } from 'formik';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';

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
      <View style={styles.scrap_list__scrap_item}>
        <Image
          style={styles.scrapImage}
          source={require('../assets/img/plasticImg.png')}
        />
        <Text numberOfLines={1} style={styles.scrap_list__scrap_name}>
          {item.scrap_name}
        </Text>
        <View style={styles.scrap_list__scrap_details}>
          <View>
            <View style={styles.scrap_list__scrap_size}>
              <Text style={styles.scrap_list__scrap_size_label}>Size:</Text>
              <Text style={styles.scrap_list__scrap_size_output}>
                {item.scrap_size + ' ' + item.scrap_size_unit}
              </Text>
            </View>
            <View style={styles.scrap_list__scrap_cost}>
              <Text style={styles.scrap_list__scrap_cost_label}>Cost:</Text>
              <Text style={styles.scrap_list__scrap_cost_output}>
                {'PHP' + ' ' + item.scrap_cost + ' / ' + 'kg'}
              </Text>
            </View>
            <View style={styles.scrap_list__scrap_quantity}>
              <Text style={styles.scrap_list__scrap_quantity_label}>
                Quantity:
              </Text>
              <Text style={styles.scrap_list__scrap_quantity_output}>
                {item.scrap_quantity + ' pieces'}
              </Text>
            </View>
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
  }
});

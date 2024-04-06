import {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, FlatList} from 'react-native';

export default function Scraps({scrapCategory, searchQuery}) {
  const scrapList = require('../data/scraps.json');
  const [isEmptyData, setIsEmptyData] = useState(false);
  const [scrollStatus, setScrollStatus] = useState(true);

  useEffect(() => {
    console.log('Empty Data: ', isEmptyData);
    if (isEmptyData) return setScrollStatus(false);
    setScrollStatus(true);
  }, [isEmptyData]);

  const filteredScraps = scrapList.filter(item =>
    item.scrapType.includes(scrapCategory),
  );

  const filteredAndSearchedScraps = filteredScraps.filter(item =>
    item.scrapName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderItem = ({item}) => {
    setIsEmptyData(false);
    return (
      <View style={styles.scrap_list__scrap_item}>
        <Image
          style={styles.scrapImage}
          source={require('../assets/img/plasticImg.png')}
        />
        <Text numberOfLines={1} style={styles.scrap_list__scrap_name}>
          {item.scrapName}
        </Text>
        <View style={styles.scrap_list__scrap_details}>
          <View>
            <View style={styles.scrap_list__scrap_size}>
              <Text style={styles.scrap_list__scrap_size_label}>Size:</Text>
              <Text style={styles.scrap_list__scrap_size_output}>
                {item.scrapSizeVolume + ' ' + item.scrapSizeUnit}
              </Text>
            </View>
            <View style={styles.scrap_list__scrap_cost}>
              <Text style={styles.scrap_list__scrap_cost_label}>Cost:</Text>
              <Text style={styles.scrap_list__scrap_cost_output}>
                {item.scrapCostCurrency +
                  ' ' +
                  item.scrapCostValue +
                  ' / ' +
                  'kg'}
              </Text>
            </View>
            <View style={styles.scrap_list__scrap_quantity}>
              <Text style={styles.scrap_list__scrap_quantity_label}>
                Quantity:
              </Text>
              <Text style={styles.scrap_list__scrap_quantity_output}>
                {item.scrapQuantity + ' pieces'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const onEmptyList = () => {
    setIsEmptyData(true);
    return (
      <Text style={styles.onEmptyData}>There are no current data yet.</Text>
    );
  };

  return (
    <FlatList
      data={filteredAndSearchedScraps}
      renderItem={renderItem}
      keyExtractor={item => item.scrapID.toString()}
      ListEmptyComponent={onEmptyList}
      scrollEnabled={scrollStatus}
      horizontal
    />
  );
}

const styles = StyleSheet.create({
  onEmptyData: {
    textAlign: 'center',
    color: '#3E5A47',
    fontFamily: 'Inter-Medium',
    fontSize: 22,
    marginTop: 30,
    paddingLeft: 50,
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

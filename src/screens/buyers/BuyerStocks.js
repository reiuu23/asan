import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import {
  AssortedMetalCat,
  BackButtonIcon,
  KartonCat,
  MixedPaperCat,
  PlasticCatIcon,
  SelectedPaperCat,
  SolidMetalCat,
  WhitePaperCat
} from '../../components/Icons';
import { AuthContext } from '../../context/AuthContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getWarehouseSummary } from '../../services/scrapdataService';

export default function BuyerStocks({ navigation }) {
  const { session } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const emptyData = require('../../data/analytics.json');

  const fetchSummary = async () => {
    try {
      const response = await getWarehouseSummary(
        session.selectedWarehouse,
        session.token
      );
      setData(response);
    } catch (error) {
      console.log('Error: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.scraps__table_right_value_container}>
      {loading ? (
        <ActivityIndicator size="small" color="#F4F5F4" />
      ) : (
        <Text style={styles.scraps__table_right_column_value}>
          {item.total_weight}
        </Text>
      )}
    </View>
  );

  const onRefresh = () => {
    setRefreshing(true);
    setLoading(true);
    fetchSummary();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <SafeAreaView>
      <View style={styles.top_bar__container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackButtonIcon color={'#3E5A47'} />
        </TouchableOpacity>
        <Text style={styles.top_bar__container_header}>Stocks</Text>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#3E5A47']}
          />
        }>
        <View style={{ padding: 40, marginBottom: 120 }}>
          <View style={styles.scraps__table}>
            <View style={styles.scraps__table_left_column}>
              <Text style={styles.scraps__table_index}>Types</Text>
              <View style={styles.scrapStock__icons}>
                <PlasticCatIcon color={'#3E5A47'} />
                <Text style={styles.scraps__table_scrap_header}>Plastic</Text>
              </View>
              <View style={styles.scrapStock__icons}>
                <WhitePaperCat color={'#3E5A47'} />
                <Text style={styles.scraps__table_scrap_header}>
                  White Paper
                </Text>
              </View>
              <View style={styles.scrapStock__icons}>
                <SelectedPaperCat color={'#3E5A47'} />
                <Text style={styles.scraps__table_scrap_header}>
                  Selected Paper
                </Text>
              </View>
              <View style={styles.scrapStock__icons}>
                <KartonCat color={'#3E5A47'} />
                <Text style={styles.scraps__table_scrap_header}>
                  Karton Paper
                </Text>
              </View>
              <View style={styles.scrapStock__icons}>
                <MixedPaperCat color={'#3E5A47'} />
                <Text style={styles.scraps__table_scrap_header}>
                  Mixed Paper
                </Text>
              </View>
              <View style={styles.scrapStock__icons}>
                <SolidMetalCat color={'#3E5A47'} />
                <Text style={styles.scraps__table_scrap_header}>
                  Solid Metal
                </Text>
              </View>
              <View style={styles.scrapStock__icons}>
                <AssortedMetalCat color={'#3E5A47'} />
                <Text style={styles.scraps__table_scrap_header}>
                  Assorted Metal
                </Text>
              </View>
            </View>
            <View style={styles.scraps__table_right_column}>
              <Text
                style={[
                  styles.scraps__table_index,
                  styles.scraps__table_index_right
                ]}>
                Total Weight (kg)
              </Text>
              {loading ? (
                <ActivityIndicator
                  size="large"
                  color="#F4F5F4"
                  style={{ marginTop: 20 }}
                />
              ) : (
                <FlatList
                  data={
                    data?.weight_stacked_data.length === 0
                      ? emptyData
                      : data?.weight_stacked_data
                  }
                  renderItem={renderItem}
                  scrollEnabled={false}
                  keyExtractor={item => item.scrap_category}
                />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
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
    paddingRight: 20
  },
  top_bar__container_header: {
    alignSelf: 'center',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    fontSize: 26
  },
  scraps__table: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#3E5A47',
    borderRadius: 7
  },
  scraps__table_left_column: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1
  },
  scraps__table_right_column: {
    alignItems: 'center',
    backgroundColor: '#3E5A47',
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    flexDirection: 'column',
    flex: 1.5
  },
  scraps__table_index: {
    color: '#3E5A47',
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginTop: 15,
    marginBottom: 40
  },
  scraps__table_index_right: {
    color: '#F4F5F4'
  },
  scraps__table_scrap_header: {
    color: '#3E5A47',
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    marginTop: 5,
    width: 65,
    textAlign: 'center'
  },
  scrapStock__icons: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    marginBottom: 60
  },
  scraps__table_right_value_container: {
    justifyContent: 'center',
    flexDirection: 'row',
    height: 50,
    marginBottom: 60
  },
  scraps__table_right_column_value: {
    alignSelf: 'center',
    color: '#F4F5F4',
    fontFamily: 'Inter-SemiBold',
    fontSize: 32
  }
});

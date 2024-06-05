import {
  BackHandler,
  Alert,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  TextInput
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { index } from '../../services/warehouseService';
import { useFocusEffect } from '@react-navigation/native';
import React, { useContext, useEffect, useState, useCallback } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import useCustomFetch from '../../hooks/useCustomFetch';

export default function BuyerSelection({ navigation }) {
  const { session, setSession } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Logout',
          'Are you sure you want to log out?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', onPress: () => setSession({ token: null }) }
          ],
          { cancelable: false }
        );
        return true; // Prevent default behavior (navigating back)
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation])
  );

  const retrieveWarehouseList = async () => {
    try {
      const response = await index(session.token);
      setData(response);
      setFilteredData(response);
    } catch (error) {
      console.log('Error retrieving warehouse data: ', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await retrieveWarehouseList();
    setRefreshing(false);
  };

  const handleSearch = query => {
    setSearchQuery(query);
    if (data) {
      const filtered = data.filter(
        warehouse =>
          warehouse.warehouse_name
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          warehouse.warehouse_location
            .toLowerCase()
            .includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    retrieveWarehouseList();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.top_bar__container}>
        <Text style={styles.top_bar__container_header}>Welcome!</Text>
      </View>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by warehouse name or location"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{ marginBottom: 30 }}>
          <LinearGradient
            colors={['#F2F2F2', '#3E5A47']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 0, y: 0.9 }}
            style={{
              height: '100%',
              padding: 30,
              // borderWidth: 1,
              marginBottom: 800
            }}>
            <Text style={styles.main_header}>KINDLY SELECT A WAREHOUSE!</Text>
            {filteredData ? (
              filteredData.length > 0 ? (
                filteredData.map((warehouse, index) => (
                  <TouchableOpacity
                    key={warehouse.warehouse_id}
                    style={styles.button_container}
                    onPress={() => {
                      setSession(prev => ({
                        ...prev,
                        selectedWarehouse: warehouse.warehouse_id,
                        warehouseOwner: warehouse.warehouse_owner_id
                      }));
                      navigation.navigate('Root');
                    }}>
                    <Text style={styles.button_header}>
                      {warehouse.warehouse_name}
                    </Text>
                    <Text style={styles.button_value}>
                      Location: {warehouse.warehouse_location}
                    </Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.no_warehouses_text}>
                  No warehouses found.
                </Text>
              )
            ) : (
              <View style={{ marginTop: 100 }}>
                <ActivityIndicator
                  size={'large'}
                  color={'#3E5A47'}></ActivityIndicator>
              </View>
            )}
          </LinearGradient>
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
  searchBar: {
    borderColor: '#3E5A47',
    borderWidth: 1,
    borderRadius: 5,
    fontFamily: 'Inter-Medium',
    margin: 20,
    paddingVertical: 10,
    paddingLeft: 20
  },
  main_header: {
    color: '#3E5A47',
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20
  },
  button_container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 5,
    height: 120,
    marginBottom: 20
  },
  button_header: {
    color: '#3E5A47',
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 15
  },
  button_value: {
    color: '#3E5A47',
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    textAlign: 'center'
  },
  no_warehouses_text: {
    color: '#3E5A47',
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50
  }
});

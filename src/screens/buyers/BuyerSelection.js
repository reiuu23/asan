import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { index } from '../../services/warehouseService';
import React, { useContext, useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import useCustomFetch from '../../hooks/useCustomFetch';

export default function BuyerSelection({ navigation }) {
  const { session, setSession } = useContext(AuthContext);
  const [data, setData] = useState(null);

  const retrieveWarehouseList = async () => {
    try {
      const response = await index(session.token);
      setData(response);
    } catch (error) {
      console.log('Error retrieving warehouse data: ', error);
    }
  }

  useEffect(() => {
    retrieveWarehouseList();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.top_bar__container}>
        <Text style={styles.top_bar__container_header}>Welcome!</Text>
      </View>
      <ScrollView>
        <View style={{ height: data?.length < 5 ? 800 : 'auto' }}>
          <LinearGradient
            colors={['#F2F2F2', '#3E5A47']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 0, y: 0.9 }}
            style={{
              height: '100%',
              padding: 30,
              marginBottom: 115
            }}>
            <Text style={styles.main_header}>KINDLY SELECT A WAREHOUSE!</Text>
            {data ? (
              data.map((warehouse, index) => (
                <TouchableOpacity
                  key={warehouse.warehouse_id}
                  style={styles.button_container}
                  onPress={() => {
                    setSession(prev => ({
                      ...prev,
                      selectedWarehouse: warehouse.warehouse_id
                    })),
                      navigation.navigate('Root');
                  }}>
                  <Text style={styles.button_header}>
                    Warehouse {index + 1}
                  </Text>
                  <Text style={styles.button_value}>
                    Warehouse Owner: {warehouse.warehouse_name}
                  </Text>
                  <Text style={styles.button_value}>
                    Location: {warehouse.warehouse_location}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <View style={{marginTop: 100}}>
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
  main_header: {
    color: '#3E5A47',
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 30,
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
  }
});

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
import React, { useContext, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { AuthContext } from '../../context/AuthContext';
import useCustomFetch from '../../hooks/useCustomFetch';
import { color } from '@rneui/base';

const temp = [
  {
    warehouse_id: 1001,
    warehouse_name: 'Ligaya Corp',
    warehouse_owner: 'Angus Ligaya',
    warehouse_location: '1197 Pasong Tamo, QC'
  },
  {
    warehouse_id: 1002,
    warehouse_name: 'Angya Corp',
    warehouse_owner: 'Angya Haraya',
    warehouse_location: '9962 Pasong Tamo, QC'
  }
];

console.log(temp.length);

export default function BuyerSelection({ navigation }) {
  const { session, setSession } = useContext(AuthContext);
  const { data, loading, error, fetchData } = useCustomFetch();

  useEffect(() => {
    const endpoint = 'warehouse';
    fetchData(`http://192.168.100.5/rest/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer f7b5b129-7dd1-4366-bd1e-031e03315c32'
      }
    });
  }, [session]);

  useEffect(() => {
    console.log('warehouse data (user selection): ', data);
  }, [data]);

  useEffect(() => {
    console.log('warehouse: ', session);
  }, [session]);

  return (
    <SafeAreaView>
      <View style={styles.top_bar__container}>
        <Text style={styles.top_bar__container_header}>Welcome!</Text>
      </View>
      <ScrollView>
        <View style={{ height: temp.length < 5 ? 800 : 'auto' }}>
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
                    Warehouse Owner: {warehouse.warehouse_owner}
                  </Text>
                  <Text style={styles.button_value}>
                    Location: {warehouse.location}
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

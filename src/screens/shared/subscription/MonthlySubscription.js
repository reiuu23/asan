import React, { useContext } from 'react';
import { FlatList, StyleSheet, View, Text, ScrollView } from 'react-native';
import SubscriptionCard from './SubscriptionCard';
import { AuthContext } from '../../../context/AuthContext';

const basicFeatures = ['Overview Storage', 'Stocks', 'Scrap Category'];

const features = [
  'Overview Storage',
  'Stocks',
  'Scrap Category',
  'Messages & Notification',
  'Account Verification',
  'Reports & Analytics'
];

const MonthlySubscription = ({ navigation }) => {

    const  { subscriptionMode, setSubscriptionMode } = useContext(AuthContext);

  return (
    <>
      <View style={styles.card}>
        <Text style={styles.planName}>Basic</Text>
        <Text style={styles.price}>Free</Text>
        <View style={styles.features}>
          {basicFeatures.map((feature, index) => (
            <Text key={index} style={styles.feature}>
              {feature}
            </Text>
          ))}
        </View>
      </View>
      <FlatList
        data={[
          {
            id: 'monthly',
            planName: 'Trading',
            price: '₱499/month',
            features
          }
        ]}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SubscriptionCard
            planName={item.planName}
            price={item.price}
            features={item.features}
            onPress={() => {
                navigation.navigate('PayPalPayment', { plan: item });
                setSubscriptionMode('Monthly');
            }}
          />
        )}
        contentContainerStyle={styles.container}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
    marginHorizontal: 30,
    marginTop: 30,
  },
  planName: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#3E5A47'
  },
  price: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#3E5A47',
    marginBottom: 10
  },
  features: {
    marginTop: 10
  },
  feature: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#333'
  }
});

export default MonthlySubscription;

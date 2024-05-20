import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SubscriptionCard = ({ planName, features, price, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.planName}>{planName}</Text>
      <Text style={styles.price}>{price}</Text>
      <View style={styles.features}>
        {features.map((feature, index) => (
          <Text key={index} style={styles.feature}>
            {feature}
          </Text>
        ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
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

export default SubscriptionCard;

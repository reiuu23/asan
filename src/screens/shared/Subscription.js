import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { getToken } from '../../services/transactions/authToken';
import React from 'react';

var fetch = require('node-fetch');

getToken().then((token) => {
  fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'PayPal-Request-Id': '7b92603e-77ed-4896-8e78-5dea2050476a',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: 'd9f80740-38f0-11e8-b467-0ed5f89f718b',
          amount: { currency_code: 'USD', value: '100.00' }
        }
      ],
      payment_source: {
        paypal: {
          experience_context: {
            payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
            brand_name: 'EXAMPLE INC',
            locale: 'en-US',
            landing_page: 'LOGIN',
            shipping_preference: 'SET_PROVIDED_ADDRESS',
            user_action: 'PAY_NOW',
            return_url: 'https://example.com/returnUrl',
            cancel_url: 'https://example.com/cancelUrl'
          }
        }
      }
    })
  })
    .then(result => {
      return result.json();
    })
    .then(data => {
      console.log(data);
    });
});





export default function Subscription() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.text}>Plans</Text>
        <TouchableOpacity>
          <Text style={styles.text}>CHECKOUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  main: {
    // padding: 20,
    borderWidth: 1,
    borderColor: 'green',
    flex: 1
  },
  text: {
    textAlign: 'center', 
    marginVertical: 20, 
    fontFamily: 'Inter-Medium', 
    fontSize: 20
  }
});

import {StyleSheet, Text, View} from 'react-native';
import {useContext, useEffect} from 'react';
import {AuthContext} from '../../context/AuthContext';
import React from 'react';

export default function BuyerHome() {
  const {session} = useContext(AuthContext);
  return (
    <View>
      <Text>BuyerHome</Text>
      <Text>Session Token: {JSON.stringify(session)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

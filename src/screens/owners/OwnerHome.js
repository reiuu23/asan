import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';

export default function OwnerHome() {
  const {session} = useContext(AuthContext);
  return (
    <View>
      <Text>OwnerHome</Text>
      <Text>Session Token: {JSON.stringify(session.email)}</Text>
    </View>
  );
}


const styles = StyleSheet.create({});

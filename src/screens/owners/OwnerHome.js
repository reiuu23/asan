import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';

export default function OwnerHome({navigation, route}) {
  const {session} = useContext(AuthContext);
  return (
    <View>
      <Text>OwnerHome</Text>
      <Text>Session Token: {JSON.stringify(session.email)}</Text>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Text>Press Me</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});

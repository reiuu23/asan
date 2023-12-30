import {StyleSheet, Text, View} from 'react-native';
import {useContext, useEffect} from 'react';
import {AuthContext} from '../../context/AuthContext';
import Svg, {Path} from 'react-native-svg';
import {ChatIcon, LitterIcon} from '../../components/Icons';
import React from 'react';

export default function BuyerHome() {
  const {session} = useContext(AuthContext);
  return (
    <View>
      <Text>BuyerHome</Text>
      <Text>Session Token: {JSON.stringify(session)}</Text>
      <ChatIcon></ChatIcon>
      <LitterIcon></LitterIcon>
    </View>
  );
}

const styles = StyleSheet.create({});

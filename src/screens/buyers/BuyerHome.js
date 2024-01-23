import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useContext, useEffect} from 'react';
import {AuthContext} from '../../context/AuthContext';
import Svg, {Path} from 'react-native-svg';
import {
  ChatIcon,
  LitterIcon,
  CartIcon,
  HomeIcon,
  StatsIcon,
} from '../../components/Icons';
import React from 'react';

export default function BuyerHome() {
  const {session} = useContext(AuthContext);
  return (
    <View style={{marginTop: 50}}>
      {/* <TouchableOpacity>
        <LitterIcon></LitterIcon>
      </TouchableOpacity>
      <TouchableOpacity>
        <ChatIcon></ChatIcon>
      </TouchableOpacity>
      <TouchableOpacity>
        <HomeIcon></HomeIcon>
      </TouchableOpacity>
      <TouchableOpacity>
        <CartIcon></CartIcon>
      </TouchableOpacity>
      <TouchableOpacity>
        <StatsIcon></StatsIcon>
      </TouchableOpacity> */}
      <Text>BuyerHome</Text>
      <Text>Session Token: {JSON.stringify(session)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

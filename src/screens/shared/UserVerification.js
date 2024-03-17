import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SidebarAnalytics, SidebarCategories} from '../../components/Icons';

export default function UserVerification() {
  return (
    <View>
      <Text>UserVerification</Text>
      <SidebarCategories></SidebarCategories>
      <SidebarAnalytics></SidebarAnalytics>
    </View>
  );
}

const styles = StyleSheet.create({});

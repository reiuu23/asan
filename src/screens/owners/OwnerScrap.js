import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  BackButtonIcon,
  SearchIconVar,
  SmallPlusIcon,
} from '../../components/Icons';
import {ScrollView} from 'react-native-gesture-handler';
import scraps from '../../data/scraps.json';
import ScrapCat from '../../components/ScrapCat';

export default function OwnerScrap({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top_bar__container}>
        <View style={styles.top_bar_section}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <BackButtonIcon></BackButtonIcon>
          </TouchableOpacity>
          <Text style={styles.top_bar__header}>Scrap</Text>
        </View>
        <View style={styles.top_bar_section}>
          <TouchableOpacity style={styles.top_bar__searchbtn}>
            <SearchIconVar></SearchIconVar>
          </TouchableOpacity>
          <Text style={styles.top_bar__header}>Categories</Text>
        </View>
        <TouchableOpacity style={styles.top_bar_addcat_button}>
          <SmallPlusIcon></SmallPlusIcon>
          <Text style={styles.top_bar_addcat_label}>Add Category</Text>
        </TouchableOpacity>
      </View>
      {/* Main Section */}
      <ScrapCat scraps={scraps} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  top_bar__container: {
    borderBottomWidth: 1,
    borderBottomColor: '#3E5A47',
    paddingLeft: 20,
    paddingRight: 20,
  },
  top_bar_section: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  top_bar__header: {
    color: '#3E5A47',
    fontFamily: 'Inter-SemiBold',
    fontSize: 36,
  },
  top_bar__searchbtn: {
    alignItems: 'center',
    borderColor: '#3E5A47',
    borderRadius: 8,
    borderWidth: 1.5,
    height: 35,
    justifyContent: 'center',
    width: 44,
  },
  top_bar_addcat_button: {
    alignItems: 'center',
    backgroundColor: '#3E5A47',
    borderRadius: 8,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    height: 45,
    marginTop: 12,
    marginBottom: 20,
  },
  top_bar_addcat_label: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
});

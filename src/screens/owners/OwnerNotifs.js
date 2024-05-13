import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React from 'react';
import { BackButtonIcon } from '../../components/Icons';

export default function OwnerNotifs({ navigation }) {
  return (
    <SafeAreaView>
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackButtonIcon color="#3E5A47"></BackButtonIcon>
        </TouchableOpacity>
        <Text style={styles.topbarHeader}>Notifications</Text>
      </View>
      <ScrollView>
        <View style={styles.notificationContainer}>
          <Text style={styles.notifications}>No current notifications.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topbar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 32,
    paddingLeft: 20,
    paddingRight: 20
  },
  topbarHeader: {
    color: '#3E5A47',
    fontFamily: 'Inter-SemiBold',
    fontSize: 36
  },
  notificationContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
  },
  notifications: {
    alignSelf: 'center',
    color: '#3E5A47',
    fontFamily: 'Inter-Medium',
    fontSize: 20,
    marginTop: 40,
  }
});

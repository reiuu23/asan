// Global Styles

import {StyleSheet} from 'react-native';
import { BackButtonIcon } from '../components/Icons';

export const global = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
});

export const analytics = StyleSheet.create({
  stats_top_container: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  stats_tab_container: {},
  stats_header_tab_top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stats_header_tab_text: {
    color: '#3E5A47',
    fontFamily: 'Inter-SemiBold',
    fontSize: 36,
  },
  stats_combo_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  stats_combo_stats: {
    backgroundColor: '#3E5A47',
    borderRadius: 13,
    justifyContent: 'space-evenly',
    width: '47%',
    height: 165,
  },
  stats_combo_stats_label: {
    color: '#F4F5F4',
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    textAlign: 'center',
  },
  stats_combo_icon: {
    alignSelf: 'center',
  },
  stats_combo_stats_value: {
    color: '#F4F5F4',
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    textAlign: 'center',
  },
  stats_bottom_container: {
    flex: 1,
    marginTop: 30,
  },
  stats_bottom_tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25,
    paddingLeft: 20,
  },
  stats_bottom_tabs_label: {
    color: '#3E5A47',
    fontFamily: 'Inter-Bold',
    fontSize: 15,
  },
  stats_bottom_tabs_label_active: {
    color: '#3E5A47',
    fontFamily: 'Inter-Bold',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  stats_scrap_data_container: {
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
  },
  stats_scrap_data: {
    marginTop: 20,
  },
  stats_scrap_data_label: {
    color: '#3E5A47',
    fontFamily: 'Inter-Regular',
    fontSize: 17,
  },
  stats_scrap_data_value: {
    color: '#3E5A47',
    fontFamily: 'Inter-Bold',
    fontSize: 20,
  },
  backButton: {
    marginTop: 10
  }
});

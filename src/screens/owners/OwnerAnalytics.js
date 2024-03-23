import {useMemo, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {analytics, global} from '../../styles/_globalLayout';

import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {BoxIcon, UsersIcon} from '../../components/Icons';
import {Divider} from '@rneui/base';

export default function OwnerAnalytics({navigation, route}) {
  const [isToday, setIsToday] = useState(true);
  const [isThisWeek, setIsThisWeek] = useState(false);

  const todayData = require('../../data/analytics.json');
  const weekData = require('../../data/scrapTotalDate.json');

  return (
    <View style={global.container}>
      <View style={analytics.stats_top_container}>
        <View style={analytics.stats_header_tab}>
          <View style={analytics.stats_header_tab_top}>
            <TouchableOpacity>
              <Text style={analytics.stats_header_tab_text}>-</Text>
            </TouchableOpacity>
            <Text style={analytics.stats_header_tab_text}>Reports</Text>
          </View>
          <React.Fragment>
            <Text
              style={[analytics.stats_header_tab_text, {textAlign: 'right'}]}>
              & Analytics
            </Text>
          </React.Fragment>
        </View>

        <View style={analytics.stats_combo_container}>
          <View style={analytics.stats_combo_stats}>
            <Text style={analytics.stats_combo_stats_label}>
              Total Weight (kg)
            </Text>
            <BoxIcon style={analytics.stats_combo_icon}></BoxIcon>
            <Text style={analytics.stats_combo_stats_value}>209</Text>
          </View>
          <View style={analytics.stats_combo_stats}>
            <Text style={analytics.stats_combo_stats_label}>Buyers</Text>
            <UsersIcon style={analytics.stats_combo_icon}></UsersIcon>
            <Text style={analytics.stats_combo_stats_value}>19</Text>
          </View>
        </View>
      </View>
      <View style={analytics.stats_bottom_container}>
        <View style={analytics.stats_bottom_tabs}>
          <TouchableOpacity
            onPress={() => {
              setIsToday(true);
              setIsThisWeek(false);
            }}>
            <Text
              style={
                isToday
                  ? analytics.stats_bottom_tabs_label_active
                  : analytics.stats_bottom_tabs_label
              }>
              Today
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsToday(false);
              setIsThisWeek(true);
            }}>
            <Text
              style={
                isThisWeek
                  ? analytics.stats_bottom_tabs_label_active
                  : analytics.stats_bottom_tabs_label
              }>
              This Week
            </Text>
          </TouchableOpacity>
        </View>
        <Divider></Divider>
        <ScrollView>
          <View style={analytics.stats_scrap_data_container}>
            {isToday
              ? todayData.map(today => {
                  return (
                    <View
                      style={analytics.stats_scrap_data}
                      key={today.scrap_id}>
                      <Text style={analytics.stats_scrap_data_label}>
                        {today.scrap_category}
                      </Text>
                      <Text style={analytics.stats_scrap_data_value}>
                        {today.scrap_total_weight} kg
                      </Text>
                    </View>
                  );
                })
              : weekData.map((week, index) => {
                  return (
                    <View style={analytics.stats_scrap_data} key={index}>
                      <Text style={analytics.stats_scrap_data_label}>
                        {week.scrap_issued_date}
                      </Text>
                      <Text style={analytics.stats_scrap_data_value}>
                        {week.scrap_total_weight}
                      </Text>
                    </View>
                  );
                })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

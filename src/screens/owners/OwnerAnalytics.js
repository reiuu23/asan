import { useContext, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { analytics, global } from '../../styles/_globalLayout';

import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BackButtonIcon, BoxIcon, UsersIcon } from '../../components/Icons';
import { Divider } from '@rneui/base';
import { AuthContext } from '../../context/AuthContext';

export default function OwnerAnalytics({ navigation, route }) {

  const { session } = useContext(AuthContext);
  const { dataSession } = useContext(AuthContext);

  const [isToday, setIsToday] = useState(true);
  const [isThisWeek, setIsThisWeek] = useState(false);

  return (
    <View style={global.container}>
      <View style={analytics.stats_top_container}>
        <View style={analytics.stats_header_tab}>
          <View style={analytics.stats_header_tab_top}>
            <TouchableOpacity
              style={analytics.backButton}
              onPress={() => navigation.goBack()}>
              <BackButtonIcon color={'#3E5A47'}></BackButtonIcon>
            </TouchableOpacity>
            <Text style={analytics.stats_header_tab_text}>Reports</Text>
          </View>
          <React.Fragment>
            <Text
              style={[analytics.stats_header_tab_text, { textAlign: 'right' }]}>
              & Analytics
            </Text>
          </React.Fragment>
        </View>

        {session.subscription_status === 1 && (
          <View style={analytics.stats_combo_container}>
            <View style={analytics.stats_combo_stats}>
              <Text style={analytics.stats_combo_stats_label}>
                Total Weight (kg)
              </Text>
              <BoxIcon style={analytics.stats_combo_icon}></BoxIcon>
              <Text style={analytics.stats_combo_stats_value}>
                {dataSession?.overall_stocks}
              </Text>
            </View>
            <View style={analytics.stats_combo_stats}>
              <Text style={analytics.stats_combo_stats_label}>Buyers</Text>
              <UsersIcon style={analytics.stats_combo_icon}></UsersIcon>
              <Text style={analytics.stats_combo_stats_value}>
                {dataSession?.total_buyers}
              </Text>
            </View>
          </View>
        )}
      </View>
      {session.subscription_status === 1 ? (
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
              {isToday ? (
                dataSession.today_stacked_data.length !== 0 ? (
                  dataSession?.today_stacked_data.map((today, index) => {
                    return (
                      <View style={analytics.stats_scrap_data} key={index}>
                        <Text style={analytics.stats_scrap_data_label}>
                          {today.scrap_category}
                        </Text>
                        <Text style={analytics.stats_scrap_data_value}>
                          {today.scrap_total_weight} kg
                        </Text>
                      </View>
                    );
                  })
                ) : (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 250
                    }}>
                    <Text
                      style={{
                        width: 250,
                        color: '#3E5A47',
                        fontFamily: 'Inter-Medium',
                        textAlign: 'center'
                      }}>
                      There are no current data for this day, as of now.
                    </Text>
                  </View>
                )
              ) : dataSession.week_stacked_data.length !== 0 ? (
                dataSession?.week_stacked_data.map((week, index) => {
                  return (
                    <View style={analytics.stats_scrap_data} key={index}>
                      <Text style={analytics.stats_scrap_data_label}>
                        {week.day_and_date}
                      </Text>
                      <Text style={analytics.stats_scrap_data_value}>
                        {week.scrap_total_weight} kg
                      </Text>
                    </View>
                  );
                })
              ) : (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 250
                  }}>
                  <Text
                    style={{
                      width: 250,
                      color: '#3E5A47',
                      fontFamily: 'Inter-Medium',
                      textAlign: 'center'
                    }}>
                    There are no current data for this week, as of now.
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      ) : (
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'Inter-Medium',
            color: '#3E5A47',
            padding: 40,
            textAlign: 'center'
          }}>
          Unlock this feature by purchasing the Trading (Premium) Plan
        </Text>
      )}
    </View>
  );
}

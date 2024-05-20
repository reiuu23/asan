import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, { useContext } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { AuthContext } from '../../context/AuthContext';

export default function AboutASAN({ navigation }) {

  const { session } = useContext(AuthContext);
  return (
    <SafeAreaView>
      <View style={styles.top_bar__container}>
        <Text style={styles.top_bar__container_header}>About ASAN</Text>
      </View>
      <ScrollView>
        {session.subscription_status === 0 && (
          <View style={styles.subscriptionBox}>
            <Text style={styles.subscriptionBoxHeader}>
              Unlock All Features Now!
            </Text>
            <TouchableOpacity
              style={styles.availButton}
              onPress={() => navigation.navigate('Subscription')}>
              <Text style={styles.availButtonText}>Avail Premium</Text>
            </TouchableOpacity>
          </View>
        )}
        <LinearGradient
          colors={['#F2F2F2', '#3E5A47']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 0, y: 0.9 }}
          style={{
            height: '100%',
            padding: 30,
            marginBottom: 115
          }}>
          <View style={styles.about_section__header}>
            <Text style={styles.about_section__header_title}>The ASAN App</Text>
            <Text style={styles.about_section__header_content}>
              Effortlessly manage inventory and track scrap collections with
              ASAN App. Gain valuable insights and improve sustainability
              practices for informed business decisions. Simplify your inventory
              management and take your business to the next level.
            </Text>
          </View>
          <View style={styles.about_section__body}>
            <Text style={styles.about_section__body_title}>
              Team Behind ASAN
            </Text>
            <Text style={styles.about_section__body_content}>
              We're a team of fourth-year college students from TUP-Manila
              passionate about sustainability and innovation. Our ASAN App
              simplifies warehouse management and improves stock organization
              for local scrapyards. We thank you for supporting our project!
            </Text>
            <Image
              style={styles.about_section__image}
              source={require('../../assets/img/aboutpic.png')}></Image>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  top_bar__container: {
    backgroundColor: '#3E5A47',
    height: 115,
    justifyContent: 'center',
    paddingTop: 25,
    paddingLeft: 20,
    paddingRight: 20
  },
  top_bar__container_header: {
    alignSelf: 'center',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    fontSize: 26
  },
  about_section__header_title: {
    color: '#365540',
    fontFamily: 'Inter-Bold',
    fontSize: 25,
    textAlign: 'center'
  },
  about_section__header: {
    borderColor: '#3E5A47',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderWidth: 1,
    padding: 20,
    marginBottom: 30
  },
  about_section__header_content: {
    color: '#365540',
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    marginTop: 5,
    marginBottom: 20,
    textAlign: 'justify'
  },
  about_section__body: {
    borderColor: '#3E5A47',
    borderWidth: 1,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    padding: 20
  },
  about_section__body_title: {
    color: '#365540',
    fontFamily: 'Inter-Bold',
    fontSize: 25,
    textAlign: 'center'
  },
  about_section__body_content: {
    color: '#365540',
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    marginTop: 5,
    marginBottom: 20,
    textAlign: 'justify'
  },
  about_section__image: {
    alignSelf: 'center',
    marginBottom: 20,
    resizeMode: 'contain',
    width: '100%'
  },
  subscriptionBox: {
    alignItems: 'center',
    backgroundColor: '#5A7C65',
    borderRadius: 20,
    gap: 10,
    height: 118,
    justifyContent: 'center',
    marginTop: 30,
    marginHorizontal: 30,
    elevation: 10
  },
  subscriptionBoxHeader: {
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
    fontSize: 20
  },
  availButton: {
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
    elevation: 10
  },
  availButtonText: {
    color: '#3A493F',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16
  }
});

import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Button, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../context/AuthContext';
import { updateSubscriptionStatus } from '../../../services/subscriptionService';
import { sessionUpdate } from '../../../services/authService';
import Toast from 'react-native-toast-message';

const PayPalPaymentScreen = ({ route }) => {
  const { plan } = route.params;
  const { subscriptionMode, session, setSession } = useContext(AuthContext);
  const navigation = useNavigation();
  const [retryCount, setRetryCount] = useState(0);

  const errorToast = errorMsg => {
    Toast.show({
      type: 'errorToast',
      props: { error_message: errorMsg }
    });
  };

  const successToast = successMsg => {
    Toast.show({
      type: 'successToast',
      props: { success_message: successMsg }
    });
  };

  const updateSubscription = async () => {
    try {
      const data = {
        subscription_status: 1,
        subscription_mode: subscriptionMode
      };
      const response = await updateSubscriptionStatus(
        session.profile.id,
        data,
        session.token
      );
      successToast(
        'Your subscripition has successfully been applied to your account! Thank you for availing for our premium features!'
      );
      sessionRefetch();
      navigation.navigate('Home');
      return response;
    } catch (error) {
      errorToast(
        'Encountered an error while updating your subscription. If your subscription is paid and still not applied. Please contact the support.'
      );
    }
  };

  const sessionRefetch = async () => {
    try {
      const response = await sessionUpdate(session.profile.id, session.token);
      setSession(prev => ({
        ...prev,
        profile: response?.user,
        subscription_status: response?.subscription.subscription_status,
        token: response?.token
      }));
      return response;
    } catch (error) {
      errorToast(
        'Encountered an error while trying to update the session. Please try again later'
      );
    }
  };

  const handleWebViewMessage = event => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.status === 'success') {
      successToast(
        'We have received your payment! Thank you for availing our Premium Trading Plan!'
      );
      updateSubscription();
    } else if (data.status === 'error') {
      errorToast(
        'We encountered an error while opening the payment processing.'
      );
      setRetryCount(retryCount + 1); // Increment retry count
    }
  };

  const handleRetry = () => {
    setRetryCount(0); // Reset retry count
  };

  return (
    <SafeAreaView style={styles.container}>
      {retryCount > 0 && <Button title="Retry" onPress={handleRetry} />}
      <WebView
        source={{
          uri: `https://payments.sseoll.online?plan=${plan.id}`
        }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onError={() => {
          setRetryCount(retryCount + 1); // Increment retry count
        }}
        onMessage={handleWebViewMessage}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  webview: {
    flex: 1
  }
});

export default PayPalPaymentScreen;

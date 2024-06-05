import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/axiosInstance';

export default function PasswordReset() {
  const [loading, setLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    fetchCSRFToken(); // Fetch CSRF token when component mounts
  }, []);

  const fetchCSRFToken = async () => {
    try {
      const response = await axiosInstance.get('/csrf-cookie');
      setCsrfToken(response.csrfToken);
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();

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

  const onSubmit = async data => {
    const { email } = data;
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        '/forgot-password',
        {
          email
        },
        {
          headers: {
            'Accept': 'application/json',
            'X-CSRF-TOKEN': csrfToken // Include CSRF token in headers
          }
        }
      );
      setLoading(false);
      console.log(response);
      successToast(`${response.message}`);
    } catch (error) {
      setLoading(false);
      errorToast(`Oops, it seems the email is not yet registered on our system as we cannot fid any matching records with it.`);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.header}>Reset Password</Text>
      <Text style={styles.subHeader}>
        Enter the email that is associated with your account and we'll provide
        you a password reset link.
      </Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.formInput}
            placeholder="E-mail"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={styles.formSubmitBtn}>
        {!loading ? (
          <Text style={styles.formSubmitBtnText}>Send Request</Text>
        ) : (
          <ActivityIndicator
            size={'large'}
            color={'#FFFFFF'}></ActivityIndicator>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 40,
    paddingHorizontal: 20
  },
  header: {
    color: '#3E5A47',
    fontFamily: 'Inter-SemiBold',
    fontSize: 24
  },
  subHeader: {
    color: '#3E5A47',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    marginTop: 40,
    textAlign: 'justify'
  },
  formInput: {
    color: '#3E5A47',
    borderColor: '#53785F',
    borderRadius: 10,
    borderWidth: 1.5,
    fontFamily: 'Inter-Medium',
    paddingHorizontal: 20,
    marginTop: 20
  },
  formSubmitBtn: {
    alignItems: 'center',
    backgroundColor: '#3E5A47',
    borderRadius: 10,
    elevation: 10,
    padding: 20,
    marginTop: 20
  },
  formCancelBtn: {
    alignItems: 'center',
    backgroundColor: '#F4F5F4',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3E5A47',
    elevation: 10,
    padding: 20,
    marginTop: 20,
    marginBottom: 20
  },
  formSubmitBtnText: {
    color: '#F4F5F4',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16
  }
});

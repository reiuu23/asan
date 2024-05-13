import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  ActivityIndicator,
  ScrollView,
  Alert
} from 'react-native';
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { BackButtonIcon, EditIcon, PencilIcon } from '../../components/Icons';
import { Formik } from 'formik';
import { validationSchema } from '../../utils/FormValidation';
import { RFValue } from 'react-native-responsive-fontsize';
import { AuthContext } from '../../context/AuthContext';
import { readImageAsBase64 } from '../../utils/imageReaderBase64';
import useCustomFetch from '../../hooks/useCustomFetch';
import ImagePicker from 'react-native-image-crop-picker';

export default function OwnerProfile({ navigation }) {

  const { session, setSession, sessionUpdate } = useContext(AuthContext);
  const { data, loading, error, fetchData } = useCustomFetch();

  const [image, setImage] = useState(session.userImage);
  const [newImage, setNewImage] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const fetchProfile = () => {
    fetchData(`https://ls2tngnk9ytt.share.zrok.io/owners`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        UPID: session.token,
        Authorization: 'Bearer f7b5b129-7dd1-4366-bd1e-031e03315c32'
      },
      body: JSON.stringify({ buyer_id: session.token })
    });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (data) {
      const { full_name, company, location, email, image } = data[0];
      setProfileData({
        full_name: full_name,
        scapyard_name: scrapyard_name,
        location: location,
        email: email
      });
      setImage(image);
      setSession(currentVal => ({ ...currentVal, userImage: image }));
    }
  }, [data]);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async payload => {
    console.log('payload on submit: ', payload);
    try {
      const url = 'https://ls2tngnk9ytt.share.zrok.io/buyers/update';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          UPID: session.token,
          Authorization: 'Bearer f7b5b129-7dd1-4366-bd1e-031e03315c32'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      sessionUpdate();

      if (data === true) {
        Alert.alert(
          'Update Status',
          'Your profile has been updated successfully!',
          [
            {
              text: 'Okay'
            }
          ]
        );
      } else {
        Alert.alert(
          'Update Status',
          'No changes have been made on your profile because your profile details exists already.',
          [
            {
              text: 'Understood'
            }
          ]
        );
      }
    } catch {
      console.error('Error:', error);
    }
  };

  const validateUpdate = async data => {
    // Filter blank values on the form update.
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== '')
    );

    if (newImage) {
      const base64img = await readImageAsBase64(image);
      const payload = { ...filteredData, image: base64img };
      console.log(data);
      onSubmit(payload);
    } else {
      const payload = filteredData;
      console.log(payload);
      onSubmit(payload);
    }
  };

  const pickImage = async () => {
    try {
      const croppedImage = await ImagePicker.openPicker({
        width: 200,
        height: 200,
        cropping: true
      });
      setNewImage(true);
      setImage(croppedImage.path);
      console.log(croppedImage);
    } catch (error) {
      console.log('Error selecting image:', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.header_buttons}>
            <Pressable onPress={() => navigation.goBack()}>
              <BackButtonIcon color={'#F4F5F4'}></BackButtonIcon>
            </Pressable>
            <Text style={styles.header_buttons_text}>Edit Profile</Text>
            <EditIcon></EditIcon>
          </View>

          <View style={styles.header_select_pic}>
            <TouchableOpacity onPress={pickImage}>
              {!loading ? (
                image ? (
                  <Image
                    key={new Date().getTime()}
                    style={styles.header_image}
                    source={{
                      uri: image
                    }}></Image>
                ) : (
                  <Image
                    style={styles.header_image}
                    source={require('../../assets/img/placeholderUser.jpg')}></Image>
                )
              ) : (
                <View style={styles.header_load_icon}>
                  <ActivityIndicator size="large" color="white" />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {session.profile ? (
          <View style={{ paddingLeft: 10, paddingRight: 10, flex: 1 }}>
            <Text style={styles.formInputHeader}>Full Name</Text>
            <Controller
              control={control}
              defaultValue={session.profile ? session.profile.fullName : ''} // Set defaultValue to profileData.full_name if available
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.formInput}
                  placeholder="Full Name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value} // Use value from the field object
                />
              )}
              name="full_name"
            />

            <Text style={styles.formInputHeader}>Company</Text>
            <Controller
              control={control}
              defaultValue={session.profile ? session.profile.company : ''}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.formInput}
                  placeholder="Company"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="company"
            />

            <Text style={styles.formInputHeader}>Location</Text>
            <Controller
              control={control}
              defaultValue={session.profile ? session.profile.location : ''}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.formInput}
                  placeholder="Location"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="location"
            />

            <Text style={styles.formInputHeader}>Email</Text>
            <Controller
              control={control}
              defaultValue={session.profile ? session.profile.email : ''}
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

            <Text style={styles.formInputHeader}>Password</Text>
            <Controller
              control={control}
              defaultValue={''}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  secureTextEntry
                  style={styles.formInput}
                  placeholder="Enter a new password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="password"
            />
          </View>
        ) : (
          <ActivityIndicator
            size={'large'}
            color={'#3E5A47'}></ActivityIndicator>
        )}

        {/* Form Footer */}
        <View style={styles.footerContainer}>
          <TouchableOpacity
            onPress={handleSubmit(validateUpdate)}
            style={styles.formSubmitBtn}>
            <Text style={styles.formSubmitBtnText}>Update Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Are you sure?',
                'You have unsaved changes, would you like to cancel?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => {}
                  },
                  { text: 'Yes', onPress: () => navigation.goBack() }
                ]
              );
            }}
            style={styles.formCancelBtn}>
            <Text style={styles.formCancelBtnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: '#3E5A47',
    flex: 1,
    marginBottom: 30,
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30
  },
  header_buttons: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  header_buttons_text: {
    fontFamily: 'Inter-Medium',
    fontSize: 20,
    color: '#F4F5F4'
  },
  header_select_pic: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    marginTop: 35
  },
  header_image: {
    width: '100%',
    height: '100%',
    borderRadius: 50
  },
  header_edit_icon: {
    position: 'absolute',
    left: 35,
    top: 35
  },
  header_load_icon: {
    borderRadius: 50,
    position: 'absolute',
    left: 33,
    top: 30
  },
  registerHeader: {
    alignSelf: 'center',
    color: '#3E5A47',
    flexWrap: 'wrap',
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    marginTop: 50
  },
  loginSubHeader: {
    color: '#3E5A47',
    flexWrap: 'wrap',
    fontFamily: 'Inter-Medium',
    fontSize: RFValue(20),
    marginTop: 10
    // width: 290,
  },
  formContainer: {
    justifyContent: 'flex-end'
  },
  formInputHeader: {
    color: '#95B6A0',
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    paddingLeft: 10
  },
  formInput: {
    borderColor: '#3E5A47',
    borderRadius: 10,
    borderBottomWidth: 1,
    color: '#3E5A47',
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 20,
    marginBottom: 20
  },
  formOptionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20
  },
  checkBoxContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  checkBoxText: {
    color: '#5D7365',
    fontFamily: 'Inter-Bold',
    fontSize: RFValue(14),
    marginBottom: 3
  },
  forgotPwText: {
    color: '#F4F5F4',
    fontFamily: 'Inter-Bold',
    fontSize: RFValue(14),
    textDecorationLine: 'underline',
    marginBottom: 3
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
    fontSize: RFValue(16)
  },
  formCancelBtnText: {
    color: '#3E5A47',
    fontFamily: 'Inter-SemiBold',
    fontSize: RFValue(16)
  },
  formErrorText: {
    fontFamily: 'Inter-Medium',
    color: 'red',
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 5
  },
  footerContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10
  },
  footerHelpContainer: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    padding: 10,
    marginTop: 30,
    marginBottom: 30
  },
  footerHeaderText: {
    color: '#F4F5F4',
    fontFamily: 'Inter-Bold',
    fontSize: RFValue(14)
  },
  signInBtnText: {
    color: '#95B6A0',
    fontFamily: 'Inter-Bold',
    fontSize: RFValue(14),
    textDecorationLine: 'underline'
  }
});

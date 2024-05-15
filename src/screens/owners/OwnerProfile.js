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
import React, { useContext, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { BackButtonIcon, EditIcon } from '../../components/Icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { AuthContext } from '../../context/AuthContext';
import useCustomFetch from '../../hooks/useCustomFetch';
import ImagePicker from 'react-native-image-crop-picker';
import { updateProfile } from '../../services/authService';

export default function OwnerProfile({ navigation }) {

  const { session, setSession } = useContext(AuthContext);
  const { data, loading, error, fetchData } = useCustomFetch();

  const [image, setImage] = useState(null);
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

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    setImage(session.profile.profile_image);
  }, [session]);

  const onSubmit = async data => {
    try {

      console.log("submitted data: ", data);
      const formData = new FormData();

      console.log("last name: ", data.last_name);
      if (session.profile.last_name !== data.last_name) {
        formData.append('last_name', data.last_name);
      }

      if (session.profile.first_name !== data.first_name) {
        formData.append('first_name', data.first_name);
      }

      if (session.profile.middle_initial !== data.middle_initial) {
        formData.append('middle_initial', data.middle_initial);
      }

      console.log("session affiliation: ", session.profile.affiliation);
      console.log("data affiliation: ", data.affiliation);
      
      if (session.profile.affiliation !== data.affiliation) {
        formData.append('affiliation', data.affiliation);
      }

      if (session.profile.username !== data.username) {
        formData.append('username', data.username);
      }

      if (session.profile.email !== data.email) {
        formData.append('email', data.email);
      }

      if (data.password) {
        formData.append('password', data.password);
      }

      if (newImage) {
        const filename = image.path.split('/').pop();

        formData.append('profile_image', {
          uri: image.path,
          type: image.mime,
          name: filename
        });
      }

      const response = await updateProfile(
        formData,
        session.profile.id,
        session.token
      );

      // Set New Session

      setSession(prevSession => ({
        ...prevSession,
        userId: response.user.id,
        userImage: response.user.profile_image,
        userType: response.user.user_type,
        fullName: response.user.fullname,
        firstName: response.user.first_name,
        verificationStatus: response.user.verification_status,
        profile: response.user
      }));

      // Handle success response
      Alert.alert(
        'Profile Update Status',
        `You have successfully updated your profile!`,
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Home');
            }
          }
        ]
      );

      return response;
    } catch (error) {
      Alert.alert(
        'Oops',
        `An error occurred while updating your profile. Please try again later.`
      );
    }
  };

  const handleSelectImage = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      multiple: false,
      cropping: true,
      mediaType: 'photo'
    })
      .then(image => {
        console.log('selected image: ', image);
        setImage(image);
        setNewImage(image);
      })
      .catch(error => {
        console.log('ImagePicker Error: ', error);
      });
  };

  const handleOpenCamera = () => {
    ImagePicker.openCamera({
      width: 200,
      height: 200,
      multiple: false,
      cropping: true,
      mediaType: 'photo'
    })
      .then(image => {
        console.log('camera image: ', image);
        setImage(image);
        setNewImage(image);
      })
      .catch(error => {
        console.log('Camera Error: ', error);
      });
  };

  const handleNewUserPic = () => {
    Alert.alert(
      'Upload a new photo?',
      'Please select which option you would like for your new profile photo.',
      [
        {
          text: 'Upload Photo',
          onPress: () => handleSelectImage(),
          style: 'cancel'
        },
        {
          text: 'Use Camera',
          onPress: () => handleOpenCamera(),
        },
        {
          text: 'Cancel',
          onPress: () => {
            Alert.alert('Cancelled', 'You have successfully cancelled uploading a new profile photo.')
          }
        }
      ]
    );
  }

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
            <TouchableOpacity onPress={handleNewUserPic}>
              {!loading ? (
                image ? (
                  <Image
                    key={new Date().getTime()}
                    style={styles.header_image}
                    source={{
                      uri: !image.path ? image : image.path
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
            <Text style={styles.formInputHeader}>Last Name</Text>
            <Controller
              control={control}
              defaultValue={session.profile ? session.profile.last_name : ''}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.formInput}
                  placeholder="Last Name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="last_name"
            />

            <Text style={styles.formInputHeader}>First Name</Text>
            <Controller
              control={control}
              defaultValue={session.profile ? session.profile.first_name : ''}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.formInput}
                  placeholder="First Name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="first_name"
            />

            <Text style={styles.formInputHeader}>
              Middle Initial (optional)
            </Text>
            <Controller
              control={control}
              defaultValue={
                session.profile ? session.profile.middle_initial : ''
              }
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.formInput}
                  placeholder="Middle Initial"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="middle_initial"
            />

            <Text style={styles.formInputHeader}>Scrapyard Name</Text>
            <Controller
              control={control}
              defaultValue={session.profile ? session.profile.affiliation : ''}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.formInput}
                  placeholder="Company"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="affiliation"
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

            <Text style={styles.formInputHeader}>Username</Text>
            <Controller
              control={control}
              defaultValue={
                session.profile ? session.profile.username : ''
              }
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.formInput}
                  placeholder="Full Name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="username"
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
            onPress={handleSubmit(onSubmit)}
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

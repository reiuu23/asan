import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Button
} from 'react-native';
import {
  BackButtonIcon,
  CameraIcon,
  CheckIcon,
  IdentityIcon,
  LocationIcon,
  ManIcon,
  PlusIcon,
  SmallPlusIcon
} from '../../components/Icons';
import { SelectList } from 'react-native-dropdown-select-list';
import { Calendar } from 'react-native-calendars';
import { MAPBOX_ACCESS_TOKEN, MAPBOX_STKN } from '../../../env';
import MapboxGL from '@rnmapbox/maps';
import PagerView from 'react-native-pager-view';
import DashedLine from '../../components/DashedLine';
import ImagePicker from 'react-native-image-crop-picker';
import ModalCalendar from '../../components/ModalCalendar';
import Toast from 'react-native-toast-message';
import { sessionUpdate } from '../../services/authService';
import { requestVerification } from '../../services/authService';
import { AuthContext } from '../../context/AuthContext';
import DatePicker from 'react-native-date-picker';

MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);

const MAPBOX_TOKEN = MAPBOX_STKN;

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

const UserVerification = ({ navigation }) => {
  const [activeIcon, setActiveIcon] = useState({
    stepOne: false,
    stepTwo: false,
    stepThree: false
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [imageSource, setImageSource] = useState(null);
  const mapRef = useRef(null);
  const pagerRef = useRef(null);

  const [selected, setSelected] = React.useState('');
  const [idImage, setIdImage] = useState(null);

  const [verificationRequest, setVerificationRequest] = useState(null);

  const steps = ['Personal Info', 'Select Location', 'Review'];

  const handleBack = () => {
    const prevPage = currentPage > 0 ? currentPage - 1 : 0;
    pagerRef.current.setPage(prevPage);
    setCurrentPage(prevPage);
  };

  const handleNext = () => {
    const nextPage =
      currentPage < steps.length - 1 ? currentPage + 1 : currentPage;
    pagerRef.current.setPage(nextPage);
    setCurrentPage(nextPage);
  };

  const onPageSelected = e => {
    setCurrentPage(e.nativeEvent.position);
  };

  useEffect(() => {
    console.log('Updated request: ', verificationRequest);
  }, [verificationRequest]);

  const Page1 = () => {
    const [profileImage, setProfileImage] = useState(null);

    const handleSelectImage = () => {
      ImagePicker.openPicker({
        width: 200,
        height: 200,
        multiple: false,
        cropping: true,
        mediaType: 'photo'
      })
        .then(image => {
          setProfileImage(image);
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
          setProfileImage(image);
        })
        .catch(error => {
          console.log('ImagePicker Error: ', error);
        });
    };

    const validateFirstStep = () => {
      if (profileImage) {
        setActiveIcon({
          ...activeIcon,
          stepOne: true
        });

        handleNext();
      } else {
        errorToast('Oops!, You have not uploaded a photo yet.');
      }
    };

    return (
      <>
        <ScrollView>
          <View style={styles.page1}>
            <View
              style={{
                backgroundColor: '#D9D9D9',
                padding: 15,
                alignItems: 'center'
              }}>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 12,
                  textAlign: 'left',
                  color: 'black',
                  backgroundColor: '#D9D9D9'
                }}>
                NOTE:{' '}
                <Text style={{ fontWeight: '400' }}>
                  Allowed documents: .jpg and .png with a 100 MB maximum file
                  size only.
                </Text>
              </Text>
            </View>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              {profileImage ? (
                <Image
                  source={{
                    uri:
                      profileImage.path ||
                      verificationRequest.verificationImage.path
                  }}
                  style={{
                    width: 200,
                    height: 200,
                    borderColor: '#3E5A47',
                    borderWidth: 1
                  }}
                />
              ) : (
                <Image
                  source={require('../../assets/img/placeholderUser.jpg')}
                  style={{
                    width: 200,
                    height: 200,
                    borderColor: '#3E5A47',
                    borderWidth: 1
                  }}
                />
              )}
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-around',
                marginTop: 20,
                gap: 10
              }}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  padding: 20,
                  borderWidth: 1,
                  borderStyle: 'dashed',
                  borderColor: '#3E5A47',
                  borderRadius: 13,
                  flexDirection: 'row',
                  gap: 20
                }}
                onPress={handleOpenCamera}>
                <CameraIcon color={'#3E5A47'} />
                <Text style={{ fontFamily: 'Inter-Medium', color: '#3E5A47' }}>
                  Take Photo
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Inter-Medium',
                  color: '#3E5A47'
                }}>
                or
              </Text>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  padding: 20,
                  borderWidth: 1,
                  borderStyle: 'dashed',
                  borderColor: '#3E5A47',
                  borderRadius: 13,
                  flexDirection: 'row',
                  gap: 20
                }}
                onPress={handleSelectImage}>
                <PlusIcon color={'#3E5A47'} />
                <Text style={{ fontFamily: 'Inter-Medium', color: '#3E5A47' }}>
                  Upload Photo
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={{
              paddingVertical: 25,
              backgroundColor: '#3E5A47',
              borderRadius: 13,
              alignItems: 'center',
              marginBottom: 40
            }}
            onPress={() => {
              setVerificationRequest({ verification_image: profileImage });
              validateFirstStep();
            }}>
            <Text
              style={{
                fontFamily: 'Inter-Regular',
                fontSize: 20,
                color: '#FFFFFF'
              }}>
              Proceed to Identity Section
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </>
    );
  };

  const Page2 = () => {
    console.log('Current Verification Data: ', verificationRequest);

    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [datePreview, setDatePreview] = useState(null);
    const [open, setOpen] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [idType, setIdType] = useState(null);
    const [idImage, setIdImage] = useState(null);

    const handleDateSelect = date => {
      setDateOfBirth(date);
    };

    const validateSecondStep = () => {
      if (!dateOfBirth || !idType || !idImage) {
        errorToast('Oops!, You have not completed the required fields.');
      } else {
        setActiveIcon({
          ...activeIcon,
          stepTwo: true
        });
        setVerificationRequest(prevStep => ({
          ...prevStep,
          date_of_birth: datePreview,
          id_type: idType,
          id_image: idImage
        }));
        handleNext();
      }
    };

    const handleOpenCameraForID = () => {
      ImagePicker.openCamera({
        width: 500,
        height: 500,
        multiple: false,
        cropping: true,
        mediaType: 'photo'
      })
        .then(image => {
          setIdImage(image);
        })
        .catch(error => {
          console.log('Camera Error: ', error);
        });
    };

    const data = require('../../data/validID.json');

    return (
      <>
        <View style={{ flex: 5, paddingHorizontal: 20 }}>
          <Text
            style={{
              marginVertical: 10,
              fontFamily: 'Inter-Medium',
              fontSize: 12,
              textAlign: 'left',
              color: 'black',
              backgroundColor: '#D9D9D9',
              padding: 20,
              marginVertical: 40
            }}>
            Note: Your proof of identity should be clear and show your
            birthdate.
          </Text>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: '#3E5A47',
              borderStyle: 'dashed',
              borderRadius: 10,
              paddingVertical: 12,
              paddingHorizontal: 20,
              marginVertical: 20
            }}
            onPress={() => setOpen(true)}>
            {datePreview ? (
              <Text style={{ fontFamily: 'Inter-Medium', color: '#3E5A47' }}>
                Selected Date of Birth: {datePreview}
              </Text>
            ) : (
              <Text style={{ fontFamily: 'Inter-Medium', color: '#3E5A47' }}>
                Select your Date of Birth *
              </Text>
            )}
          </TouchableOpacity>
          <DatePicker
            modal
            mode="date"
            locale='en'
            open={open}
            date={dateOfBirth}
            onConfirm={date => {
              setOpen(false);
              const formattedDate = date.toLocaleDateString('en-CA');
              console.log('selected date: ', formattedDate);
              setDateOfBirth(date);
              setDatePreview(formattedDate);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <SelectList
            placeholder="Kindly Select an ID Type *"
            setSelected={val => setIdType(val)}
            data={data}
            save="value"
            fontFamily="Inter-Medium"
            boxStyles={{ borderStyle: 'dashed' }}
            inputStyles={{ color: '#3E5A47' }}
            dropdownStyles={{ height: 220 }}
            dropdownTextStyles={{ color: '#3E5A47' }}
          />
          <Text
            style={{
              marginVertical: 10,
              fontFamily: 'Inter-SemiBold',
              fontSize: 14,
              textAlign: 'center',
              color: '#3E5A47',
              marginVertical: 40
            }}>
            UPLOAD A PHOTO OF SELECTED ID TYPE
          </Text>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              padding: 20,
              borderWidth: 1,
              borderStyle: 'dashed',
              borderColor: '#3E5A47',
              borderRadius: 13,
              flexDirection: 'row',
              gap: 20
            }}
            onPress={handleOpenCameraForID}>
            <CameraIcon color={'#3E5A47'} />
            <Text style={{ fontFamily: 'Inter-Medium', color: '#3E5A47' }}>
              {idImage ? 'Photo Uploaded' : 'Take Photo'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{
              paddingVertical: 25,
              backgroundColor: '#3E5A47',
              borderRadius: 13,
              alignItems: 'center',
              marginTop: 5
            }}
            onPress={() => {
              validateSecondStep();
            }}>
            <Text
              style={{
                fontFamily: 'Inter-Regular',
                fontSize: 20,
                color: '#FFFFFF'
              }}>
              Proceed to Location Section
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const Page3 = () => {
    const [address, setAddress] = useState('');
    const { session, setSession } = useContext(AuthContext);

    const sessionRefetch = async () => {
      try {
        const response = await sessionUpdate(session.profile.id, session.token);
        setSession(prev => ({
          ...prev,
          profile: response?.user,
          verificationStatus: response?.user.verification_status,
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

    const handleSubmit = () => {
      Alert.alert(
        'Are you sure?',
        "Confrm your changes and once you're done you may select 'submit'.",
        [
          {
            text: 'Submit',
            onPress: () => {
              console.log("submitted address: ", address);
              onVerifySubmit(address);
            }
          },
          {
            text: 'Cancel',
            onPress: () => {
              console.log('Cancelled!');
            }
          }
        ]
      );
    };

    const onVerifySubmit = async (address) => {
      try {
        const formData = new FormData();

        formData.append('date_of_birth', verificationRequest.date_of_birth);
        formData.append('id_address', address);
        formData.append('id_type', verificationRequest.id_type);
        formData.append('verification_status', 1);

        const idFilename = verificationRequest.id_image.path.split('/').pop();

        formData.append('id_image', {
          uri: verificationRequest.id_image.path,
          type: verificationRequest.id_image.mime,
          name: idFilename
        });

        const verifyIdFilename = verificationRequest.verification_image.path
          .split('/')
          .pop();

        formData.append('verification_image', {
          uri: verificationRequest.verification_image.path,
          type: verificationRequest.verification_image.mime,
          name: verifyIdFilename
        });

        const response = await requestVerification(
          formData,
          session.userId,
          session.token
        );
        successToast(
          'You have successfully requested your account verification, please wait for updates regarding your account status!'
        );
        setActiveIcon({
          ...activeIcon,
          stepThree: true
        });
        sessionRefetch();
        navigation.navigate('Home');
        return response;
      } catch (error) {
        errorToast(
          'Verifiication unsuccessful, the client/server encountered an error while sending your verification application, please try again later!'
        );
      }
    };

    return (
      <View style={styles.page3}>
        <View style={{ height: '80%' }}>
          <MapboxPage address={address} setAddress={setAddress} />
        </View>
        <TouchableOpacity
          style={{
            paddingVertical: 25,
            backgroundColor: '#3E5A47',
            borderRadius: 13,
            alignItems: 'center'
          }}
          onPress={handleSubmit}>
          <Text
            style={{
              fontFamily: 'Inter-Regular',
              fontSize: 20,
              color: '#FFFFFF'
            }}>
            Complete Verification
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const MapboxPage = React.memo(({ address, setAddress }) => {
    const [markerCoordinate, setMarkerCoordinate] = useState([
      121.0274, 14.5547
    ]);

    useEffect(() => {
      if (markerCoordinate) {
        fetchAddress(markerCoordinate);
      }
    }, [markerCoordinate]);

    const fetchAddress = async coordinates => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?access_token=${MAPBOX_TOKEN}`
        );
        const data = await response.json();
        if (data && data.features && data.features.length > 0) {
          console.log("selected location:", data.features[0].place_name);
          setAddress(data.features[0].place_name);
        }
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    };

    const handleAddressChange = text => {
      setAddress(text);
    };

    const handlePress = async event => {
      const {
        geometry: { coordinates }
      } = event;
      setMarkerCoordinate(coordinates);
    };

    return (
      <View
        style={{
          padding: 20,
          backgroundColor: '#E8E6E6',
          borderRadius: 16,
          height: '100%'
        }}>
        <Text
          style={{
            fontFamily: 'Inter-Regular',
            color: '#3E5A47',
            textAlign: 'center',
            marginBottom: 10
          }}>
          DROP A PIN TO LOCATE YOUR ADDRESS
        </Text>
        <MapboxGL.MapView
          style={{ flex: 1 }}
          onPress={handlePress}
          ref={mapRef}>
          <MapboxGL.Camera
            defaultSettings={{
              centerCoordinate: [121.0223, 14.5547],
              zoomLevel: 10
            }}
          />
          {markerCoordinate && (
            <MapboxGL.PointAnnotation
              id="marker"
              coordinate={markerCoordinate}
              title="Selected Location">
              <MapboxGL.Callout title="Selected Location" />
            </MapboxGL.PointAnnotation>
          )}
        </MapboxGL.MapView>
        <Text
          style={{
            marginVertical: 10,
            fontFamily: 'Inter-Medium',
            fontSize: 12,
            textAlign: 'center'
          }}>
          Note: You can also use the address box below to input your address
          manually.
        </Text>
        <TextInput
          value={address}
          onChangeText={handleAddressChange}
          placeholder="Enter address"
          style={styles.input}
        />
      </View>
    );
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 50,
      paddingHorizontal: 20
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    title: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 25,
      color: '#3E5A47'
    },
    iconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      marginBottom: 20
    },
    pager: {
      flex: 1
    },
    page: {
      borderWidth: 1,
      height: '97%'
    },
    page1: {
      paddingHorizontal: 30,
      paddingVertical: 20
    },
    page3: {
      flex: 1,
      paddingVertical: 10,
      justifyContent: 'space-evenly'
    },
    input: {
      marginBottom: 10,
      borderWidth: 1,
      borderRadius: 16,
      borderStyle: 'dotted',
      borderColor: '#3E5A47',
      color: '#3E5A47',
      fontFamily: 'Inter-Medium',
      padding: 10,
      width: '100%'
    },
    button: {
      paddingVertical: 25,
      backgroundColor: '#3E5A47',
      borderRadius: 13,
      alignItems: 'center',
      marginTop: 20
    },
    buttonText: {
      fontFamily: 'Inter-Regular',
      fontSize: 20,
      color: '#FFFFFF'
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackButtonIcon color={'#3E5A47'} />
        </TouchableOpacity>
        <Text style={styles.title}>Account Verification</Text>
      </View>
      <View style={styles.iconContainer}>
        <View>
          {activeIcon.stepOne ? (
            <CheckIcon color={'#3E5A47'} />
          ) : (
            <ManIcon color={'#3E5A47'} />
          )}
          <Text
            style={{
              position: 'absolute',
              width: 60,
              bottom: -15,
              left: -5,
              fontFamily: 'Inter-Medium',
              fontSize: 10,
              color: '#3E5A47'
            }}>
            PHOTO
          </Text>
        </View>
        <DashedLine width={'30%'} color="#3E5A47" />
        <View>
          {activeIcon.stepTwo ? (
            <CheckIcon color={'#3E5A47'} />
          ) : (
            <IdentityIcon color={activeIcon === 2 ? '#3E5A47' : '#667B6D'} />
          )}
          <Text
            style={{
              position: 'absolute',
              width: 60,
              bottom: -15,
              left: -10,
              fontFamily: 'Inter-Medium',
              fontSize: 10,
              color: '#3E5A47'
            }}>
            IDENTITY
          </Text>
        </View>
        <DashedLine width={'30%'} color="#3E5A47" />
        <View>
          {activeIcon.stepThree ? (
            <CheckIcon color={'#3E5A47'} />
          ) : (
            <LocationIcon color={activeIcon === 3 ? '#3E5A47' : '#667B6D'} />
          )}
          <Text
            style={{
              position: 'absolute',
              width: 60,
              bottom: -15,
              left: -16,
              fontFamily: 'Inter-Medium',
              fontSize: 10,
              color: '#3E5A47'
            }}>
            LOCATION
          </Text>
        </View>
      </View>
      <PagerView
        ref={pagerRef}
        style={styles.pager}
        initialPage={currentPage}
        onPageSelected={onPageSelected}
        scrollEnabled={false}>
        <Page1 />
        <Page2 />
        <Page3 />
      </PagerView>
    </View>
  );
};

export default UserVerification;

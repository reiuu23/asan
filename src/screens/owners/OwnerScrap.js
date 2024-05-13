import 'react-native-gesture-handler';
import React, { useState, useEffect, useContext } from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
  Alert,
  TextInput,
  ScrollView,
  Image,
  Dimensions,
  BackHandler,
  RefreshControl,
  ActivityIndicator
} from 'react-native';

import { useForm, Controller } from 'react-hook-form';
import { SelectList } from 'react-native-dropdown-select-list';
import { createScrapData, getScrapData, submitScrapData, updateScrapData, deleteScrapData } from '../../services/scrapdataService';
import ImagePicker from 'react-native-image-crop-picker';
import { BackButtonIcon, SearchIcon, UploadIcon, CameraIcon, SearchIconVar } from '../../components/Icons';
import { AuthContext } from '../../context/AuthContext';

const OwnerScrap = () => {
  const { session } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedScrapItem, setSelectedScrapItem] = useState(null);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  // Fetch Scrap Data

  const fetchScrap = async () => {
    try {
      setDataLoading(true);

      const response = await getScrapData(session.warehouseId, session.token);

      setData(response);

      console.log('data: ', response);

      return true;
    } catch (error) {
      console.log('Error: ', error.message);
      Alert.alert('Encountered an error while retrieving the scrap data.', error.message);
      return false;
    }
  }

  useEffect(() => {
    fetchScrap();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    const response = fetchScrap();
    if(response) {
      setRefreshing(false);
    } else {
      setRefreshing(false);
      Alert.alert(
        'Encountered an error while refreshing the scrap data. Please try again later!'
      );
    }
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    scrap_name: '',
    scrap_volume: '',
    scrap_price_per_kg: '',
    scrap_stock_count: ''
  });

  const handleNumericInput = text => {
    const value = text.replace(/[^0-9]/g, '');
    return value;
  };

  const handleCloseModalPress = () => {
    Alert.alert('Cancel?', `Do you wish to cancel ${modalVisible ? 'adding' : 'editing'} your scrap entry?`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancelled adding a new scrap entry.'),
        style: 'cancel'
      },
      {
        text: 'Yes',
        onPress: () => {
          setModalVisible(false);
          setIsEditModalVisible(false);
          setPreviewImage(null);
          setImage(null);
          setPreviewImage(null);
        }
      }
    ]);
  };

  const onSubmit = async data => {
    const formData = {
      scrap_category: selected,
      warehouse_id: session.warehouseId,
      ...data,
      scrap_image: image
    };

    console.log('uri: ', formData.scrap_image);

    const scrapData = await createScrapData(formData);

    try {
      const response = await submitScrapData(scrapData, session.token);

      Alert.alert(
        'Scrap Entry Added',
        `You have successfully added ${selectedScrapItem.scrap_name}. Do you want to create another scrap entry?`,
        [
          {
            text: 'No',
            onPress: () => {
              setModalVisible(false);
              reset();
            },
            style: 'cancel'
          },
          {
            text: 'Yes',
            onPress: () => {
              reset();
            }
          }
        ]
      );

      fetchScrap();
    } catch (error) {
      if(image === null) {
        Alert.alert(
          'Oops',
          `You haven't added a scrap photo/image yet!`
        );
      } else {
        Alert.alert(
          'Oops',
          `An error occured while adding your scrap entry: ${error}`
        );
      }
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
        setPreviewImage(image);
        setImage(image);
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
        setPreviewImage(image);
        setImage(image);
      })
      .catch(error => {
        console.log('Camera Error: ', error);
      });
  };

  const categories = require('../../data/categories.json');

  // const [data, setData] = useState(null);
  const [groupData, setGroupData] = useState(null);

  useEffect(() => {
    if(data) {
      const groupByCategory = data => {
        return data.reduce((acc, item) => {
          const category = item.scrap_category;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(item);
          return acc;
        }, {});
      };

      const groupedData = groupByCategory(data);
      const groupedArray = Object.keys(groupedData).map(category => ({
        category,
        items: groupedData[category]
      }));

      setGroupData(groupedArray);
    }
  }, [data]);

  const windowWidth = Dimensions.get('window').width;

  const onDelete = () => {
    Alert.alert('Delete Scrap Data?', 'Are you sure you want to delete this scrap data?', [
      {
        text: 'Delete',
        onPress: () => handleDelete(selectedScrapItem.scrap_id),
        style: 'cancel'
      },
      {
        text: 'Cancel',
        onPress: () => {
          console.log("Cancelled deletion.");
        }
      }
    ]);
  }

  const handleDelete = async (scrapId) => {
    try {
      const response = await deleteScrapData(scrapId, session.token);

      Alert.alert(
        'Scrapdata Deleted',
        `You have successfully deleted ${data.scrap_name}.`,
        [
          {
            text: 'OK',
            onPress: () => {
              setIsEditModalVisible(false);
              setPreviewImage(null);
              setImage(null);
              fetchScrap();
            }
          }
        ]
      );

      return response;
    } catch (error) {
      Alert.alert(
        'Oops',
        `An error occurred while attempting to delete the scrap entry: ${error}`
      );
    }
  }

  const handleEdit = item => {

    console.log("Item: ", item);

    setIsEditModalVisible(true);
    setSelected(item.scrap_category);
    setSelectedScrapItem(item);
    setPreviewImage(item.scrap_image);

    console.log("selected items", selectedScrapItem);
  };

  useEffect(() => {
    console.log("category1: ", selected);
  }, [selected]);

  const onEditSubmit = async data => {
    try {
      const formData = new FormData();

      console.log(selected);
      if(selectedScrapItem.scrap_category !== selected) {
        // console.log('selected: ', selected);
        formData.append('scrap_category', selected);
        switch(selected) {
          case "Plastic":
            formData.append('scrap_bar_color', '#E9D985');
            break;
          case "White Paper":
            formData.append('scrap_bar_color', '#FF7961');
            break;
          case "Select Paper":
            formData.append('scrap_bar_color', '#FFC7C7');
            break;
          case "Karton Paper":
            formData.append('scrap_bar_color', '#A486E2');
            break;
          case "Mixed Paper":
            formData.append('scrap_bar_color', '#9DE9D7');
            break;
          case "Solid Metal":
            formData.append('scrap_bar_color', '#57B8FF');
            break;
          case "Assorted Metal":
            formData.append('scrap_bar_color', '#3E5A47');
            break;
          default: 
            console.log("Invalid Scrap Category");
        };
      }

      if (selectedScrapItem.scrap_name !== data.scrap_name) {
        formData.append('scrap_name', data.scrap_name);
      }

      if (selectedScrapItem.scrap_volume !== data.scrap_volume) {
        formData.append('scrap_volume', data.scrap_volume);
      }

      if (
        selectedScrapItem.scrap_price_per_kg !==
        parseFloat(data.scrap_price_per_kg)
      ) {
        formData.append(
          'scrap_price_per_kg',
          parseFloat(data.scrap_price_per_kg)
        );
      }

      if (
        selectedScrapItem.scrap_total_weight !==
        parseInt(data.scrap_total_weight)
      ) {
        formData.append('scrap_total_weight', data.scrap_total_weight);
      }

      if (
        selectedScrapItem.scrap_stock_count !== parseInt(data.scrap_stock_count)
      ) {
        formData.append('scrap_stock_count', parseInt(data.scrap_stock_count));
      }

      // Check if image is updated
      if (image !== null) {

        const filename = image.path.split('/').pop(); 

        formData.append('scrap_image', {
          uri: image.path,
          type: image.mime,
          name: filename
        });
      }

      // Submit only the updated fields to the backend

      console.log("Updated Fields: ", formData);
      console.log("session token: ", selectedScrapItem.scrap_id);

      const response = await updateScrapData(
        selectedScrapItem.scrap_id,
        formData,
        session.token
      );

      // Handle success response
      Alert.alert(
        'Scrap Entry Updated',
        `You have successfully updated ${data.scrap_name}.`,
        [
          {
            text: 'OK',
            onPress: () => {
              setIsEditModalVisible(false);
              setPreviewImage(null);
              setImage(null);
              fetchScrap();
            }
          }
        ]
      );

      return response;
    } catch (error) {
      // Handle error
      Alert.alert(
        'Oops',
        `An error occurred while updating your scrap entry: ${error}`
      );
    }
  };


  useEffect(() => {
    if (isEditModalVisible) {
      reset({
        scrap_name: selectedScrapItem.scrap_name,
        scrap_volume: selectedScrapItem.scrap_volume,
        scrap_price_per_kg: selectedScrapItem.scrap_price_per_kg.toString(), 
        scrap_total_weight: selectedScrapItem.scrap_total_weight.toString(),
        scrap_stock_count: selectedScrapItem.scrap_stock_count.toString() 
      });
    } else {
      reset({
        scrap_name: '',
        scrap_volume: '',
        scrap_price_per_kg: '',
        scrap_total_weight: '',
        scrap_stock_count: ''
      });
    }
  }, [isEditModalVisible, modalVisible]);

  
  const renderScrapItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.scrapItemContents}>
        <Image
          style={styles.scrapImage}
          source={
            item.scrap_image
              ? { uri: item.scrap_image }
              : require('../../assets/img/plasticImg.png')
          }
        />
        <Text style={styles.title} numberOfLines={1}>
          {item.scrap_name}
        </Text>
        <View style={styles.row}>
          <Text style={styles.label}>Volume</Text>
          <Text style={styles.value}>
            {item.scrap_volume ? item.scrap_volume : 'Unspecified'}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Total Weight (kg)</Text>
          <Text style={styles.value}>{item.scrap_total_weight}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Stocks</Text>
          <Text style={styles.value}>{item.scrap_stock_count} pieces</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Scrap Price (per kg)</Text>
          <Text style={styles.value}>&#8369; {item.scrap_price_per_kg}</Text>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEdit(item)}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top_bar__container}>
        <View style={styles.top_bar_section}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <BackButtonIcon />
          </TouchableOpacity>
          <Text style={styles.top_bar__header}>Scrap</Text>
        </View>
        <View style={styles.top_bar_section}>
          <TouchableOpacity style={styles.top_bar__searchbtn}>
            <SearchIconVar />
          </TouchableOpacity>
          <Text style={styles.top_bar__header}>Categories</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.addBtnWrapper}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text style={styles.addBtn}>Add a New Scrap</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        visible={modalVisible || isEditModalVisible}
        onRequestClose={() => {
          Alert.alert(
            'Cancel?',
            `Do you wish to abort creating your scrap entry?`,
            [
              {
                text: 'No',
                onPress: () => {},
                style: 'cancel'
              },
              {
                text: 'Yes',
                onPress: () => {
                  setModalVisible(false);
                  setPreviewImage(null);
                  setImage(null);
                  setPreviewImage(null);
                  setIsEditModalVisible(false);
                  reset();
                }
              }
            ]
          );
        }}>
        <ScrollView contentContainerStyle={styles.modalContainer}>
          <View style={styles.bottomSheetWrapper}>
            <View style={styles.modalForm}>
              {modalVisible ? (
                <Text style={styles.formModalHeader}>Add New Entry</Text>
              ) : (
                <Text style={styles.formModalHeader}>Edit Scrap Entry</Text>
              )}
              <Text style={styles.formInputHeader}>Scrap Category</Text>
              {modalVisible ? (
                <SelectList
                  placeholder="Select Scrap Category"
                  setSelected={val => setSelected(val)}
                  maxHeight={300}
                  data={categories}
                  save="value"
                  fontFamily="Inter-Medium"
                  boxStyles={{
                    borderStyle: 'solid',
                    marginBottom: 20,
                    marginHorizontal: 5,
                    marginTop: 15
                  }}
                  inputStyles={{ color: '#3E5A47' }}
                  dropdownStyles={{ marginBottom: 20 }}
                  dropdownTextStyles={{ color: '#3E5A47' }}
                />
              ) : (
                <SelectList
                  placeholder="Select Scrap Category"
                  setSelected={val => setSelected(val)}
                  maxHeight={300}
                  data={categories}
                  defaultOption={{ key: selected, value: selected }}
                  save="value"
                  fontFamily="Inter-Medium"
                  boxStyles={{
                    borderStyle: 'solid',
                    marginBottom: 20,
                    marginHorizontal: 5,
                    marginTop: 15
                  }}
                  inputStyles={{ color: '#3E5A47' }}
                  dropdownStyles={{ marginBottom: 20 }}
                  dropdownTextStyles={{ color: '#3E5A47' }}
                />
              )}
              <Text style={styles.formInputHeader}>Scrap Name</Text>
              {errors.scrap_name && (
                <Text style={styles.inputError}>
                  {errors.scrap_name.message}
                </Text>
              )}
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.formInput}
                    placeholder="Enter the scrap name (e.g. Plastic)"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="scrap_name"
                rules={{ required: 'Scrap name is required.' }}
              />
              <Text style={styles.formInputHeader}>
                Scrap Volume (Optional)
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.formInput}
                    placeholder="(e.g. 1 Liter)"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="scrap_volume"
              />
              <Text style={styles.formInputHeader}>Price (per kg)</Text>
              {errors.scrap_price_per_kg && (
                <Text style={styles.inputError}>
                  {errors.scrap_price_per_kg.message}
                </Text>
              )}
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.formInput}
                    placeholder="Enter the price value"
                    keyboardType="numeric"
                    onBlur={onBlur}
                    onChangeText={input => onChange(handleNumericInput(input))}
                    value={value}
                  />
                )}
                name="scrap_price_per_kg"
                rules={{ required: 'Price is required.' }}
              />
              <Text style={styles.formInputHeader}>Total Weight (in kg)</Text>
              {errors.scrap_total_weight && (
                <Text style={styles.inputError}>
                  {errors.scrap_total_weight.message}
                </Text>
              )}
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.formInput}
                    placeholder="Enter the scraps total weight (100kg)"
                    keyboardType="numeric"
                    onBlur={onBlur}
                    onChangeText={input => onChange(handleNumericInput(input))}
                    value={value}
                  />
                )}
                name="scrap_total_weight"
                rules={{ required: 'Scrap total weight is required.' }}
              />
              <Text style={styles.formInputHeader}>Quantity</Text>
              {errors.scrap_stock_count && (
                <Text style={styles.inputError}>
                  {errors.scrap_stock_count.message}
                </Text>
              )}
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.formInput}
                    placeholder="Enter the number of quantity"
                    keyboardType="numeric"
                    onBlur={onBlur}
                    onChangeText={input => onChange(handleNumericInput(input))}
                    value={value}
                  />
                )}
                name="scrap_stock_count"
                rules={{ required: 'Scrap quantity amount is required.' }}
              />

              {previewImage ? (
                <>
                  <Text style={styles.formInputHeader}>Image Preview</Text>
                  <View>
                    <Image
                      source={{
                        uri: previewImage.path
                          ? previewImage.path
                          : previewImage
                      }}
                      style={{
                        alignSelf: 'center',
                        width: 200,
                        height: 200,
                        borderColor: '#3E5A47',
                        borderWidth: 1,
                        marginVertical: 20
                      }}
                    />
                  </View>
                </>
              ) : (
                ''
              )}

              {/* {image ? (
                <>
                  <Text style={styles.formInputHeader}>Image Preview</Text>
                  <View>
                    <Image
                      source={{ uri: image.path }}
                      style={{
                        alignSelf: 'center',
                        width: 200,
                        height: 200,
                        borderColor: '#3E5A47',
                        borderWidth: 1,
                        marginVertical: 20
                      }}
                    />
                  </View>
                </>
              ) : (
                ''
              )} */}
            </View>

            <View style={styles.btnWrapper}>
              <TouchableOpacity
                style={styles.uploadImageBtnWrapper}
                onPress={handleSelectImage}>
                <UploadIcon color={'#3E5A47'} />
                <Text style={styles.uploadImageBtn}>Upload an Image</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.uploadImageBtnWrapper}
                onPress={handleOpenCamera}>
                <CameraIcon color={'#3E5A47'} />
                <Text style={styles.uploadImageBtn}>Take a Photo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.submitBtnWrapper}
                onPress={
                  modalVisible
                    ? handleSubmit(onSubmit)
                    : handleSubmit(onEditSubmit)
                }>
                <Text style={styles.submitBtn}>Submit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelBtnWrapper}
                onPress={handleCloseModalPress}>
                <Text style={styles.cancelBtn}>Cancel</Text>
              </TouchableOpacity>

              {isEditModalVisible && (
                <TouchableOpacity
                  style={styles.deleteBtnWrapper}
                  onPress={() => onDelete()}>
                  <Text style={styles.submitBtn}>Delete Scrap Item</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
      </Modal>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#3E5A47']} // Customize the loading indicator color
          />
        }>
        {!groupData ? (
          <View style={styles.onEmptyList}>
            <Text style={styles.emptyText}>
              Start by tapping the "Add a New Scrap" button
            </Text>
          </View>
        ) : (
          <>
            {groupData.map(({ category, items }) => (
              <View key={category}>
                <Text style={styles.categoryHeader}>{category}</Text>
                <FlatList
                  horizontal
                  data={items}
                  renderItem={renderScrapItem}
                  contentContainerStyle={{ paddingBottom: 40 }}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40
  },
  onEmptyList: {
    alignItems: 'center',
    justifyContent: 'center'
    // height: 200
  },
  btnWrapper: {
    marginTop: 10
  },
  emptyText: {
    alignSelf: 'center',
    color: '#3E5A47',
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 20
  },
  top_bar__container: {
    // borderBottomWidth: 1,
    // borderBottomColor: '#3E5A47',
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20
  },
  top_bar_section: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  top_bar__header: {
    color: '#3E5A47',
    fontFamily: 'Inter-SemiBold',
    fontSize: 36
  },
  top_bar__searchbtn: {
    alignItems: 'center',
    borderColor: '#3E5A47',
    borderRadius: 8,
    borderWidth: 1.5,
    height: 35,
    justifyContent: 'center',
    width: 44
  },
  top_bar_addcat_button: {
    alignItems: 'center',
    backgroundColor: '#3E5A47',
    borderRadius: 8,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    height: 45,
    marginTop: 12,
    marginBottom: 20
  },
  top_bar_addcat_label: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
    fontSize: 14
  },
  bottomSheetWrapper: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    marginBottom: 20
  },
  formModalHeader: {
    alignSelf: 'center',
    color: '#3E5A47',
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    marginVertical: 40
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
  inputError: {
    color: 'red',
    fontFamily: 'Inter-Medium',
    marginLeft: 9
  },
  uploadImageBtnWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginTop: 15,
    paddingLeft: 5
  },
  uploadImageBtn: {
    color: '#3E5A47',
    fontFamily: 'Inter-Regular',
    fontSize: 18
    // textDecorationLine: 'underline'
  },
  addBtnWrapper: {
    alignItems: 'center',
    backgroundColor: '#3E5A47',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  addBtn: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
    fontSize: 16
  },
  submitBtnWrapper: {
    alignItems: 'center',
    backgroundColor: '#3E5A47',
    borderRadius: 10,
    height: 60,
    justifyContent: 'center',
    marginTop: 45
  },
  submitBtn: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
    fontSize: 16
  },
  deleteBtnWrapper: {
    alignItems: 'center',
    backgroundColor: '#8B0000',
    borderRadius: 10,
    height: 60,
    justifyContent: 'center',
    marginTop: 10
  },
  cancelBtnWrapper: {
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#3E5A47',
    borderWidth: 1.5,
    height: 60,
    justifyContent: 'center',
    marginTop: 10
  },
  cancelBtn: {
    color: '#3E5A47',
    fontFamily: 'Inter-Medium',
    fontSize: 16
  },
  categoryHeader: {
    color: '#3E5A47',
    fontFamily: 'Inter-Bold',
    fontSize: 21,
    marginHorizontal: 20,
    marginBottom: 20
  },
  scrapItemContents: {
    width: 200,
    backgroundColor: '#E5E5E5',
    borderRadius: 8,
    marginRight: 20,
    marginLeft: 20,
    paddingTop: 10,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },

  // Scrap Item Content Styles
  scrapImage: {
    width: 180,
    height: 140,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 8,
    borderColor: '#3E5A47'
  },
  title: {
    color: '#3E5A47',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    alignSelf: 'center',
    marginBottom: 10,
    width: 150,
    overflow: 'hidden',
    numberOfLines: 1,
    ellipsizeMode: 'tail'
  },
  row: {
    flexDirection: 'column',
    marginLeft: 20
  },
  label: {
    color: '#3E5A47',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14
  },
  value: {
    color: '#3E5A47',
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 5
  },
  editButton: {
    backgroundColor: '#3E5A47',
    borderRadius: 8,
    marginTop: 20,
    marginHorizontal: 20,
    padding: 10
  },
  editButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
    textAlign: 'center'
  }
});

export default OwnerScrap;

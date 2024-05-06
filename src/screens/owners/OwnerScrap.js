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
  Dimensions
} from 'react-native';

import { useForm, Controller } from 'react-hook-form';
import { SelectList } from 'react-native-dropdown-select-list';
import { createScrapData, submitScrapData } from '../../services/scrapdataService';
import ImagePicker from 'react-native-image-crop-picker';
import { BackButtonIcon, SearchIcon, UploadIcon, CameraIcon, SearchIconVar } from '../../components/Icons';
import { AuthContext } from '../../context/AuthContext';

const OwnerScrap = () => {
  const { session } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [image, setImage] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const handleNumericInput = text => {
    const value = text.replace(/[^0-9]/g, '');
    return value;
  };

  const handleCloseModalPress = () => {
    Alert.alert('Cancel?', 'Do you wish to cancel adding a new scrap entry?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancelled adding a new scrap entry.'),
        style: 'cancel'
      },
      { text: 'Yes', onPress: () => setModalVisible(false) }
    ]);
  };

  const onSubmit = async (data) => {
    // console.log("submitted data (scraps): ", {"scrap_category": selected, ...data, "scrap_image": image.uri});
    const formData = {
      scrap_category: selected,
      warehouse_id: 'e896bb4b-aeb9-40a5-b48e-3fb6642b54d3',
      ...data,
      scrap_image: image.uri
    };
    const scrapData = createScrapData(formData);

    console.log(formData);

    // console.log(scrapData);

    try {
      const response = await submitScrapData(
        scrapData,
        '3|9C21IKqvcWXW70Toi977Ch5OukXobrfOyQNVppFJ10821375'
      );
      console.log("scrapdata response: ", response);
    } catch (error) {
      console.log("error upon submitting scrapdata: ", error);
    }
  };

  const handleSelectImage = () => {
    ImagePicker.openPicker({
      cropping: true,
      mediaType: 'photo'
    })
      .then(image => {
        const source = { uri: image.path };
        setImage(source);
      })
      .catch(error => {
        console.log('ImagePicker Error: ', error);
      });
  };

  const handleOpenCamera = () => {
    ImagePicker.openCamera({
      width: 200,
      height: 200,
      cropping: true,
      mediaType: 'photo'
    })
      .then(image => {
        const source = { uri: image.path };
        setImage(source);
      })
      .catch(error => {
        console.log('Camera Error: ', error);
      });
  };

  const categories = require('../../data/categories.json');

  const data = require('../../data/scraps.json');

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

  const windowWidth = Dimensions.get('window').width;

  const renderScrapItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.scrapItemContents}>
        <Image style={{width: windowWidth * 0.45, height: 130, alignSelf: 'center', marginBottom: 20, borderRadius: 8}} source={require('../../assets/img/plasticImg.png')}/>
        <Text style={styles.title}>{item.scrap_name}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Volume</Text>
          <Text style={styles.value}>{item.scrap_volume}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Price (per kg)</Text>
          <Text style={styles.value}>&#8369; {item.scrap_price_per_kg}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Stocks</Text>
          <Text style={styles.value}>{item.scrap_stock_count} pieces</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Scrap Price (per kg)</Text>
          <Text style={styles.value}>&#8369; {item.scrap_price_per_kg}</Text>
        </View>
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
        onPress={() => setModalVisible(true)}>
        <Text style={styles.addBtn}>Add a New Scrap</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <ScrollView contentContainerStyle={styles.modalContainer}>
          <View style={styles.bottomSheetWrapper}>
            <View style={styles.modalForm}>
              <Text style={styles.formModalHeader}>Add New Entry</Text>
              <Text style={styles.formInputHeader}>Scrap Category</Text>
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
              <Text style={styles.formInputHeader}>Scrap Name</Text>
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
              />

              <Text style={styles.formInputHeader}>Quantity</Text>
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
              />

              {image ? (
                <>
                  <Text style={styles.formInputHeader}>Image Preview</Text>
                  <View>
                    <Image
                      source={{ uri: image.uri }}
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
                onPress={handleSubmit(onSubmit)}>
                <Text style={styles.submitBtn}>Submit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelBtnWrapper}
                onPress={handleCloseModalPress}>
                <Text style={styles.cancelBtn}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>
      <ScrollView>
        {!data ? (
          <View style={styles.onEmptyList}>
            <Text style={styles.emptyText}>
              Start by tapping the "Add a New Scrap" button
            </Text>
          </View>
        ) : (
          <>
            {groupedArray.map(({ category, items }) => (
              <View key={category}>
                <Text style={styles.categoryHeader}>{category}</Text>
                <FlatList
                  horizontal
                  data={items}
                  renderItem={renderScrapItem}
                  contentContainerStyle={{ paddingBottom: 40 }}
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
    justifyContent: 'center',
    flex: 1
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
    paddingVertical: 20,
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
  title: {
    color: '#3E5A47',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10
  },
  row: {
    flexDirection: 'column',
    marginLeft: 20
  },
  label: {
    color: '#3E5A47',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  value: {
    color: '#3E5A47',
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 5
  }
});

export default OwnerScrap;

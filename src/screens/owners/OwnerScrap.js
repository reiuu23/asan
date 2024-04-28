import 'react-native-gesture-handler';
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
  TextInput
} from 'react-native';

import { useForm, Controller } from 'react-hook-form';
import { BackButtonIcon, SearchIconVar, UploadIcon } from '../../components/Icons';
import React, { useState, useEffect, useRef } from 'react';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop
} from '@gorhom/bottom-sheet';
import { PortalProvider } from '@gorhom/portal';
import ImagePicker from 'react-native-image-crop-picker';

const OwnerScrap = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [scrapCategory, setScrapCategory] = useState('');
  const [scrapName, setScrapName] = useState('');
  const [scrapWeight, setScrapWeight] = useState('');

  const [items, setItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editWeight, setEditWeight] = useState('');

  const bottomSheetModalRef = useRef(null);
  const snapPoints = ['90%'];

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const handlePresentModal = () => {
    bottomSheetModalRef.current?.present();
  };

  const handleCloseModalPress = () => {
    Alert.alert('Cancel?', 'Do you wish to cancel adding a new scrap entry?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancelled adding a new scrap entry.'),
        style: 'cancel'
      },
      { text: 'Yes', onPress: () => bottomSheetModalRef.current?.close() }
    ]);
  };

  const handleBackdropPress = () => {
    bottomSheetModalRef.current?.close();
  };

  const handleNumericInput = text => {
    const value = text.replace(/[^0-9]/g, '');
    return value;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://your-api-endpoint/items');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addItem = async () => {
    try {
      const response = await fetch('http://your-api-endpoint/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          category: scrapCategory,
          name: scrapName,
          weight: scrapWeight
        })
      });
      const newItem = await response.json();
      setItems([...items, newItem]);
      setModalVisible(false);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const editItem = itemId => {
    const itemToEdit = items.find(item => item.id === itemId);
    if (itemToEdit) {
      setEditingItemId(itemId);
      setEditName(itemToEdit.name);
      setEditWeight(itemToEdit.weight);
    }
  };

  const saveEdit = async () => {
    try {
      const response = await fetch(
        `http://your-api-endpoint/items/${editingItemId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: editName,
            weight: editWeight
          })
        }
      );
      if (response.ok) {
        setItems(prevItems =>
          prevItems.map(item =>
            item.id === editingItemId
              ? { ...item, name: editName, weight: editWeight }
              : item
          )
        );
        setEditingItemId(null);
      }
    } catch (error) {
      console.error('Error saving edit:', error);
    }
  };

  const deleteItem = async itemId => {
    try {
      const response = await fetch(`http://your-api-endpoint/items/${itemId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setItems(prevItems => prevItems.filter(item => item.id !== itemId));
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ margin: 10 }}>
      <Text>{item.name}</Text>
      <Text>Weight: {item.weight}</Text>
      <Button title="Edit" onPress={() => editItem(item.id)} />
      <Button title="Delete" onPress={() => deleteItem(item.id)} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <BottomSheetModalProvider>
        <View style={styles.top_bar__container}>
          <View style={styles.top_bar_section}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <BackButtonIcon></BackButtonIcon>
            </TouchableOpacity>
            <Text style={styles.top_bar__header}>Scrap</Text>
          </View>
          <View style={styles.top_bar_section}>
            <TouchableOpacity style={styles.top_bar__searchbtn}>
              <SearchIconVar></SearchIconVar>
            </TouchableOpacity>
            <Text style={styles.top_bar__header}>Categories</Text>
          </View>
          <View style={{ marginBottom: 20 }}></View>
        </View>
        <TouchableOpacity
          style={styles.addBtnWrapper}
          onPress={() => handlePresentModal()}>
          <Text style={styles.addBtn}>Add a New Scrap</Text>
        </TouchableOpacity>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={{ borderRadius: 40 }}
          backdropComponent={props => (
            <BottomSheetBackdrop
              {...props}
              disappearsOnIndex={-1}
              appearsOnIndex={0}
            />
          )}
          onBackdropPress={handleBackdropPress}>
          <View style={styles.bottomSheetWrapper}>
            <View style={styles.modalForm}>
              <Text style={styles.formModalHeader}>Add New Entry</Text>
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
                name="scrap_cost"
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
                name="scrap_quantity"
              />
            </View>

            <View style={styles.btnWrapper}>
              <TouchableOpacity style={styles.uploadImageBtnWrapper}>
                <UploadIcon></UploadIcon>
                <Text style={styles.uploadImageBtn}>Upload Image</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.submitBtnWrapper}>
                <Text style={styles.submitBtn}>Submit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelBtnWrapper}
                onPress={handleCloseModalPress}>
                <Text style={styles.cancelBtn}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheetModal>

        {items.length === 0 ? (
          <View style={styles.onEmptyList}>
            <Text style={styles.emptyText}>
              Start by tapping the "Add a New Scrap" button
            </Text>
          </View>
        ) : (
          <>
            <FlatList
              data={items}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </>
        )}
      </BottomSheetModalProvider>
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
  emptyText: {
    alignSelf: 'center',
    color: '#3E5A47',
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    textAlign: 'center'
  },
  top_bar__container: {
    // borderBottomWidth: 1,
    // borderBottomColor: '#3E5A47',
    paddingLeft: 20,
    paddingRight: 20
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
    paddingTop: 20
  },
  formModalHeader: {
    alignSelf: 'center',
    color: '#3E5A47',
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    marginBottom: 30
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
    fontSize: 18,
    textDecorationLine: 'underline'
  },
  addBtnWrapper: {
    alignItems: 'center',
    backgroundColor: '#3E5A47',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20
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
  }
});

export default OwnerScrap;

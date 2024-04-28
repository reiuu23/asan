import React, { useState } from 'react';
import {
  View,
  Modal,
  Button,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text
} from 'react-native';
import { Calendar } from 'react-native-calendars';

const ModalCalendar = ({ isVisible, onClose, onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDayPress = day => {
    setSelectedDate(day.dateString);
  };

  const handleConfirm = () => {
    onDateSelect(selectedDate);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      hardwareAccelerated={true}
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}>
          <TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 10,
                width: '80%'
              }}>
              <Calendar
                onDayPress={handleDayPress}
                markedDates={{
                  [selectedDate]: { selected: true, selectedColor: '#3E5A47' }
                }}
                theme={{
                    textDayFontFamily: 'Inter-Medium',
                    textMonthFontFamily: 'Inter-Medium',
                    textDayHeaderFontFamily: 'Inter-Medium',
                }}
              />
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  backgroundColor: '#3E5A47',
                  borderRadius: 5,
                  paddingVertical: 10,
                  alignItems: 'center'
                }}
                onPress={handleConfirm}>
                <Text style={{ color: '#FFFFFF', fontSize: 16 }}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalCalendar;

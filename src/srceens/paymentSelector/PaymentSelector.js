import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {PaymentMode, PaymentModeIcons, PaymentModesArray} from '../../constants/PaymentMode';
import CustomModal from '../../components/CustomModal';
import { DefaultStyle } from '../../utils/DefaultStyle';
import { THEME_COLOR } from '../../constants/Colour';

const PaymentSelector = ({value, onSelect}) => {
  const [selectedMode, setSelectedMode] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = mode => {
    setSelectedMode(mode);
    setModalVisible(false); // Close the modal after selection
    onSelect(mode);
  };

  return (
    <View>
      {/* Dropdown Trigger Button */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.dropdownButton}>
        <View style={DefaultStyle.flexRow}>
          <Icon
            name={PaymentModeIcons[value] || 'cash'}
            size={24}
          />
          <Text style={styles.dropdownButtonText}>
            {PaymentMode[value] || 'Select Payment Mode'}
          </Text>
        </View>
        <Icon name="menu-down" size={24} color="#000" />
      </TouchableOpacity>

      {/* Dropdown Modal */}
      <CustomModal
        title="Select Payment Mode"
        visible={modalVisible}
        onClose={() => setModalVisible(false)}>
        <ScrollView>
          {PaymentModesArray.map(mode => (
            <TouchableOpacity
              key={mode.key}
              onPress={() => handleSelect(mode)}
              style={[
                styles.optionButton,
                PaymentMode[value] === mode.label && styles.selectedOption,
              ]}>
              <Icon
                name={mode.icon}
                size={24}
                color={PaymentMode[value] === mode.label ? '#fff' : '#000'}
                style={{marginRight: 10}}
              />
              <Text
                style={{
                  color: PaymentMode[value] === mode.label ? '#fff' : '#000',
                }}>
                {mode.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </CustomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: THEME_COLOR.textSecondary,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    // marginVertical: 5,
    borderRadius: 8,
    width: 300,
  },
  selectedOption: {
    backgroundColor: '#4CAF50',
  },
});

export default PaymentSelector;

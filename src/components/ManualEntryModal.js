import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import CustomModal from './CustomModal';
import { THEME_COLOR } from '../constants/Colour';
import { DefaultStyle } from '../utils/DefaultStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ManualEntryModal = ({ visible, initialValues, onSave, onClose }) => {
  // Initialize amount as a number
  const [merchant, setMerchant] = useState(initialValues?.merchant || '');
  const [amount, setAmount] = useState(initialValues?.amount || 0); // Store as number
  const [date, setDate] = useState(initialValues?.date || '');

  const handleSave = () => {
    // Pass the numeric amount to onSave
    onSave({ merchant, amount, date });
    onClose(); // Close modal after saving
  };

  // Convert amount to string for TextInput
  const amountAsString = String(amount);

  // Handle amount change: convert string back to number
  const handleAmountChange = (text) => {
    if (/^\d*\.?\d*$/.test(text)) { // Allow only numbers and optional decimal point
      setAmount(text === '' ? 0 : parseFloat(text)); // Convert to number
    }
  };

  return (
    <CustomModal
      visible={visible}
      onClose={onClose}
      onSave={handleSave}
      title="Expense Detail"
      save="OK"
    >
      <ScrollView contentContainerStyle={styles.modalContainer} keyboardShouldPersistTaps="handled" onStartShouldSetResponder={() => true}>
        <Text style={styles.error}>Unable to categorize transaction !</Text>
        <View style={DefaultStyle.flexRow}>
          <Text style={DefaultStyle.fontBold}>MESSAGE: </Text>
          <Text style={styles.message} selectable={true}>
            {initialValues?.transactionMessage || '-'}
          </Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Amount</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.currency}>₹</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter Amount"
              placeholderTextColor={THEME_COLOR.textSecondary}
              value={amountAsString} // Display as string
              onChangeText={handleAmountChange} // Handle changes
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Merchant</Text>
          <View style={styles.inputContainer}>
            <Icon name="message-question-outline" size={20} />
            <TextInput
              style={styles.input}
              placeholder="Enter Merchant Name"
              placeholderTextColor={THEME_COLOR.textSecondary}
              value={merchant}
              onChangeText={setMerchant}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Date</Text>
          <View style={styles.inputContainer}>
            <Icon name="calendar-question" size={20} />
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={THEME_COLOR.textSecondary}
              value={date}
              onChangeText={setDate}
            />
          </View>
        </View>
      </ScrollView>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    paddingBottom: 50
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME_COLOR.primary,
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 12,
    color: THEME_COLOR.textPrimary,
    marginBottom: 10,
    textAlign: 'left',
    flex: 1,
    flexShrink: 1

  },
  formGroup: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME_COLOR.primary,
    marginBottom: 6,
  },
  input: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 2,
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    height: 45,
  },
  currency: {
    fontSize: 20,
    fontWeight: '500',
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  error: {
    textAlign: 'center',
    color: THEME_COLOR.danger,
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default ManualEntryModal;
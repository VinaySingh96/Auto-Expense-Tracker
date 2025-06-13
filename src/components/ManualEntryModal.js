import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import CustomModal from './CustomModal';
import { THEME_COLOR } from '../constants/Colour';
import { DefaultStyle } from '../utils/DefaultStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ManualEntryModal = ({ visible, initialValues, onSave, onClose }) => {
  const [merchant, setMerchant] = useState(initialValues?.merchant || '');
  const [amount, setAmount] = useState(initialValues?.amount || 0);
  const [date, setDate] = useState(initialValues?.date || '');

  const handleSave = () => {
    onSave({ merchant, amount, date });
    onClose();
  };

  const amountAsString = String(amount);

  const handleAmountChange = (text) => {
    if (/^\d*\.?\d*$/.test(text)) {
      setAmount(text === '' ? 0 : parseFloat(text));
    }
  };

  return (
    <CustomModal visible={visible} onClose={onClose} onSave={handleSave} title="Expense Detail" save="OK" >
      {/* KeyboardAvoidingView ensures proper keyboard handling */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={styles.flex}
      >
        <ScrollView 
          contentContainerStyle={styles.modalContainer} 
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
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
                value={amountAsString}
                onChangeText={handleAmountChange}
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
      </KeyboardAvoidingView>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1, // Ensures full height usage
  },
  modalContainer: {
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    paddingBottom: 50,
    flexGrow: 1, // Ensures content grows properly
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
    marginBottom: 12, // Adds spacing between inputs
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
  error: {
    textAlign: 'center',
    color: THEME_COLOR.danger,
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default ManualEntryModal;

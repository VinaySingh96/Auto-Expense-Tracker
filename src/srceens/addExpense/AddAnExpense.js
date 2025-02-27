import { View, Text, StyleSheet, TextInput, ScrollView, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { THEME_COLOR } from '../../constants/Colour';
import DateSelector from '../../components/DateSelector';
import { DefaultStyle } from '../../utils/DefaultStyle';
import PaymentSelector from '../paymentSelector/PaymentSelector';
import CategoryDropdown from '../categoryDropdown/CategoryDropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtonComponent from '../../components/Button';
import CustomButton from '../../components/CustomButton';
import { insertExpense } from '../../helper/SqlHelper';
import { formatToIndianRupee, generateDateByMonthAndYear, generateDateByMonthYearAndDay } from '../../utils/helper';


const AddAnExpense = () => {
  const [expenseForm, setExpenseForm] = useState({
    merchant: '',
    paymentMode: '',
    amount: '',
    date: '',
    category: '',
    sub_category: ''
  });

  const onDateChange = async ({ day, month, year }) => {
    const date = generateDateByMonthYearAndDay(month+1, year, day);
    if(expenseForm.date !== date){
      setFormData('date', date);
    }
  };

  const handleAmountChange = (amount) => {
    setFormData('amount', parseFloat(amount));
  };

  const onSelectPaymentMode = (mode) => {
    setFormData('paymentMode', mode.key);
    setFormData('merchant', 'ZOMATO'); 
  };
  
  const onSelectCategory = (category) => {
    setFormData('category', category);
    setFormData('sub_category', 'others');
  };

  const setFormData = (key, value) => {
    setExpenseForm(prev => ({
      ...prev,
      [key]: value
    }));
  }

  const isExpenseFormValid = () => {
    const { merchant, amount, date, category, sub_category } = expenseForm;
    if(merchant && amount && date && category && sub_category) return true;
    return false;
  }

  const handleSave = async () => {
    // console.log(expenseForm);
    await insertExpense(expenseForm);
    resetExpenseForm();
    ToastAndroid.show('New Expense Added', ToastAndroid.SHORT)
  }

  const resetExpenseForm = () => {
    setExpenseForm(prev => ({
      ...prev,
      merchant: '',
      paymentMode: '',
      amount: '',
      category: '',
      sub_category: ''
    }));
  }

  return (
    <ScrollView style={styles.theme}>
      <View style={styles.header}>
        <Text style={styles.title}>Add Expense</Text>
      </View>

      {/* Expense Form */}
      <View style={styles.expenseContainer}>
        {/* Date */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Date</Text>
          <View style={styles.dateSelectorContainer}>
            <DateSelector onDateChange={onDateChange} showArrows={false} includeDay={true} />
          </View>
        </View>

        {/* Amount */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Amount</Text>
          <View style={styles.amountContainer}>
            <Text style={styles.currency}>₹</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter Amount"
              placeholderTextColor={THEME_COLOR.textSecondary}
              value={expenseForm.amount}
              onChangeText={handleAmountChange}
            />
          </View>
        </View>

        {/* Payment Mode */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Payment Mode</Text>
          <PaymentSelector value={expenseForm.paymentMode} onSelect={onSelectPaymentMode} />
        </View>

        {/* Category */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Category</Text>
          <CategoryDropdown value={expenseForm.category} onSelect={onSelectCategory} />
        </View>
      </View>

      {/* Save Button */}
      <View style={DefaultStyle.p2}>
        <View style={styles.save}>
          {/* <ButtonComponent label={'Save'} iconLeft={'save'} backgroundColor={THEME_COLOR.primary} /> */}
          <CustomButton
            title="Save"
            mode="contained"
            onPress={handleSave}
            icon={<Icon name="content-save" size={20} color={THEME_COLOR.white} />}
            disabled={!isExpenseFormValid()}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  theme: {
    backgroundColor: THEME_COLOR.white,
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    height: 60,
    lineHeight: 60,
    backgroundColor: THEME_COLOR.primary,
    color: THEME_COLOR.white,
  },
  header: {
    marginBottom: 10,
  },
  expenseContainer: {
    backgroundColor: THEME_COLOR.background,
    marginTop: 10,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME_COLOR.primary,
    marginBottom: 6,
  },
  dateSelectorContainer: {
    width: '100%',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#FFF',
    height: 45, // Fixed height for consistency
  },
  currency: {
    fontSize: 20,
    verticalAlign: 'middle',
    fontWeight: '500',
    marginRight: 10,
    marginLeft: 10
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: 50, // Fixed height for consistency,
  },
  save: {
    flexDirection: 'row',
    top: 40,
    justifyContent: 'flex-end'
  }
});

export default AddAnExpense;
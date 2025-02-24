import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For icons
import CustomButton from './CustomButton';
import {THEME_COLOR} from '../constants/Colour';
import {formatToIndianRupee} from '../utils/helper';

const TransactionCard = ({transaction, onCategorize}) => {
  return (
    <View style={styles.card}>
      {/* Left Section: Transaction Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.header}>
          <Text style={styles.merchant}>
            {transaction.merchant || 'Unknown Merchant'}
          </Text>
          {transaction.count && (
            <View style={styles.chip}>
              <Text style={styles.chipText}>{transaction.count}</Text>
            </View>
          )}
        </View>

        <Text style={styles.amount}>
          {formatToIndianRupee(transaction.amount)}
        </Text>
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Icon name="calendar-today" size={14} color="#666" />
            <Text style={styles.date}>{transaction.date}</Text>
          </View>
          <View style={styles.metaItem}>
            <Icon
              name={
                transaction.type === 'Credit'
                  ? 'arrow-upward'
                  : 'arrow-downward'
              }
              size={14}
              color={transaction.type === 'Credit' ? '#4CAF50' : '#FF5733'}
            />
            <Text
              style={[
                styles.type,
                {color: transaction.type === 'Credit' ? '#4CAF50' : '#FF5733'},
              ]}>
              {transaction.type || 'Debit'}
            </Text>
          </View>
        </View>
      </View>

      {/* Right Section: Categorize Button */}
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Categorize"
          mode="contained"
          onPress={() => onCategorize(transaction)}
          icon={<Icon name="label-outline" size={20} color={THEME_COLOR.white} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#eee',
    position: 'relative', // Allows absolute positioning inside
  },
  detailsContainer: {
    flex: 1, // Takes up available space
    marginRight: 16,
  },
  buttonContainer: {
    alignSelf: 'flex-end', // Align button to bottom right
    position: 'absolute',
    bottom: 12,
    right: 12,
  },
  merchant: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: THEME_COLOR.danger,
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  type: {
    fontSize: 12,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center', // Ensures vertical alignment
    justifyContent: 'flex-start', // Adjusts spacing
    gap: 8
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: {
    color: '#333',
    fontSize: 14,
  },
});

export default TransactionCard;

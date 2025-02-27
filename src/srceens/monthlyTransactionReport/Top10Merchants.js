import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { roundToDecimal } from '../../utils/Amount';
import { formatToIndianRupee } from '../../utils/helper';
import { ExpenseCategories } from '../../constants/ExpenseCategories';
import { DefaultStyle } from '../../utils/DefaultStyle';
import { THEME_COLOR } from '../../constants/Colour';

const Top10Merchants = ({ expenses }) => {
  const topMerchants = useMemo(() => {
    const merchantTotals = {};

    expenses.forEach(({ merchant, amount }) => {
      if (!merchantTotals[merchant]) {
        merchantTotals[merchant] = 0;
      }
      merchantTotals[merchant] += amount;
    });

    return Object.entries(merchantTotals)
      .map(([merchant, total]) => ({ merchant, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);
  }, [expenses]);

  const getCategoryIcon = (merchant) => {
    for (const category in ExpenseCategories) {
      const merchants = ExpenseCategories[category].merchants.map(merchant => merchant.toLowerCase());
      if (merchants.includes(merchant.toLowerCase())) {
        return ExpenseCategories[category].icon;
      }
    }
    return 'storefront-outline'; // Default icon if no category matches
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top 10 Merchants</Text>
      <FlatList
        data={topMerchants}
        keyExtractor={(item) => item.merchant}
        renderItem={({ item, index }) => (
          <View style={styles.merchantItem}>
            {/* Index Number + Icon + Merchant Name */}
            <View style={styles.merchantDetails}>
              <Text style={styles.index}>{index + 1}.</Text>
              <MaterialCommunityIcons name={getCategoryIcon(item.merchant)} size={24} color={THEME_COLOR.primary} />
              <Text style={styles.merchantText}>{item.merchant}</Text>
            </View>
            {/* Amount */}
            <View style={styles.amountContainer}>
              <Text style={styles.amount}>{formatToIndianRupee(roundToDecimal(item.total))}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: THEME_COLOR.light,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  merchantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensure amount is always visible
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  merchantDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  index: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
    color: '#333',
    width: 24
  },
  merchantText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  amountContainer: {
    backgroundColor: THEME_COLOR.danger,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default React.memo(Top10Merchants);

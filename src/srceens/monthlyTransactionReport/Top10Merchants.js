import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { roundToDecimal } from '../../utils/Amount';
import { formatToIndianRupee } from '../../utils/helper';
import { ExpenseCategories } from '../../constants/ExpenseCategories';
import { DefaultStyle } from '../../utils/DefaultStyle';
import { THEME_COLOR } from '../../constants/Colour';
import NothingToShow from '../../components/NothingToShow';

const Top10Merchants = ({ expenses }) => {
  const topMerchants = useMemo(() => {
    const merchantTotals = {};
  
    expenses.forEach(({ merchant, amount, category }) => {
      if (!merchantTotals[merchant]) {
        merchantTotals[merchant] = {
          total: 0,
          category: category === 'Unknown' ? '--' : category, // Store the category for the merchant
        };
      }
      merchantTotals[merchant].total += amount;
    });
    
    return Object.entries(merchantTotals)
      .map(([merchant, { total, category }]) => ({
        merchant,
        total,
        category, // Include the category in the result
      }))
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
  // console.log(topMerchants)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top 10 Merchants</Text> 
      {/* <ScrollView> */}
        {!topMerchants.length && <NothingToShow icon="account-cancel-outline" />}
        {topMerchants.map((item, index) => (
          <View 
            key={item.merchant} 
            style={[
              styles.merchantItem, 
              index === topMerchants.length - 1 && styles.lastMerchant
            ]}
          >
            {/* Index Number + Icon + Merchant Name */}
            <View style={styles.merchantDetails}>
              <Text style={styles.index}>{index + 1}.</Text>
              <MaterialCommunityIcons name={getCategoryIcon(item.merchant)} size={24} color={THEME_COLOR.primary} />
              <Text style={styles.merchantText}>{item.merchant}</Text>
              <View style={DefaultStyle.chip}>
                <Text style={DefaultStyle.chipText}>{item.category || 'NA'}</Text>
              </View>
            </View>
            {/* Amount */}
            <View style={styles.amountContainer}>
              <Text style={styles.amount}>{formatToIndianRupee(roundToDecimal(item.total))}</Text>
            </View>
          </View>
        ))}
      {/* </ScrollView> */}
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
    // maxHeight: 490, // Adjust this based on your UI needs
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  merchantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  lastMerchant: {
    borderBottomWidth: 0,
    paddingVertical: 0,
    paddingTop: 8
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

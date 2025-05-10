import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DefaultStyle} from '../../utils/DefaultStyle';
import TransactionCard from '../../components/TransactionCard';
import CategoryModal from '../../components/CategoryModal';
import { executeQuery } from '../../helper/SqlHelper';
import { groupExpensesOnMerchants } from '../../utils/helper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { THEME_COLOR } from '../../constants/Colour';
import SearchBar from '../../components/SearchBar';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const [noSearchFound, setNoSearchFound] = useState('');

  const originalExpensesRef = React.useRef([]);

  useEffect(() => {
    fetchUnCategorizedExpenses();
  }, []);

  const fetchUnCategorizedExpenses = async () => {
    // fetch the uncategorized transactions
    // TODO: table name should be coming from constants
    const query = `SELECT * FROM expenses WHERE category IS NULL OR category = '' OR category = 'Unknown'`;
    const unCategorizedExpenses = await executeQuery(query);
    const groupedExpenses = groupExpensesOnMerchants(unCategorizedExpenses);

    originalExpensesRef.current = groupedExpenses;
    setTransactions(groupedExpenses);
  }

  const handleCategorize = (expense) => {
    setSelectedExpense(expense);
    setModalVisible(true);
  };

  const onSelectCategory = async (category) => {
    // update all expenses with merchant name as selectedExpense.merchant with the selected category
    // TODO: table name should be coming from constants
    const updateQuery = `UPDATE expenses SET category = '${category}' WHERE merchant = '${selectedExpense.merchant}' AND category = 'Unknown'`;
    await executeQuery(updateQuery);
    fetchUnCategorizedExpenses();
    setModalVisible(false);
  }

  const handleSearch = query => {
    const originalExpenses = originalExpensesRef.current;

    if (!originalExpenses || originalExpenses.length === 0) {
      console.log('No Un-categorized Expenses!');
      return;
    }

    const filteredData = originalExpenses.filter(expense =>
      expense.merchant.toLowerCase().includes(query.toLowerCase()),
    );
    if (filteredData.length === 0) {
      setNoSearchFound(query);
    } else {
      setNoSearchFound('');
    }
    setTransactions(filteredData);
  }

  return (
    <View style={styles.theme}>
      <View>
        <Text style={DefaultStyle.headerTitle}>Un-Categorized Expenses</Text>
        <View style={DefaultStyle.itemsCenter}>
          <SearchBar placeholder="Search Merchant" onSearch={handleSearch} />
        </View>
      </View>
      <View style={[DefaultStyle.container, {paddingVertical: 0}]}>
        {transactions.length > 0 ? (
          <FlatList
            data={transactions}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <TransactionCard
                transaction={item}
                onCategorize={handleCategorize}
              />
            )}
          />
        ) : (
          <View style={{ marginVertical: 'auto' }}>
            <Icon name="playlist-check" style={styles.noTransactionsIcon} />
            <Text style={styles.noTransactions}>
              No uncategorized transactions found.
            </Text>
          </View>
        )}
      </View>
      <CategoryModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectCategory={onSelectCategory}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  theme: {
    backgroundColor: '#f4f4f4',
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  noTransactions: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    color: THEME_COLOR.textSecondary,
  },
  noTransactionsIcon: {
    fontSize: 100,
    textAlign: 'center',
    marginTop: 20,
    color: THEME_COLOR.textSecondary,
  },
});

export default Transactions;

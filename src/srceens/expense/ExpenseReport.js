import { View, Text } from "react-native";
import useSmsTransactionListener from "./useSmsTransactionListener";

const ExpenseReport = () => {
  const { transactions } = useSmsTransactionListener();
  const generateReport = () => {
    return transactions.reduce((acc, { category, amount }) => {
      const amt = parseFloat(amount.replace(/,/g, ""));
      acc[category] = (acc[category] || 0) + amt;
      return acc;
    }, {});
  };

  const report = generateReport();
  return (
    <View>
      {Object.entries(report).map(([category, amount]) => (
        <Text key={category}>{category}: ₹{amount.toFixed(2)}</Text>
      ))}
    </View>
  );
};

export default ExpenseReport;
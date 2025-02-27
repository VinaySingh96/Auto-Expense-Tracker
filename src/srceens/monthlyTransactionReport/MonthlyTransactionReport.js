import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import { generateDateByMonthAndYear } from '../../utils/helper';
import DonutChart from '../charts/DonutChart';
import DateSelector from '../../components/DateSelector';
import BarChart from '../charts/CustomBarChart';
import Statistics from '../charts/CustomBarChart';
import { fetchExpensesBetweenDateRange } from '../../helper/SqlHelper';
import { CategoryColors } from '../../constants/ExpenseCategories';
import { DefaultStyle } from '../../utils/DefaultStyle';
import SingleSelectChips from '../../components/SingleSelectChips';
import Top10Merchants from './Top10Merchants';

const MonthlyTransactionReport = () => {
  const currentDate = new Date();

  const [chartData, setChartData] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [year, setYear] = useState(currentDate.getFullYear());

  useEffect(() => {
    generateSelectedMonthReport();
  }, [month, year]);

  const prepareReportForChart = (expenses) => {
    const groupedExpenses = {};
    for (const expense of expenses) {
      if (!groupedExpenses[expense.category])
        groupedExpenses[expense.category] = [];
      groupedExpenses[expense.category].push(expense);
    }
    const expenseData = [];
    for (const category of Object.keys(groupedExpenses)) {
      const totalAmount = groupedExpenses[category].reduce(
        (acc, expense) => acc + expense.amount,
        0,
      );
      expenseData.push({
        label: category || 'Others',
        value: totalAmount,
        color: CategoryColors[category] || 'gray',
        text: category || 'Others672'
      });
    }
    
    return expenseData;
  };

  const fetchExpensesByMonthAndYear = async (month, year) => {
    // 1. generate startSate and endDate from month and year (format : 2024-01-01)
    const startDate = generateDateByMonthAndYear(month, year);
    const endDate = generateDateByMonthAndYear(month+1, year);

    const expenses = await fetchExpensesBetweenDateRange(
      startDate,
      endDate,
    );
    // const totalAmount = expenses.reduce((acc, expense) => {
    //   acc += expense.amount;
    //   return acc;
    // }, 0);
    // console.log('total expense = ', totalAmount);
    // generateData(expenses);
    setExpenses(expenses);
    return expenses;
  };

  // will be called in use-effect
  const generateSelectedMonthReport = async () => {
    const expenses = await fetchExpensesByMonthAndYear(month, year);
    const expenseData = prepareReportForChart(expenses);
    setChartData(expenseData);
  }

  const handleDateChange = async ({ month, year }) => {
    setMonth(month+1);
    setYear(year);
  }

  return (
    <View style={DefaultStyle.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Monthly Expense Report</Text>
        <DateSelector onDateChange={handleDateChange} />
      </View>
      {/* <ScrollView contentContainerStyle={styles.scrollContent}> */}
        <DonutChart data={chartData} />
        {/* <SingleSelectChips /> */}
        {/* <BarChart /> */}
        {/* <Statistics /> */}
      {/* </ScrollView> */}
        <Top10Merchants expenses={expenses} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
    marginVertical: 10
  },
  header: {
    marginBottom: 10
  },
})

export default MonthlyTransactionReport;

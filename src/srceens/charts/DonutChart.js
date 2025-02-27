import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChartPro } from 'react-native-gifted-charts';
import { roundToDecimal } from '../../utils/Amount';
import { formatToIndianRupee } from '../../utils/helper';
import Accordion from '../../components/Accordion';
import { THEME_COLOR } from '../../constants/Colour';

const DonutChart = ({ data }) => {
  const [chartData, setChartData] = useState([]);
  const [legendData, setLegendData] = useState([]);

  useEffect(() => {
    // Sort legend data descending by value
    setLegendData([...data].sort((a, b) => b.value - a.value));

    // Calculate total value from original data
    const totalValue = data.reduce((acc, item) => acc + item.value, 0);
    const thresholdValue = totalValue * 0.03;
    const filteredData = [];
    let othersTotal = 0;

    data.forEach(item => {
      if (item.value > thresholdValue) {
        filteredData.push(item);
      } else {
        othersTotal += item.value;
      }
    });

    if (othersTotal > 0) {
      filteredData.push({
        label: 'Others',
        value: othersTotal,
        color: 'gray',
        text: 'Others'
      });
    }
    // Sort filteredData descending by value
    filteredData.sort((a, b) => b.value - a.value);
    setChartData(filteredData);
  }, [data]);

  // Calculate total from the filtered data
  const total = roundToDecimal(
    chartData.reduce((acc, expense) => acc + expense.value, 0)
  );

  return (
    <View style={styles.container}>
      {/* Donut Chart */}
      <View style={styles.chartContainer}>
        <PieChartPro
          data={chartData}
          donut
          showText
          textColor="#333"
          radius={110}
          innerRadius={55}
          textSize={10}
          showTextBackground
          fontWeight="bold"
          fontStyle="italic"
          showValuesAsLabels
          showTooltip
          showValuesAsTooltipText
          centerLabelComponent={() => (
            <View style={styles.centerLabel}>
              <Text style={styles.centerLabelTitle}>Total</Text>
              <Text style={styles.centerLabelValue}>
                {formatToIndianRupee(total)}
              </Text>
            </View>
          )}
        />
      </View>

      {/* Legend */}
      <View style={styles.legendContainerWrapper}>
        <Accordion title="Expenditure Details">
          <View style={styles.legendContainer}>
            {legendData.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View
                  style={[styles.colorIndicator, { backgroundColor: item.color }]}
                />
                <View style={styles.legendInfo}>
                  <Text style={styles.legendText}>{item.label}</Text>
                  <Text style={styles.legendPercentage}>
                    {roundToDecimal((item.value / total) * 100)}%
                  </Text>
                  <Text style={styles.legendValue}>
                    ₹ {roundToDecimal(item.value)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </Accordion>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: THEME_COLOR.light,
  },
  chartContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  centerLabel: {
    alignItems: 'center',
  },
  centerLabelTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  centerLabelValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  legendContainerWrapper: {
    width: '100%',
    paddingHorizontal: 10,
  },
  // Adding a minHeight ensures the Accordion content always has a measurable height,
  // so even if there's only one item, the text will be visible.
  legendContainer: {
    paddingHorizontal: 8,
    minHeight: 45,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  colorIndicator: {
    width: 16,
    height: 16,
    marginRight: 6,
    borderRadius: 8,
    alignSelf: 'center',
  },
  legendInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  legendText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    width: '40%',
  },
  legendPercentage: {
    fontSize: 12,
    color: '#555',
    marginRight: 8,
  },
  legendValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#28A745',
  },
});

export default React.memo(DonutChart);

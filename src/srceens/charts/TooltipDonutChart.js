import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { PieChartPro } from 'react-native-gifted-charts';
import { roundToDecimal } from '../../utils/Amount';
import { formatToIndianRupee } from '../../utils/helper';
import Accordion from '../../components/Accordion';
const defaultData = [
  { value: 40, label: 'Entertainment', color: '#f39c12', tooltipText: 'hello', text: 'vinay' },
  { value: 30, label: 'Food', color: '#e74c3c', tooltipText: 'hello', text: 'vinay' },
  { value: 20, label: 'Travel', color: '#8e44ad', tooltipText: 'hello', text: 'vinay' },
  { value: 10, label: 'Other', color: '#3498db', tooltipText: 'hello', text: 'vinay' },
];
const TooltipDonutChart = ({ data = defaultData }) => {
  const [chartData, setChartData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const sortedData = [...data].sort((a, b) => b.value - a.value);
    setChartData(sortedData);
  }, [data]);

  const total = roundToDecimal(
    chartData.reduce((acc, expense) => acc + expense.value, 0),
  );

  // Handle tooltip visibility
  const handleTooltip = (item, event) => {
    const { locationX: x, locationY: y } = event.nativeEvent;
    setSelectedItem(item);
    setTooltipPosition({ x: x + 20, y: y - 20 }); // Adjust position offset
  };

  return (
    <TouchableWithoutFeedback onPress={() => setSelectedItem(null)}>
      <View style={styles.container}>
        {/* Donut Chart with Tooltip */}
        <PieChartPro
          data={chartData}
          donut
          showText
          textColor="#333"
          radius={110}
          innerRadius={55}
          textSize={15}
          focusOnPress={true} // Enable press interaction
          onPress={(item, event) => handleTooltip(item, event)}
          showTooltip
          tooltipDuration={1000}
          tooltipWidth={100}
          showValuesAsTooltipText={true}
          tooltipComponent={() => (
            selectedItem && (
              <View
                style={[
                  styles.tooltip,
                  { left: tooltipPosition.x, top: tooltipPosition.y },
                ]}>
                <Text style={styles.tooltipText}>
                  {selectedItem.label}
                </Text>
                <Text style={styles.tooltipText}>
                  ₹{roundToDecimal(selectedItem.value)}
                </Text>
              </View>
            )
          )}
          centerLabelComponent={() => (
            <View style={styles.centerLabel}>
              <Text style={styles.centerLabelTitle}>Total</Text>
              <Text style={styles.centerLabelValue}>
                {formatToIndianRupee(total)}
              </Text>
            </View>
          )}
        />

        {/* Legend */}
        <Accordion title="Expenditure Details">
          <View style={styles.legendContainer}>
            {chartData.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View
                  style={[styles.colorIndicator, { backgroundColor: item.color }]}
                />
                <View>
                  <Text style={styles.legendText}>
                    {item.label.length > 14
                      ? `${item.label.slice(0, 12)}...`
                      : item.label}
                    : {roundToDecimal((item.value / total) * 100)}%
                  </Text>
                  <Text style={{ color: '#28A745' }}>
                    ₹ {roundToDecimal(item.value)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </Accordion>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  // ... keep existing styles ...
  container: {
    alignItems: 'center',
    paddingVertical: 10,
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
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    padding: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    marginHorizontal: 10,
    width: '40%',
  },
  colorIndicator: {
    width: 14,
    height: 14,
    marginRight: 6,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#444',
  },
  colorIndicator: {
    width: 14,
    height: 14,
    marginRight: 6,
    borderRadius: 4,
    alignSelf: 'flex-start', // Aligns the color box to the top
  },
  legendInfo: {
    // no container changes
  },
  legendLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#444',
  },
  legendDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
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

  // Tooltip Styles
  tooltip: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    zIndex: 1000,
  },
  tooltipText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default React.memo(TooltipDonutChart);
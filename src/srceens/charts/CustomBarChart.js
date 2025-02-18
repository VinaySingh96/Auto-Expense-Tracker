import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

const CustomBarChart = () => {
  const [barData, setBarData] = useState([
    { value: 230, label: 'Jan', frontColor: '#4ABFF4' },
    { value: 180, label: 'Feb', frontColor: '#79C3DB' },
    { value: 195, label: 'Mar', frontColor: '#28B2B3' },
    { value: 250, label: 'Apr', frontColor: '#4ADDBA' },
    { value: 320, label: 'May', frontColor: '#91E3E3' },
  ]);

  const updateData = () => {
    setBarData(prevData =>
      prevData.map(item => ({
        ...item,
        value: item.value + Math.random() * 50,
      }))
    );
  };

  return (
    <View>
      <BarChart
        data={barData}
        // isAnimated={true}
        // animationDuration={1000} // Ensure animation duration is provided
        showFractionalValue
        showYAxisIndices
        noOfSections={7}
        maxValue={400}
      />
      <Button title="Update Data" onPress={updateData} />
    </View>
  );
};

export default React.memo(CustomBarChart);

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import CustomModal from './CustomModal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const DateSelector = ({
  onDateChange,
  showArrows = true,
  includeDay = false,
}) => {
  if (!onDateChange)
    throw new Error(
      'DateSelector :: Callback function onDateChange is required!',
    );

  const currentDate = new Date();
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(
    currentDate.getMonth(),
  );
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedDay, setSelectedDay] = useState(currentDate.getDate());
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const daysInMonth = new Date(
      selectedYear,
      selectedMonthIndex + 1,
      0,
    ).getDate();
    if (includeDay && selectedDay > daysInMonth) {
      setSelectedDay(daysInMonth);
    }
  }, [selectedMonthIndex, selectedYear, includeDay]);

  useEffect(() => {
    onDateChange({
      month: selectedMonthIndex,
      year: selectedYear,
      ...(includeDay && {day: selectedDay}),
    });
  }, [selectedMonthIndex, selectedYear, selectedDay, includeDay, onDateChange]);

  const handlePrevious = () => {
    setSelectedMonthIndex(prevIndex => {
      const newIndex = prevIndex === 0 ? 11 : prevIndex - 1;
      if (newIndex === 11) setSelectedYear(prevYear => prevYear - 1);
      return newIndex;
    });
  };

  const handleNext = () => {
    if (isNextDisabled()) return;
    setSelectedMonthIndex(prevIndex => {
      const newIndex = prevIndex === 11 ? 0 : prevIndex + 1;
      if (newIndex === 0) setSelectedYear(prevYear => prevYear + 1);
      return newIndex;
    });
  };

  const handleMonthPress = index => {
    const daysInMonth = new Date(selectedYear, index + 1, 0).getDate();
    if (includeDay && selectedDay > daysInMonth) {
      setSelectedDay(daysInMonth);
    }
    setSelectedMonthIndex(index);

    !includeDay && setModalVisible(false);
  };

  const handleDayPress = day => {
    setSelectedDay(day);
    setModalVisible(false);
  };

  const handlePrevYearPress = () => {
    const newYear = selectedYear - 1;
    setSelectedYear(newYear);
  };

  const handleNextYearPress = () => {
    if (selectedYear === new Date().getFullYear()) return;
    setSelectedYear(prev => prev + 1);
  };

  const isNextDisabled = () => {
    const currentDate = new Date();
    return (
      selectedYear === currentDate.getFullYear() &&
      selectedMonthIndex === currentDate.getMonth()
    );
  };

  const daysInMonth = new Date(
    selectedYear,
    selectedMonthIndex + 1,
    0,
  ).getDate();
  const daysArray = Array.from({length: daysInMonth}, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      {showArrows && (
        <TouchableOpacity onPress={handlePrevious} style={styles.arrowButton}>
          <Icon name="chevron-left" size={30} />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.monthButton}>
        {!showArrows && <Icon name="calendar-edit" size={24} />}
        <Text style={styles.monthText}>
          {includeDay ? `${selectedDay} ` : ''}
          {months[selectedMonthIndex]} {selectedYear}
        </Text>
        <Icon name="menu-down" size={20} />
      </TouchableOpacity>

      {showArrows && (
        <TouchableOpacity onPress={handleNext} style={styles.arrowButton}>
          <Icon
            name="chevron-right"
            size={30}
            color={isNextDisabled() ? 'gray' : '#000'}
          />
        </TouchableOpacity>
      )}

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Select Date">
        {/* <TouchableWithoutFeedback onPress={() => setModalVisible(false)}> */}
        <View style={styles.dateContainer}>
          <View style={styles.yearSelect}>
            <TouchableOpacity onPress={handlePrevYearPress}>
              <Icon name="chevron-left" size={36} />
            </TouchableOpacity>
            <Text style={styles.year}>{selectedYear}</Text>
            <TouchableOpacity onPress={handleNextYearPress}>
              <Icon
                name="chevron-right"
                size={36}
                color={
                  selectedYear === new Date().getFullYear() ? 'gray' : 'black'
                }
              />
            </TouchableOpacity>
          </View>

          {/* <TouchableWithoutFeedback> */}
          <ScrollView keyboardShouldPersistTaps="always">
            <View style={styles.monthContainer}>
              {months.map((month, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleMonthPress(index)}>
                  <Text
                    style={[
                      styles.month,
                      index === selectedMonthIndex && styles.monthActive,
                    ]}>
                    {month}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {includeDay && (
              <View style={styles.daySection}>
                <Text style={styles.sectionHeader}>Select Day</Text>
                <View style={styles.daysGrid}>
                  {daysArray.map(day => (
                    <TouchableOpacity
                      key={day}
                      onPress={() => handleDayPress(day)}
                      style={[
                        styles.dayButton,
                        day === selectedDay && styles.dayActive,
                      ]}>
                      <Text
                        style={
                          day === selectedDay
                            ? styles.dayTextActive
                            : styles.dayText
                        }>
                        {day}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </ScrollView>
          {/* </TouchableWithoutFeedback> */}
        </View>
        {/* </TouchableWithoutFeedback> */}
      </CustomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 6,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  arrowButton: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    // paddingHorizontal: 12,
    borderRadius: 8,
  },
  monthText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  dateContainer: {
    width: '100%',
    // marginTop: 12,
    paddingHorizontal: 12,
    marginBottom: 90,
  },
  yearSelect: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginBottom: 4,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  year: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
  },
  monthContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginTop: 4,
  },
  month: {
    fontSize: 16,
    fontWeight: '600',
    height: 60,
    width: 60,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 30,
    backgroundColor: '#E8EAF6',
    color: '#3F51B5',
    overflow: 'hidden',
  },
  monthActive: {
    backgroundColor: '#3F51B5',
    color: '#fff',
  },
  daySection: {
    marginTop: 16,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'flex-start',
  },
  dayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8EAF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayActive: {
    backgroundColor: '#3F51B5',
  },
  dayText: {
    color: '#3F51B5',
  },
  dayTextActive: {
    color: '#fff',
  },
});

export default DateSelector;

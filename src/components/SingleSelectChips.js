import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const SingleSelectChips = () => {
  // Sample data for chips
  const chipData = ['Grocery', 'Food', 'Transport', 'Utilities', 'Shopping'];

  // State to track the currently selected chip
  const [selectedChip, setSelectedChip] = useState(null);

  // Function to handle chip selection
  const selectChip = (chip) => {
    if (selectedChip === chip) {
      // Deselect if the same chip is clicked again
      setSelectedChip(null);
    } else {
      // Select the new chip
      setSelectedChip(chip);
    }
  };

  return (
    <View style={styles.container}>
      {chipData.map((chip, index) => (
        <Pressable
          key={index}
          style={[
            styles.chip,
            selectedChip === chip && styles.selectedChip,
          ]}
          onPress={() => selectChip(chip)}
        >
          <Text
            style={[
              styles.chipText,
              selectedChip === chip && styles.selectedChipText,
            ]}
          >
            {chip}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    margin: 4,
  },
  selectedChip: {
    backgroundColor: '#4CAF50',
  },
  chipText: {
    color: '#333',
    fontSize: 14,
  },
  selectedChipText: {
    color: '#fff',
  },
});

export default SingleSelectChips;
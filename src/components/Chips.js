import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const Chips = () => {
  // Sample data for chips
  const chipData = ['Grocery', 'Food', 'Transport', 'Utilities', 'Shopping'];

  // State to track selected chips
  const [selectedChips, setSelectedChips] = useState([]);

  // Function to handle chip selection/deselection
  const toggleChip = (chip) => {
    if (selectedChips.includes(chip)) {
      // Deselect chip
      setSelectedChips(selectedChips.filter((item) => item !== chip));
    } else {
      // Select chip
      setSelectedChips([...selectedChips, chip]);
    }
  };

  return (
    <View style={styles.container}>
      {chipData.map((chip, index) => (
        <Pressable
          key={index}
          style={[
            styles.chip,
            selectedChips.includes(chip) && styles.selectedChip,
          ]}
          onPress={() => toggleChip(chip)}
        >
          <Text
            style={[
              styles.chipText,
              selectedChips.includes(chip) && styles.selectedChipText,
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

export default Chips;
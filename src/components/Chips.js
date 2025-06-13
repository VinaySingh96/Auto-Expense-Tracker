import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const Chips = ({ chipData = ['Grocery', 'Food', 'Transport'], handleChipSelect }) => {
  // State to track selected chips
  const [selectedChips, setSelectedChips] = useState([]);

  // Function to handle chip selection/deselection
  const toggleChip = (chip) => {
    let updatedChips;
    if (selectedChips.includes(chip)) {
      // Deselect chip
      updatedChips = selectedChips.filter((item) => item !== chip);
    } else {
      // Select chip
      updatedChips = [...selectedChips, chip];
    }
    setSelectedChips(updatedChips);
    handleChipSelect(updatedChips); // Pass the updated selection to the parent
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
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
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

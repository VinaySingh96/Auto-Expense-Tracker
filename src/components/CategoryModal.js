import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomModal from './CustomModal';
import { ExpenseCategories, CategoryColors, CategoryIcons } from '../constants/ExpenseCategories';

const numColumns = 4;
const screenWidth = Dimensions.get('window').width;
const itemWidth = (screenWidth - 130) / numColumns;

const CategoryModal = ({ visible, onClose, onSelectCategory }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onSelectCategory(item)}
    >
      <MaterialCommunityIcons name={CategoryIcons[item]} size={24} color={CategoryColors[item]} style={styles.icon} />
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <CustomModal visible={visible} onClose={onClose} title="Select a category">
      {/* Add View with flex: 1 to enable scrolling */}
      <View style={{ flex: 1, width: '100%' }}>
        <FlatList
          data={Object.keys(ExpenseCategories)}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.name}-${index}`} // Ensure unique key
          numColumns={4}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        />
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    rowGap: 6,
    marginBottom: 200,
  },
  itemContainer: {
    flexDirection: 'column',
    paddingVertical: 10,
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 11,
    marginTop: 2,
    maxWidth: 70,
    textAlign: 'center'
  },
  icon: {
    textAlign: 'center'
  }
});

export default CategoryModal;
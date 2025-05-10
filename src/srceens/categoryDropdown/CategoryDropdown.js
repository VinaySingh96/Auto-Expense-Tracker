import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CategoryModal from '../../components/CategoryModal';
import {DefaultStyle} from '../../utils/DefaultStyle';
import {
  CategoryIcons,
  ExpenseCategories,
} from '../../constants/ExpenseCategories';
import { THEME_COLOR } from '../../constants/Colour';

const CategoryDropdown = ({value, onSelect}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const onSelectCategory = category => {
    setSelectedCategory(category);
    onSelect(category);
    setModalVisible(false);
  };
  return (
    <View>
      {/* Dropdown Trigger Button */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.dropdownButton}>
        <View style={DefaultStyle.flexRow}>
          {/* icon = format-list-bulleted */}
          <Icon name={CategoryIcons[value] || 'label-outline'} size={24} />
          <Text style={styles.dropdownButtonText}>
            {value || 'Select Category'}
          </Text>
        </View>
        <Icon name="menu-down" size={24} color="#000" />
      </TouchableOpacity>
      <CategoryModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectCategory={onSelectCategory}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: THEME_COLOR.textSecondary,
  },
});

export default CategoryDropdown;

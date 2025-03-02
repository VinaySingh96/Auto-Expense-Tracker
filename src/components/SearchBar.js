import React, { useState, useCallback } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

const SearchBar = ({ placeholder, onSearch }) => {
  const [text, setText] = useState('');

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Debounced version of onSearch
  const debouncedSearch = useCallback(debounce(onSearch, 300), []);

  const handleChange = (newText) => {
    setText(newText);
    debouncedSearch(newText);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={handleChange}
        placeholder={placeholder || 'Search...'}
        placeholderTextColor="#888"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Icon name={'search'} size={24} color={'gray'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
    // width: 200,
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
});

export default SearchBar;

// SearchBar.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const SearchBar = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    if (searchText.trim() !== '') {
      navigation.navigate('productsList', { query: searchText });
      setSearchText('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputBox}
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Searching..."
        placeholderTextColor="#666"
      />
      <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
        <FontAwesome name="search" style={styles.iconSearch} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  inputBox: {
    flex: 1,
    borderWidth: 0.3,
    height: 40,
    color: '#000000',
    backgroundColor: '#ffffff',
    paddingLeft: 10,
    fontSize: 16,
    borderRadius: 5,
  },
  searchBtn: {
    position: 'absolute',
    right: 10,
  },
  iconSearch: {
    color: '#000000',
    fontSize: 18,
  },
});

export default SearchBar;
import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { getAllProducts } from '../../redux/features/productActions';

const SearchBar = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const searchTimeout = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(searchTimeout.current);
    };
  }, []);

  const handleSearch = (text) => {
    setSearchText(text); // Cập nhật state searchText

    clearTimeout(searchTimeout.current); // Xóa timeout trước đó

    // Chỉ tìm kiếm sau khi người dùng ngừng nhập liệu một khoảng thời gian
    searchTimeout.current = setTimeout(() => {
      if (text.trim() !== '') {
        // Dispatch getAllProducts với từ khóa tìm kiếm
        dispatch(getAllProducts('', '', 1, 10, text));
        navigation.navigate('productsList', { query: text });
      } else {
        // Nếu không có từ khóa, hiển thị tất cả sản phẩm
        dispatch(getAllProducts('', '', 1, 10, ''));
        navigation.navigate('productsList', { query: '' });
      }
    }, 300); // Đợi 300ms sau khi người dùng ngừng nhập
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputBox}
        value={searchText}
        onChangeText={handleSearch} // Gọi handleSearch khi text thay đổi
        placeholder="Searching..."
        placeholderTextColor="#666"
      />
      <TouchableOpacity style={styles.searchBtn} onPress={() => handleSearch(searchText)}>
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
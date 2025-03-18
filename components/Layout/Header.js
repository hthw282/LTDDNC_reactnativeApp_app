import { View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation(); // Lấy navigation từ hook
  const [searchText, setSearchText] = useState('');

  // Xử lý tìm kiếm
  const handleSearch = () => {
    if (searchText.trim() !== '') {
      navigation.navigate('productsList', { query: searchText }); // Điều hướng với từ khóa tìm kiếm
      setSearchText('');
    }
  };

  return (
    <View style={styles.header}>
      {/* Nút quay lại */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" style={styles.icon} />
      </TouchableOpacity>

      {/* Thanh tìm kiếm */}
      <View style={styles.container}>
        <TextInput
          style={styles.inputBox}
          value={searchText}
          onChangeText={setSearchText} // Đúng cú pháp
          placeholder="Tìm kiếm..."
          placeholderTextColor="#666"
        />
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <FontAwesome name="search" style={styles.iconSearch} />
        </TouchableOpacity>
      </View>

      {/* Nút thông báo */}
      <TouchableOpacity style={styles.notiButton}>
        <Ionicons name="notifications" style={styles.icon} />
      </TouchableOpacity>

      {/* Avatar */}
      <TouchableOpacity style={styles.avatarContainer}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/300' }} // Avatar mẫu
          style={styles.avatar}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 70,
    backgroundColor: 'lightgray',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
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
  icon: {
    color: '#000000',
    fontSize: 25,
  },
  notiButton: {
    padding: 10,
  },
  avatarContainer: {
    padding: 5,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
});

export default Header;

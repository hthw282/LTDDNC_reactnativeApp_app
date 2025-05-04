import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import SearchBar from '../Products/SearchBar';

const Header = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.user);

  const handleGoToNotifications = () => {
    navigation.navigate('notifications');
  };

  const handleGoToAccount = () => {
    navigation.navigate('account');
  };

  return (
    <View style={styles.header}>
      {/* Nút quay lại */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" style={styles.icon} />
      </TouchableOpacity>

      {/* Thanh tìm kiếm  */}
      <SearchBar />

      {/* Nút thông báo */}
      <TouchableOpacity style={styles.notiButton} onPress={handleGoToNotifications}>
        <Ionicons name="notifications" style={styles.icon} />
      </TouchableOpacity>

      {/* Avatar */}
      <TouchableOpacity style={styles.avatarContainer} onPress={handleGoToAccount}>
        <Image
          source={{ uri: user?.profilePic?.url || 'https://i.pravatar.cc/300' }}
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
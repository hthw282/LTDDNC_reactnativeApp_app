import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { cancelOrder } from '../../redux/features/orderActions';
import { useNavigation } from '@react-navigation/native';

const OrderItem = ({ item }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleOrderDetail = () => {
    alert('Order Detail clicked');
  };

  const handleCancel = async () => {
    const orderTime = new Date(item.createdAt).getTime(); // Giả sử có createdAt
    const currentTime = new Date().getTime();
    const cancelTimeLimit = 30 * 60 * 1000; // 30 phút

    if (currentTime - orderTime > cancelTimeLimit) {
      Alert.alert('Thông báo', 'Đơn hàng đã quá hạn hủy.');
      return;
    }

    await dispatch(cancelOrder(item._id));
    Alert.alert('Thông báo', 'Đơn hàng đã hủy thành công.');
    navigation.replace('my-orders');
    //load lại trang
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item.orderItems?.[0]?.image || 'https://via.placeholder.com/60' }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.orderId}>ID: {item._id.substring(0, 20)}</Text>
        <Text style={styles.orderStatus}>{item.orderStatus}</Text>
        <Text style={styles.orderName}>
          {item.orderItems?.[0]?.name ? item.orderItems[0].name.substring(0, 20) : 'No Name'}...
        </Text>
        <Text style={styles.totalAmount}>Total: {item.totalAmount.toLocaleString('vi-VN')}đ</Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.detailButton} onPress={handleOrderDetail}>
          <Text style={styles.buttonText}>Detail</Text>
        </TouchableOpacity>
        {(item.orderStatus === 'new' || item.orderStatus === 'preparing') && (
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 15,
  },
  orderId: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  orderName: {
    fontSize: 13,
    color: '#666',
    marginVertical: 4,
  },
  totalAmount: {
    fontSize: 14,
    color: '#000',
  },
  actionsContainer: {
    alignItems: 'center',
  },
  orderStatus: {
    fontSize: 12,
    color: 'green',
    fontWeight: 'bold',
  },
  detailButton: {
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 12,
    color: '#fff',
  },
});

export default OrderItem;

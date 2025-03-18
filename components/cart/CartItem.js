import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartItem = ({ item, updateCart }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const handlePlusQty = async () => {
    if (quantity >= 10) {
      alert('You can only buy 10 products at a time');
      return;
    }
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    await updateCart(item.productId, newQuantity);
  };

  const handleMinusQty = async () => {
    if (quantity <= 1) {
      alert('You must have at least 1 product in the cart');
      return;
    }
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    await updateCart(item.productId, newQuantity);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.name}>Price: {item.price.toLocaleString('vi-VN')} đ</Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btnQty} onPress={handleMinusQty}>
          <Text style={styles.btnQtyText}>-</Text>
        </TouchableOpacity>
        <Text>{quantity}</Text>
        <TouchableOpacity style={styles.btnQty} onPress={handlePlusQty}>
          <Text style={styles.btnQtyText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 12,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnQty: {
    backgroundColor: 'lightgray',
    width: 30,
    alignItems: 'center',
    marginHorizontal: 5,
    padding: 5,
  },
  btnQtyText: {
    fontSize: 18,
  },
});

export default CartItem;

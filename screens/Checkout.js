import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Layout from '../components/Layout/Layout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from '../redux/features/orderActions.js';

const Checkout = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { itemPrice, tax, shipping, total } = route.params;

  // Lấy thông tin người dùng từ Redux
  const { user } = useSelector((state) => state.user) || {};
  
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await AsyncStorage.getItem("cart");
        const parsedCartItems = cartData ? JSON.parse(cartData) : [];
        setCartItems(parsedCartItems);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, []);

  const handleCOD = async () => {
    const orderData = {
      shippingInfo: {
        country: user?.country || "No country",
        city: user?.city || "No city",
        address: user?.address || "No address",
      },
      orderItems: cartItems.map(item => ({
        product: item.productId,  // Đảm bảo có productId
        quantity: item.quantity,  // Đảm bảo có quantity
        price: item.price,        // Đảm bảo có price
        image: item.image || "https://via.placeholder.com/150", // Nếu thiếu ảnh, dùng ảnh mặc định
        name: item.name || "Unknown Product", // Nếu thiếu tên, dùng tên mặc định
      })),
      paymentMethod: "COD",
      paymentInfo: null,
      itemPrice,
      tax,
      shippingCharges: shipping,
      totalAmount: total,
    };
  
    dispatch(createOrder(orderData));
    await AsyncStorage.removeItem("cart"); // Xóa giỏ hàng
    alert('Your order has been placed successfully');
    navigation.navigate("home");
  };
  

  const handleOnline = () => {
    alert('You will be redirected to payment gateway');
    navigation.navigate('payment');
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.heading}>Payment Options</Text>
        <Text style={styles.price}>Shipping Info: {user ? user.address || "No address" : "No user logged in"}</Text>
        <Text style={styles.price}>Payment Method: COD</Text>
        <Text style={styles.price}>Item Price: ${itemPrice}</Text>
        <Text style={styles.price}>Tax: ${tax}</Text>
        <Text style={styles.price}>Shipping Charges: ${shipping}</Text>
        <Text style={styles.price}>Total Amount: ${total}</Text>

        <View style={styles.paymentCard}>
          <Text style={styles.paymentHeading}>Select your Payment Mode</Text>
          <TouchableOpacity style={styles.paymentBtn} onPress={handleCOD}>
            <Text style={styles.paymentBtnText}>Cash on Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentBtn} onPress={handleOnline}>
            <Text style={styles.paymentBtnText}>Online (CREDIT | DEBIT CARD)</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '90%',
  },
  heading: {
    fontSize: 25,
    fontWeight: '700',
    marginVertical: 10,
  },
  price: {
    fontSize: 20,
    marginBottom: 10,
    color: 'gray',
  },
  paymentCard: {
    backgroundColor: '#ffffff',
    width: '90%',
    borderRadius: 10,
    padding: 30,
    marginVertical: 10,
  },
  paymentHeading: {
    color: 'gray',
    marginBottom: 10,
  },
  paymentBtn: {
    backgroundColor: '#000000',
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    marginVertical: 10,
  },
  paymentBtnText: {
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default Checkout;

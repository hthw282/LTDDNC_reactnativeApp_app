import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import PriceTable from '../components/cart/PriceTable';
import Layout from '../components/Layout/Layout';
import CartItem from '../components/cart/CartItem';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Cart = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [shipping, setShipping] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      const cartData = await AsyncStorage.getItem("cart");
      const parsedCart = cartData ? JSON.parse(cartData) : [];
      setCartItems(parsedCart);
      calculateTotals(parsedCart);
    };
    fetchCart();
  }, []);
  
  const updateCart = async (productId, quantity) => {
    const updatedCart = cartItems.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );
  
    setCartItems(updatedCart);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotals(updatedCart);
  };

  const calculateTotals = (items) => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const taxAmount = subtotal * 0.005;
    const shippingCost = items.length > 0 ? 20000 : 0;
    setTotal(subtotal + taxAmount + shippingCost);
    setTax(taxAmount);
    setShipping(shippingCost);
  };

  return (
    <Layout>
      <Text style={styles.heading}>
        {cartItems.length > 0 ? `You have ${cartItems.length} items in your cart` : 'Your cart is empty'}
      </Text>
      {cartItems.length > 0 && (
        <>
          <ScrollView>
            {cartItems.map(item => (
              <CartItem item={item} key={item.productId} updateCart={updateCart} />
            ))}
          </ScrollView>
          <View>
            <PriceTable title={'Price'} price={(total - tax - shipping).toLocaleString('vi-VN')} />
            <PriceTable title={'Tax'} price={tax.toLocaleString('vi-VN')} />
            <PriceTable title={'Shipping'} price={shipping.toLocaleString('vi-VN')} />
          </View>
          <View style={styles.total}>
            <PriceTable title={'Total'} price={total.toLocaleString('vi-VN')} />
          </View>
          <TouchableOpacity
            style={styles.btnCheckOut}
            onPress={() =>
              navigation.navigate('checkout', {
                itemPrice: total - tax - shipping,
                tax: tax,
                shipping: shipping,
                total: total,
              })
            }
          >
            <Text style={styles.btnCheckOutText}>CHECKOUT</Text>
          </TouchableOpacity>
        </>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    color: 'green',
    marginTop: 10,
  },
  total: {
    borderWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: '#ffffff',
    padding: 5,
    margin: 5,
    marginHorizontal: 20,
  },
  btnCheckOut: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: '#000000',
    width: '90%',
    marginHorizontal: 20,
    borderRadius: 20,
  },
  btnCheckOutText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Cart;

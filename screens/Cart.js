import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadCartFromServer } from '../redux/features/cartActions';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Divider } from 'react-native-paper';
import { formatPrice } from '../utils/formatPrice';
import CartItem from '../components/cart/CartItem';
import PriceTable from '../components/cart/PriceTable';

const Cart = ({ navigation }) => {
    const [total, setTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [shipping, setShipping] = useState(0);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.cartItems);
    const user = useSelector((state) => state.user);
    const isAuth = useSelector((state) => state.user.isAuth);

    useEffect(() => {
        const fetchCart = async () => {
            if (isAuth && user?.id) {
                dispatch(loadCartFromServer(user.id));
            } else if (!isAuth) {
                const cartData = await AsyncStorage.getItem("cart");
                const parsedCart = cartData ? JSON.parse(cartData) : [];
                dispatch({ type: "setCart", payload: parsedCart });
                calculateTotals(parsedCart);
            }
        };
        fetchCart();
    }, [dispatch, isAuth, user?.id]);

    useEffect(() => {
        calculateTotals(cartItems);
    }, [cartItems]);

    const updateCart = async (productId, quantity) => {
        let updatedCart;
        if (quantity === 0) {
            updatedCart = cartItems.filter(item => item.productId !== productId);
        } else {
            updatedCart = cartItems.map((item) =>
                item.productId === productId ? { ...item, quantity } : item
            );
        }
        dispatch({ type: "setCart", payload: updatedCart });
        try {
            await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
            calculateTotals(updatedCart);
        } catch (error) {
            console.error("Failed to update cart in storage:", error);
        }
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
        <View style={styles.container}>
            <Text style={styles.heading}>
                {cartItems.length > 0
                    ? `You have ${cartItems.length} products in your cart`
                    : 'Your cart is empty'}
            </Text>
            {cartItems.length > 0 && (
                <>
                    <ScrollView style={styles.cartItemsScrollView}>
                        {cartItems.map(item => (
                            <CartItem item={item} key={item.productId} updateCart={updateCart} />
                        ))}
                    </ScrollView>
                    <View style={styles.priceSummary}>
                        <PriceTable title={'Price'} price={formatPrice(total - tax - shipping)} />
                        <PriceTable title={'Tax'} price={formatPrice(tax)} />
                        <PriceTable title={'Shipping Fee'} price={formatPrice(shipping)} />
                        <Divider style={styles.divider} />
                        <PriceTable title={'Total'} price={formatPrice(total)} />
                    </View>
                    <Button
                        mode="contained"
                        style={styles.checkoutButton}
                        disabled={cartItems.length === 0}
                        onPress={() =>
                            navigation.navigate('checkout', {
                                itemPrice: total - tax - shipping,
                                tax: tax,
                                shipping: shipping,
                                total: total,
                                cartItems: cartItems,
                            })
                        }
                    >
                        Checkout
                    </Button>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    heading: {
        textAlign: 'center',
        color: '#3498db',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 15,
    },
    cartItemsScrollView: {
        flexGrow: 1,
        marginBottom: 20,
    },
    priceSummary: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 20,
        elevation: 2
    },
    checkoutButton: {
        paddingVertical: 8,
        borderRadius: 25,
        backgroundColor: '#2ecc71',
    },
    divider: {
        marginVertical: 8,
        backgroundColor: '#bdc3c7'
    }
});

export default Cart;
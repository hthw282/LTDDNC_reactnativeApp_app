import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { createOrder } from '../redux/features/orderActions';
import { formatPrice } from '../utils/formatPrice';

const Checkout = ({ route }) => {
    const { itemPrice, tax, shipping, total, cartItems } = route.params;
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleCOD = async () => {
        const orderData = {
            shippingInfo: {
                country: user?.country || "No country",
                city: user?.city || "No city",
                address: user?.address || "No address",
            },
            orderItems: cartItems.map(item => ({
                product: item.productId,
                quantity: item.quantity,
                price: item.price,
                image: item.image || "https://via.placeholder.com/150", // Fallback image
                name: item.name || "Unknown Product",
            })),
            paymentMethod: "COD",
            paymentInfo: null,
            itemPrice,
            tax,
            shippingCharges: shipping,
            totalAmount: total,
        };

        dispatch(createOrder(orderData));
        alert('Your order has been placed successfully');
        navigation.navigate("home");
    };

    const handleOnlinePayment = () => {
        // TODO: Implement logic for online payment (e.g., navigate to payment gateway)
        alert('Online payment is not yet implemented.');
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Checkout</Text>

            <View style={styles.userInfo}>
                <Text style={styles.sectionTitle}>User Information</Text>
                <Text>Name: {user?.name || 'Guest'}</Text>
                <Text>Email: {user?.email || 'N/A'}</Text>
                <Text>Address: {user?.address || 'Not available'}</Text>
                <Text>City: {user?.city || 'Not available'}</Text>
                <Text>Country: {user?.country || 'Not available'}</Text>
            </View>

            <View style={styles.orderSummary}>
                <Text style={styles.sectionTitle}>Your Order</Text>
                {cartItems.map((item) => (
                    <View key={item.productId} style={styles.cartItem}>
                        <Text>{item.name} x {item.quantity}</Text>
                        <Text>{formatPrice(item.price * item.quantity)}</Text>
                    </View>
                ))}
                <Divider style={styles.divider} />
                <View style={styles.priceRow}>
                    <Text>Item Price:</Text>
                    <Text>{formatPrice(itemPrice)}</Text>
                </View>
                <View style={styles.priceRow}>
                    <Text>Tax:</Text>
                    <Text>{formatPrice(tax)}</Text>
                </View>
                <View style={styles.priceRow}>
                    <Text>Shipping Fee:</Text>
                    <Text>{formatPrice(shipping)}</Text>
                </View>
                <Divider style={styles.divider} />
                <View style={styles.totalRow}>
                    <Text style={styles.totalText}>Total:</Text>
                    <Text style={styles.totalPrice}>{formatPrice(total)}</Text>
                </View>
            </View>

            <View style={styles.paymentOptions}>
                <Text style={styles.sectionTitle}>Choose Payment Method</Text>
                <Button
                    mode="contained"
                    style={styles.codButton}
                    onPress={handleCOD}
                >
                    Cash on Delivery (COD)
                </Button>
                <Button
                    mode="contained"
                    style={styles.onlineButton}
                    onPress={handleOnlinePayment}
                >
                    Online Payment
                </Button>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#3498db',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 10,
        color: '#2c3e50',
    },
    userInfo: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        elevation: 1,
    },
    orderSummary: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        elevation: 1,
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    divider: {
        marginVertical: 10,
        backgroundColor: '#bdc3c7',
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    totalText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    totalPrice: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#2ecc71',
    },
    paymentOptions: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
        elevation: 1,
    },
    codButton: {
        marginTop: 10,
        borderRadius: 5,
        backgroundColor: '#3498db',
    },
    onlineButton: {
        marginTop: 10,
        borderRadius: 5,
        backgroundColor: '#f39c12',
    },
});

export default Checkout;
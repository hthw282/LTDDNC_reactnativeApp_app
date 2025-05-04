import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import { formatPrice } from '../../utils/formatPrice';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/features/cartActions';

const CartItem = ({ item, updateCart }) => {
    const [quantity, setQuantity] = useState(item.quantity);
    const dispatch = useDispatch();

    useEffect(() => {
        setQuantity(item.quantity);
    }, [item.quantity]);

    const handlePlusQty = async () => {
        if (quantity >= 10) {
            alert('You can only purchase a maximum of 10 products per item.');
            return;
        }
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        await updateCart(item.productId, newQuantity);
    };

    const handleMinusQty = async () => {
        if (quantity <= 1) {
            alert('You must have at least 1 item in your cart');
            return;
        }
        const newQuantity = quantity - 1;
        setQuantity(newQuantity);
        await updateCart(item.productId, newQuantity);
    };

    const handleDeleteItem = () => {
        Alert.alert(
            "Delete product",
            `Are you sure you want to remove ${item.name} from your cart?`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: async () => {
                        dispatch(removeFromCart(item.productId)); // Dispatch action to remove from Redux
                        // No need to update AsyncStorage here, it's handled in the action
                    }
                }
            ],
            { cancelable: false }
        );
    };

    return (
        <Card style={styles.cartItemContainer}>
            <Card.Content style={styles.cartItemContent}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.itemDetails}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>
                        Price: {item.price ? formatPrice(item.price) : 'N/A'}
                    </Text>
                </View>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity style={styles.qtyButton} onPress={handleMinusQty}>
                        <Text style={styles.qtyButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{quantity}</Text>
                    <TouchableOpacity style={styles.qtyButton} onPress={handlePlusQty}>
                        <Text style={styles.qtyButtonText}>+</Text>
                    </TouchableOpacity>
                    <IconButton
                    icon="trash-can"
                    size={24}
                    onPress={handleDeleteItem}
                    style={styles.deleteButton}
                    iconColor="#e74c3c" // Màu đỏ cho nút xóa
                />
                </View>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    cartItemContainer: {
        marginVertical: 8,
        elevation: 2,
        backgroundColor: '#fff',
    },
    cartItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        position: 'relative', // Để định vị nút xóa tuyệt đối
    },
    image: {
        height: 80,
        width: 80,
        resizeMode: 'contain',
        marginRight: 16,
        borderRadius: 8,
    },
    itemDetails: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 8,
    },
    price: {
        fontSize: 14,
        color: '#e74c3c',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    qtyButton: {
        backgroundColor: '#3498db',
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8,
    },
    qtyButtonText: {
        fontSize: 18,
        color: '#fff',
    },
    quantity: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#34495e',
    },
    deleteButton: {
        position: 'center',
        padding: 0,
        margin: 0,
    },
});

export default CartItem;

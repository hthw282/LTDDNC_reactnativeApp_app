import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Utility function for formatting price
export const formatPrice = (price) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

const PriceTable = ({ price, title }) => {
    return (
        <View style={styles.priceTableContainer}>
            <Text style={styles.priceTableTitle}>{title}</Text>
            <Text style={styles.priceTablePrice}>{price} VNĐ</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    priceTableContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 4,
    },
    priceTableTitle: {
        fontSize: 16,
        color: '#7f8c8d',
    },
    priceTablePrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
});

export default PriceTable;

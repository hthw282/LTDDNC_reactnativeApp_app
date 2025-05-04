import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { formatPrice } from '../utils/formatPrice';
import { getSingleOrderDetails } from '../redux/features/orderActions';
import CustomRatingBar from '../components/RatingComment/CustomRatingBar';
import { addProductReview } from '../redux/features/productActions';

const OrderDetail = ({ route }) => {
    const { orderId } = route.params;
    const dispatch = useDispatch();
    const { order, loading, error } = useSelector((state) => state.order);
    const { user } = useSelector((state) => state.user); // Get user information
    const [productRatings, setProductRatings] = useState({});
    const [productReviews, setProductReviews] = useState({});

    useEffect(() => {
        dispatch(getSingleOrderDetails(orderId));
    }, [dispatch, orderId]);

    if (loading) {
        return <View style={styles.loadingContainer}><ActivityIndicator size="large" /></View>;
    }

    if (error) {
        return <View style={styles.errorContainer}><Text>Error loading order details: {error}</Text></View>;
    }

    if (!order) {
        return <View><Text>Order not found.</Text></View>;
    }
    const handleRatingChange = (productId, rating) => {
        setProductRatings(prevRatings => ({
            ...prevRatings,
            [productId]: rating,
        }));
    };

    const handleReviewChange = (productId, text) => {
        setProductReviews(prevReviews => ({
            ...prevReviews,
            [productId]: text,
        }));
    };

    const handleAddReview = async (productId) => {
        const rating = productRatings[productId];
        const reviewcmt = productReviews[productId];

        if (!reviewcmt || rating === 0) {
            Alert.alert(
                "Error",
                "Please select a rating and enter a comment.",
                [{ text: "Close", style: "cancel" }]
            );
            return;
        }

        try {
            await dispatch(addProductReview(productId, reviewcmt, rating));
            // You can add logic to show success message or update the UI
            Alert.alert(
                "Complete",
                "Your review has been submitted successfully.",
                [{ text: "Close" }]
            );
            // Optionally reset state for the reviewed product
            setProductRatings(prev => ({ ...prev, [productId]: 0 }));
            setProductReviews(prev => ({ ...prev, [productId]: '' }));
            dispatch(getSingleOrderDetails(orderId));
        } catch (error) {
            console.error("Error in adding review", error);
            Alert.alert(
                "Error",
                "Could not submit your review. Please try again.",
                [{ text: "Close" }]
            );
        }
    };
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Order Details</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Order Information</Text>
                <Text>Order ID: {order._id}</Text>
                <Text>Order Date: {new Date(order.orderCreatedAt).toLocaleString()}</Text>
                <Text>Status: <Text style={styles[`status${order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}`]}>{order.orderStatus}</Text></Text>
                <Text>Payment Method: {order.paymentMethod}</Text>
                {order.paidAt && <Text>Payment Date: {new Date(order.paidAt).toLocaleString()}</Text>}
                {order.deliverAt && <Text>Estimated Delivery Date: {new Date(order.deliverAt).toLocaleString()}</Text>}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Shipping Information</Text>
                <Text>Address: {order.shippingInfo?.address}</Text>
                <Text>City: {order.shippingInfo?.city}</Text>
                <Text>Country: {order.shippingInfo?.country}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Ordered Products</Text>
                {order.orderItems?.map((item) => (
                    <View key={item._id} style={styles.orderItem}>
                        <Image
                            source={{ uri: item.image || 'https://via.placeholder.com/80' }}
                            style={styles.itemImage}
                        />
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text>Quantity: {item.quantity}</Text>
                            <Text>Price: {formatPrice(item.price)}</Text>
                            <Text>Total: {formatPrice(item.price * item.quantity)}</Text>
                        </View>
                    </View>
                ))}
            </View>
            {order.orderStatus === 'delivered' && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Product Reviews</Text>
                    {order.orderItems?.map((item) => {

                        const hasReviewed = item.product?.reviews?.some(
                            (review) => review?.user?._id === user?._id
                        );


                        return (
                            <View key={item.product} style={styles.reviewItem}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                {!hasReviewed ? (
                                    <View>
                                        <CustomRatingBar
                                            defaultRating={productRatings[item.product] || 0}
                                            setDefaultRating={(rating) => handleRatingChange(item.product, rating)}
                                        />
                                        <Text style={styles.textRating}>
                                            {productRatings[item.product] || 0} / 5
                                        </Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Your review about this product..."
                                            value={productReviews[item.product] || ''}
                                            onChangeText={(text) => handleReviewChange(item.product, text)}
                                        />
                                        <TouchableOpacity
                                            style={styles.btnReview}
                                            onPress={() => handleAddReview(item.product)}
                                        >
                                            <Text style={styles.btnText}>Submit Review</Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <Text style={styles.alreadyReviewedText}>You have already reviewed this product.</Text>
                                )}
                            </View>
                        );
                    })}
                </View>
            )}


            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Total Amount</Text>
                <View style={styles.priceRow}>
                    <Text>Item Price:</Text>
                    <Text>{formatPrice(order.itemPrice)}</Text>
                </View>
                <View style={styles.priceRow}>
                    <Text>Tax:</Text>
                    <Text>{formatPrice(order.tax)}</Text>
                </View>
                <View style={styles.priceRow}>
                    <Text>Shipping Charges:</Text>
                    <Text>{formatPrice(order.shippingCharges)}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.totalRow}>
                    <Text style={styles.totalText}>Total:</Text>
                    <Text style={styles.totalPrice}>{formatPrice(order.totalAmount)}</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
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
    section: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        elevation: 1,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#2c3e50',
    },
    orderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderColor: '#eee',
        paddingBottom: 10,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 15,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    divider: {
        marginVertical: 10,
        backgroundColor: '#bdc3c7',
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
    statusNew: {
        color: '#007bff',
    },
    statusConfirmed: {
        color: '#f39c12',
    },
    statusPreparing: {
        color: '#d35400',
    },
    statusDelivering: {
        color: '#27ae60',
    },
    statusDelivered: {
        color: '#2ecc71',
    },
    statusCanceled: {
        color: '#e74c3c',
    },
    reviewItem: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    textRating: {
        textAlign: 'left',
        fontSize: 16,
        marginVertical: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        minHeight: 80,
        textAlignVertical: 'top',
    },
    btnReview: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    alreadyReviewedText: {
        fontStyle: 'italic',
        color: 'gray',
        marginTop: 10,
    },
});

export default OrderDetail;
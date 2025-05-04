import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert, TextInput } from 'react-native';
import Layout from '../components/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getCartFromStorage, saveCartToStorage } from '../utils/cartStorage';
import { addComment, addProductReview, countTotalPurchasesForProduct, getCommentsByProduct, getProductReviews, getSimilarProducts, getViewedProducts } from '../redux/features/productActions';
import ProductsHorizontal from '../components/Products/ProductsHorizontal';
import CustomRatingBar from '../components/RatingComment/CustomRatingBar';
import ReviewList from '../components/RatingComment/ReviewList';
import CommentList from '../components/RatingComment/CommentList';
import { Heart } from 'lucide-react-native';
import { addToFavorite, getUserFavorites, removeFromFavorite } from '../redux/features/favoriteActions';

const ProductDetails = ({ route, navigation }) => {
    const { params = {} } = route;
    const [pDetails, setPDetails] = useState({});
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    const {
        totalPurchases,
        totalReviews, reviews,
        totalComments, comments,
        similarProducts, viewedProducts,
        loading, error
    } = useSelector((state) => state.product);
    const { isAuth, user } = useSelector((state) => state.user); // Thêm user vào đây nếu bạn cần
    const { favorites } = useSelector((state) => state.favorite);
    // const [defaultRating, setDefaultRating] = useState(0); // Bỏ dòng này
    // const [reviewcmt, setReviewcmt] = useState(''); // Bỏ dòng này
    const [comment, setComment] = useState('');
    const productList = useSelector((state) => state.product.products);
    const productId = params?._id || null;
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (productId) {
            const fetchData = async () => {
                try {
                    await Promise.all([
                        dispatch(countTotalPurchasesForProduct(productId)),
                        dispatch(getProductReviews(productId)),
                        dispatch(getCommentsByProduct(productId)),
                        dispatch(getSimilarProducts(productId)),
                        isAuth ? dispatch(getViewedProducts()) : Promise.resolve(),
                        isAuth ? dispatch(getUserFavorites()) : Promise.resolve(),
                    ]);

                    if (productList?.length) {
                        const getProduct = productList.find((p) => p?._id === productId) || {};
                        setPDetails(getProduct);
                    }
                } catch (err) {
                    console.error("Error fetching data:", err);
                }
            };
            fetchData();
        }
    }, [dispatch, productId, productList, isAuth]);

    useEffect(() => {
        if (isAuth && productId) {
            dispatch(getUserFavorites());
        }
    }, [dispatch, isAuth, productId]);

    useEffect(() => {
        if (isAuth && favorites?.length && productId) {
            const isProductFavorite = favorites.some(item => item?.product?._id === productId);
            setIsFavorite(isProductFavorite);
        }
    }, [favorites, productId, isAuth]);

    // Xử lý tăng giảm số lượng
    const handlePlusQty = () => {
        if (qty >= 10) {
            Alert.alert(
                "Notification",
                "You can buy only 10 products at a time",
                [{ text: "Close", style: "cancel" }]
            );
            return;
        }
        setQty((prev) => prev + 1);
    };
    const handleMinusQty = () => {
        if (qty <= 1) {
            Alert.alert(
                "Notification",
                "At least 1 in purchase.",
                [{ text: "Close", style: "cancel" }]
            );
            return;
        }
        setQty((prev) => prev - 1);
    };

    // Thêm vào giỏ hàng
    const handleAddToCart = async () => {
        try {
            let cart = await getCartFromStorage() || [];
            const existingProductIndex = cart.findIndex((item) => item.productId === pDetails?._id);

            if (existingProductIndex !== -1) {
                cart[existingProductIndex].quantity += qty;
            } else {
                cart.push({
                    productId: pDetails?._id,
                    name: pDetails?.name,
                    price: pDetails?.price,
                    image: pDetails?.images?.[0]?.url,
                    quantity: qty,
                });
            }

            await saveCartToStorage(cart);
            Alert.alert(
                "Success",
                `${qty} products are added to cart.`,
                [{ text: "Close" }]
            );
        } catch (error) {
            console.error('Error in adding to cart:', error);
            Alert.alert(
                "Error",
                "Failed to add to cart. Please try again.",
                [{ text: "Close" }]
            );
        }
    };

    // const handleAddReview = async () => { ... }; // Bỏ hàm này

    const handleAddComment = async () => {
        if (!comment) {
            Alert.alert(
                "Error",
                "Please enter a comment.",
                [{ text: "Close", style: "cancel" }]
            );
            return;
        }
        try {
            await dispatch(addComment(productId, comment));
            setComment('');
            Alert.alert(
                "Success",
                "Your comment has been sent.",
                [{ text: "Close" }]
            );
        } catch (error) {
            console.error("Add comment error", error);
            Alert.alert(
                "Error",
                "Failed to add comment. Please try again.",
                [{ text: "Close" }]
            );
        }
    };

    const handleFavorite = () => {
        if (!isAuth) {
            Alert.alert(
                "Login Required",
                "Please log in to add products to your favorites.",
                [
                    { text: "Close", style: "cancel" },
                    { text: "Log In", onPress: () => navigation.navigate('login') }
                ]
            );
            return;
        }
        if (isFavorite) {
            dispatch(removeFromFavorite(productId)).then(() => {
                setIsFavorite(false);
            });
        } else {
            dispatch(addToFavorite(productId)).then(() => {
                setIsFavorite(true);
            });
        }
    };

    return (
        <Layout>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: pDetails?.images?.[0]?.url }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <TouchableOpacity
                        style={styles.favoriteButton}
                        onPress={handleFavorite}
                    >
                        <Heart
                            size={24}
                            color={isFavorite ? 'red' : 'white'}
                            fill={isFavorite ? 'red' : 'transparent'}
                            style={isFavorite ? styles.heartFill : styles.heartOutline}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.container}>
                    <Text style={styles.name}>{pDetails?.name}</Text>
                    <Text style={styles.price}>
                        Price: {pDetails?.price ? pDetails.price.toLocaleString('vi-VN') : 'Updating'} VND
                    </Text>
                    <Text style={styles.label}>Description:</Text>
                    <Text style={styles.desc}>{pDetails?.description || 'No description available.'}</Text>
                    <View style={styles.statusRow}>
                        <Text style={styles.stock}>{pDetails?.stock} products in stock</Text>
                        <Text style={styles.sold}>{totalPurchases} sold</Text>
                    </View>
                    <View style={styles.actionRow}>
                        <View style={styles.qtyContainer}>
                            <TouchableOpacity style={styles.btnQty} onPress={handleMinusQty}>
                                <Text style={styles.btnQtyText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.qtyText}>{qty}</Text>
                            <TouchableOpacity style={styles.btnQty} onPress={handlePlusQty}>
                                <Text style={styles.btnQtyText}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={[
                                styles.btnCart,
                                pDetails?.stock <= 0 && styles.disabledBtn
                            ]}
                            onPress={handleAddToCart}
                            disabled={pDetails?.stock <= 0}
                        >
                            <Text style={styles.btnCartText}>
                                {pDetails?.stock > 0 ? 'ADD TO CART' : 'OUT OF STOCK'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.container}>
                    {/* Lượt đánh giá sản phẩm */}
                    <View style={styles.rowContainer}>
                        <Text style={styles.sectionTitle}>Rating</Text>
                        <Text style={styles.count}>({totalReviews})</Text>
                    </View>
                    {loading ? (
                        <ActivityIndicator size="large" color="blue" style={styles.loading} />
                    ) : error ? (
                        <Text style={styles.errorText}>Error: {error}</Text>
                    ) : reviews?.length > 0 ? (
                        <ReviewList reviews={reviews} />
                    ) : (
                        <Text style={styles.emptyText}>No reviews of this product available</Text>
                    )}
                </View>

                <View style={styles.container}>
                    {/* Bình luận sản phẩm */}
                    <View style={styles.rowContainer}>
                        <Text style={styles.sectionTitle}>Comments</Text>
                        <Text style={styles.count}>({totalComments})</Text>
                    </View>
                    {loading ? (
                        <ActivityIndicator size="large" color="blue" style={styles.loading} />
                    ) : error ? (
                        <Text style={styles.errorText}>Error: {error}</Text>
                    ) : comments?.length > 0 ? (
                        <CommentList comments={comments} />
                    ) : (
                        <Text style={styles.emptyText}>No comments of this product available</Text>
                    )}
                    <TextInput
                        style={styles.input}
                        placeholder="Write a comment..."
                        value={comment}
                        onChangeText={setComment}
                    />
                    <TouchableOpacity style={styles.btnComment} onPress={handleAddComment}>
                        <Text style={styles.btnText}>Submit</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.container}>
                    {/* Sản phẩm liên quan */}
                    <Text style={styles.sectionTitle}>Related Products:</Text>
                    {loading ? (
                        <ActivityIndicator size="large" color="blue" style={styles.loading} />
                    ) : error ? (
                        <Text style={styles.errorText}>Error: {error}</Text>
                    ) : similarProducts?.length > 0 ? (
                        <ProductsHorizontal productList={similarProducts} />
                    ) : (
                        <Text style={styles.emptyText}>No top products available</Text>
                    )}
                </View>

                {isAuth && (
                    <View style={[styles.container, { marginBottom: 60 }]}>
                        <Text style={styles.sectionTitle}>Viewed Products:</Text>
                        {loading ? (
                            <ActivityIndicator size="large" color="blue" style={styles.loading} />
                        ) : error ? (
                            <Text style={styles.errorText}>Error: {error}</Text>
                        ) : viewedProducts?.length > 0 ? (
                            <ProductsHorizontal productList={viewedProducts} />
                        ) : (
                            <Text style={styles.emptyText}>No viewed products available</Text>
                        )}
                    </View>
                )}
            </ScrollView>
        </Layout>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        position: 'relative',
    },
    image: {
        height: 400,
        width: '100%',
        resizeMode: 'cover',
    },
    favoriteButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 20,
        padding: 8,
        zIndex: 1,
    },
    heartOutline: {
        strokeWidth: 2,
        color: 'white'
    },
    heartFill: {},
    container: {
        marginVertical: 10,
        marginHorizontal: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#222',
    },
    price: {
        fontSize: 18,
        color: '#e53935',
        fontWeight: '600',
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
        color: '#444',
    },
    desc: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 12,
        color: '#555',
    },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    stock: {
        color: '#4CAF50',
        fontWeight: '500',
    },
    sold: {
        color: '#9E9E9E',
        fontStyle: 'italic',
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    btnCart: {
        backgroundColor: '#FF7043',
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 8,
    },
    btnCartText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    qtyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    btnQty: {
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    btnQtyText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    qtyText: {
        fontSize: 16,
        marginHorizontal: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
    },
    btnReview: { // Bỏ style này
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    btnComment: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    textRating: { // Bỏ style này
        textAlign: 'center',
        fontSize: 16,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    count: {
        fontSize: 16,
        marginLeft: 5,
        color: '#888',
    },
    loading: {
        marginVertical: 10,
    },
    errorText: {
        color: 'red',
        marginVertical: 10,
    },
    emptyText: {
        fontStyle: 'italic',
        color: '#888',
        marginVertical: 10,
    },
    disabledBtn: {
        backgroundColor: '#BDBDBD',
        cursor: 'not-allowed',
    },
});

export default ProductDetails;
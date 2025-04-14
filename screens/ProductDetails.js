import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getCartFromStorage, saveCartToStorage } from '../utils/cartStorage';
import { addComment, addProductReview, countTotalPurchasesForProduct, getCommentsByProduct, getProductReviews, getSimilarProducts, getViewedProducts } from '../redux/features/productActions';
import ProductsHorizontal from '../components/Products/ProductsHorizontal';
import CustomRatingBar from '../components/RatingComment/CustomRatingBar';
import ReviewList from '../components/RatingComment/ReviewList';
import ReviewCard from '../components/RatingComment/ReviewCard';
import CommentList from '../components/RatingComment/CommentList';

const ProductDetails = ({ route }) => {
  const { params = {} } = route;
  const [pDetails, setPDetails] = useState({});
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const { totalPurchases,
    totalReviews, reviews,
    totalComments, comments,
    similarProducts, viewedProducts,
    loading, error
  } = useSelector((state) => state.product);
  
  const [defaultRating, setDefaultRating] = useState(0); 
  const [reviewcmt, setReviewcmt] = useState(["Excellent!", "Very good product", "Worth the price"]);
  
  const [comment, setComment] = useState('');
  
  const productList = useSelector((state) => state.product.products);
  const productId = params?._id || null;
  useEffect(() => {
    if (productList?.length) {
      const getProduct = productList.find((p) => p?._id === productId) || {};
      setPDetails(getProduct);
    }
    dispatch(countTotalPurchasesForProduct(productId))
    dispatch(getProductReviews(productId));
    dispatch(getCommentsByProduct(productId));
    dispatch(getSimilarProducts(productId));
    dispatch(getViewedProducts());
  }, [dispatch, params?._id, productList]);

  // Xử lý tăng giảm số lượng
  const handlePlusQty = () => {
    if (qty >= 10) {
      alert('You can buy only 10 products in 1 time');
      return;
    }
    setQty((prev) => prev + 1);
  };
  const handleMinusQty = () => {
    if (qty <= 1) {
      alert('At least 1 in purchase.');
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
      alert(`${qty} products are added to cart.`);
    } catch (error) {
      console.error('Error in adding to cart:', error);
    }
  };

  const handleAddReview = () => {
    if (!reviewcmt || defaultRating === 0) {
      alert('Please enter a review.');
      return;
    }
    // Call the action to add the review
    dispatch(addProductReview(productId, reviewcmt, defaultRating));
    setReviewcmt('');
    setDefaultRating(0);
  };

  const handleAddComment = () => {
    if (!comment) {
      alert('Please enter a comment.');
      return;
    }
    // Call the action to add the comment
    dispatch(addComment(productId, comment));
    setComment('');
  };

  return (
    <Layout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image 
          source={{ uri: pDetails?.images?.[0]?.url }} 
          style={styles.image} 
          resizeMode="cover" 
        />

        <View style={styles.container}>
          <Text style={styles.name}>{pDetails?.name}</Text>

          <Text style={styles.price}>
            Giá: {pDetails?.price ? pDetails.price.toLocaleString('vi-VN') : 'Đang cập nhật'} VND
          </Text>

          <Text style={styles.label}>Mô tả:</Text>
          <Text style={styles.desc}>{pDetails?.description || 'Chưa có mô tả.'}</Text>

          <View style={styles.statusRow}>
            <Text style={styles.stock}>{pDetails?.stock} sản phẩm còn</Text>
            <Text style={styles.sold}>{totalPurchases} đã bán</Text>
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
                {pDetails?.stock > 0 ? 'THÊM VÀO GIỎ' : 'HẾT HÀNG'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container}>
          {/* Đánh giá sản phẩm */}
          <Text style={styles.sectionTitle}>Đánh giá sản phẩm</Text>          
          <CustomRatingBar defaultRating={defaultRating} setDefaultRating={setDefaultRating} />
          <Text style={styles.textRating}>
            {defaultRating + ' / 5'}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Viết đánh giá..."
            value={reviewcmt}
            onChangeText={setReviewcmt}
          />
          <TouchableOpacity style={styles.btnReview} onPress={handleAddReview}>
            <Text style={styles.btnText}>Gửi đánh giá</Text>
          </TouchableOpacity>

          {/* Lượt đánh giá sản phẩm */}
          <Text style={styles.sectionTitle}>Rating</Text>
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
          <Text style={styles.sectionTitle}>Comments</Text>
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
            placeholder="Viết bình luận..."
            value={comment}
            onChangeText={setComment}
          />
          <TouchableOpacity style={styles.btnComment} onPress={handleAddComment}>
            <Text style={styles.btnText}>Gửi bình luận</Text>
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
        <View style={styles.container} marginBottom={60}>
          {/* Sản phẩm đã xem */}
          <Text style={styles.sectionTitle}>Viewed Products:</Text>
          {loading ? (
            <ActivityIndicator size="large" color="blue" style={styles.loading} />
          ) : error ? (
            <Text style={styles.errorText}>Error: {error}</Text>
          ) : viewedProducts?.length > 0 ? (
            <ProductsHorizontal productList={viewedProducts}/>
          ) : (
            <Text style={styles.emptyText}>No top products available</Text>
          )}
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 400,
    width: '100%',
  },
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
  title: {
    fontSize: 20,
    textAlign: 'left',
  },
  desc: {
    // fontSize: 14,
    // textAlign: 'justify',
    // marginVertical: 10,
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
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  btnCart: {
    // width: 180,
    // backgroundColor: '#000',
    // borderRadius: 5,
    // height: 40,
    // justifyContent: 'center',
    backgroundColor: '#FF7043',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  btnCartText: {
    // color: '#fff',
    // fontWeight: 'bold',
    // textAlign: 'center',
    // fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  qtyContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  btnQty: {
    // backgroundColor: 'lightgray',
    // width: 40,
    // alignItems: 'center',
    // justifyContent: 'center',
    // borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  btnQtyText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  qtyText: {
    // fontSize: 18,
    // fontWeight: 'bold',
    // marginHorizontal: 10,
    fontSize: 16,
    marginHorizontal: 8
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  commentItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  btnReview: {
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
  textRating: {
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ProductDetails;

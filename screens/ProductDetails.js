import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getCartFromStorage, saveCartToStorage } from '../utils/cartStorage';

const ProductDetails = ({ route }) => {
  const { params = {} } = route;
  const [pDetails, setPDetails] = useState({});
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  // Lấy danh sách sản phẩm từ Redux store
  const productList = useSelector((state) => state.product.products);

  useEffect(() => {
    if (productList?.length) {
      const getProduct = productList.find((p) => p?._id === params?._id) || {};
      setPDetails(getProduct);
    }
  }, [params?._id, productList]);

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

  return (
    <Layout>
      <Image source={{ uri: pDetails?.images?.[0]?.url }} style={styles.image} resizeMode="contain" />
      <View style={styles.container}>
        <Text style={styles.title}>{pDetails?.name}</Text>
        <Text style={styles.title}>Giá: {pDetails?.price ? pDetails.price.toLocaleString('vi-VN') : 'Đang cập nhật'} VND</Text>
        <Text style={styles.desc}>Mô tả: {pDetails?.description}</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btnCart} onPress={handleAddToCart} disabled={pDetails?.stock <= 0}>
            <Text style={styles.btnCartText}>
              {pDetails?.stock > 0 ? 'ADD TO CART' : 'SOLD OUT'}
            </Text>
          </TouchableOpacity>
          <View style={styles.qtyContainer}>
            <TouchableOpacity style={styles.btnQty} onPress={handleMinusQty}>
              <Text style={styles.btnQtyText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qtyText}>{qty}</Text>
            <TouchableOpacity style={styles.btnQty} onPress={handlePlusQty}>
              <Text style={styles.btnQtyText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: '100%',
  },
  container: {
    marginVertical: 15,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
  },
  desc: {
    fontSize: 14,
    textAlign: 'justify',
    marginVertical: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  btnCart: {
    width: 180,
    backgroundColor: '#000',
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
  },
  btnCartText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  btnQty: {
    backgroundColor: 'lightgray',
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  btnQtyText: {
    fontSize: 20,
  },
  qtyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});

export default ProductDetails;

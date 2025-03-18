import { View } from 'react-native';
import React from 'react';
import Products from '../components/Products/Products';
import { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/features/productActions';

const ProductsList = () => {
  const route = useRoute();
  const searchQuery = route.params?.query?.toLowerCase() || '';
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Lọc sản phẩm theo từ khóa tìm kiếm
  const filteredProducts = searchQuery
    ? products.filter((item) =>
        item.name.toLowerCase().includes(searchQuery)
      )
    : products;

  return (
    <View style={{ flex: 1 }}>
      <Products productList={filteredProducts} />
    </View>
  );
};

export default ProductsList;

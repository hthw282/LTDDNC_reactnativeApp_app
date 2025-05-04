import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import Products from '../components/Products/Products';
import { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/features/productActions';
import SearchBar from '../components/Products/SearchBar';
import Layout from '../components/Layout/Layout';
import Header from '../components/Layout/Header';

const ProductsList = () => {
  const route = useRoute();
  const searchQuery = route.params?.query?.toLowerCase() || '';
  const categoryQuery = route.params?.category?.toLowerCase() || ''; // Lấy tham số category
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Lọc sản phẩm theo từ khóa tìm kiếm
  const filteredProducts = products.filter((item) => {
    const nameMatch = searchQuery
      ? item.name?.toLowerCase()?.includes(searchQuery)
      : true;
    let categoryMatch = true;
    if (categoryQuery) {
      if (item?.category?.category) { // Truy cập tên category sau khi populate
        categoryMatch = item.category.category.toLowerCase() === categoryQuery;
      } else {
        categoryMatch = false;
      }
    }
    return nameMatch && categoryMatch;
  });

  return (
    <Layout>
      <Header />
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : filteredProducts?.length > 0 ? (
        <Products productList={filteredProducts} />
      ) : (
        <Text>No products found</Text>
      )}
    </Layout>
  );
};

export default ProductsList;
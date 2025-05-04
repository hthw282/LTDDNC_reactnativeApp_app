import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import Categories from '../components/category/Categories';
import Banner from '../components/Banner/Banner';
import Products from '../components/Products/Products';
import Header from '../components/Layout/Header';
import { useSelector, useDispatch } from 'react-redux';
import ProductsHorizontal from '../components/Products/ProductsHorizontal';
import { getAllProducts, getTopProducts } from '../redux/features/productActions';

const Home = () => {
  const dispatch = useDispatch();
  const { products, topProducts, loading, error } = useSelector((state) => state.product);
  

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getTopProducts());
  }, [dispatch]);

  return (
    <Layout>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Banner />
        <Categories />
        <Text style={styles.text}>Top Products:</Text>
        {loading ? (
          <ActivityIndicator size="large" color="blue" style={styles.loading} />
        ) : error ? (
          <Text style={styles.errorText}>Error: {error}</Text>
        ) : topProducts?.length > 0 ? (
          <ProductsHorizontal productList={topProducts} />
        ) : (
          <Text style={styles.emptyText}>No top products available</Text>
        )}
        <Text style={styles.text}>All Products:</Text>
        {loading ? (
          <ActivityIndicator size="large" color="blue" style={styles.loading} />
        ) : error ? (
          <Text style={styles.errorText}>Error: {error}</Text>
        ) : products?.length > 0 ? (
          <Products productList={products} />
        ) : (
          <Text style={styles.emptyText}>No products available</Text>
        )}
      </ScrollView>
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold', // Makes the text stand out
    marginStart: 10,
    marginTop: 5,
  },
  loading: {
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginVertical: 20,
  },
});

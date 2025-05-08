// ProductsList.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, setCurrentPage } from '../redux/features/productActions';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Products from '../components/Products/Products';
import Layout from '../components/Layout/Layout';
import Header from '../components/Layout/Header';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native';

const ProductsList = () => {
  const dispatch = useDispatch();
  const { products, loading, error, currentPage, totalPages, searchQuery } = useSelector((state) => state.product);
  const [sortOption, setSortOption] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [productsPerPage, setProductsPerPage] = useState(10);
  const route = useRoute();


  useEffect(() => {
    dispatch(getAllProducts(sortOption, priceRange, currentPage, productsPerPage, searchQuery));
  }, [dispatch, sortOption, priceRange, currentPage, productsPerPage, searchQuery]); // searchQuery là dependency

  // useEffect(() => {
  //       if (route.params?.query) {
  //            dispatch({ type: 'setSearchQuery', payload: route.params.query });
  //       }
  // }, [route.params?.query, dispatch]);

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const handlePriceSelect = (range) => {
    setPriceRange(range);
  };

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleChangePageSize = (size) => {
    setProductsPerPage(size);
    dispatch(getAllProducts(sortOption, priceRange, 1, size, searchQuery));
  };


  return (
    <Layout>
      <Header />

      <View style={styles.filterContainer}>
        {/* Dropdown lọc giá */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Lọc giá:</Text>
          <Picker
            selectedValue={priceRange}
            style={styles.picker}
            onValueChange={(itemValue) => handlePriceSelect(itemValue)}
          >
            <Picker.Item label="All" value="" />
            <Picker.Item label="Under 10m" value="0-10000000" />
            <Picker.Item label="10m - 15m" value="10000000-15000000" />
            <Picker.Item label="Upper 15m" value="15000000-Infinity" />
          </Picker>
        </View>

        {/* Dropdown sắp xếp */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Sắp xếp:</Text>
          <Picker
            selectedValue={sortOption}
            style={styles.picker}
            onValueChange={(itemValue) => handleSortChange(itemValue)}
          >
            <Picker.Item label="Default" value="" />
            <Picker.Item label="Name (A-Z)" value="name-asc" />
            <Picker.Item label="Price (Low - High)" value="price-asc" />
          </Picker>
        </View>

        {/* Dropdown số lượng trên trang */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Hiển thị:</Text>
          <Picker
            selectedValue={productsPerPage}
            style={styles.picker}
            onValueChange={(itemValue) => handleChangePageSize(parseInt(itemValue, 10))}
          >
            <Picker.Item label="2 / page" value={2} />
            <Picker.Item label="5 / page" value={5} />
            <Picker.Item label="10 / page" value={10} />
          </Picker>
        </View>
      </View>

      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : products?.length > 0 ? (
        <>
          <Products productList={products} />
          <View style={styles.paginationContainer}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <TouchableOpacity
                key={page}
                style={[
                  styles.paginationButton,
                  currentPage === page && styles.activePageButton,
                ]}
                onPress={() => handlePageChange(page)}
              >
                <Text
                  style={[
                    styles.paginationText,
                    currentPage === page && styles.activePageText,
                  ]}
                >
                  {page}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      ) : (
        <Text>No products found</Text>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  picker: {
    height: 40,
    width: 120,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  priceDropdown: {
    position: 'absolute',
    top: 40,
    left: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    zIndex: 1,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  activePageButton: {
    backgroundColor: 'blue',
    borderColor: 'blue',
  },
  paginationText: {
    color: '#333',
  },
  activePageText: {
    color: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  searchButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
});

export default ProductsList;

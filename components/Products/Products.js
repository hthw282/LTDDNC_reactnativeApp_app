import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import ProductsCard from "./ProductsCard";

const Products = ({ productList = [] }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}
     contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        {productList.map((p) => (
          <View key={p._id} style={styles.cardWrapper}>
            <ProductsCard p={p} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", 
    flexWrap: "wrap",
    justifyContent: "space-between", 
    padding: 10,
  },
  scrollContent: {
    paddingBottom: 120, 
  },
  cardWrapper: {
    width: '49%', 
    marginBottom: 5, 
  },
});

export default Products;

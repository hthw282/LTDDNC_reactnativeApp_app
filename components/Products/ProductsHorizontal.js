import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import ProductsCard from "./ProductsCard";

const ProductsHorizontal = ({productList}) => {
  return (
    <ScrollView horizontal={true} showsVerticalScrollIndicator={false}>
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
    justifyContent: "space-between", 
    padding: 10,

  },
  cardWrapper: {
    marginRight: 8,
  },
});

export default ProductsHorizontal;

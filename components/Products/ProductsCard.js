import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { getSingleProducts } from '../../redux/features/productActions';


const ProductsCard = ({p}) => { 
  const navigation = useNavigation();
  const dispatch = useDispatch();

  //more details btn
  const handleMoreBtn = (id) => {
    dispatch(getSingleProducts(id));
    navigation.navigate('productDetails', {
      _id: id
    });

  }

  //add to cart btn
  const handleAddtoCartBtn = (id) => {
    alert('Added to cart');
    console.log(id);
  }

  return (
    <View>
      <View style={styles.card}>
        <Image style={styles.cardImage}source={{ uri: p?.images?.[0]?.url }}/>
        <Text style={styles.cardTitle}>{p?.name}</Text>
        <Text style={styles.cardDesc}>
          {p?.description ? p.description.substring(0, 30) + " ...more" : "No description available"}
        </Text>
        <Text style={styles.cardPrice}>{p?.price.toLocaleString('vi-VN')} đ</Text>
        <Text style={styles.cardDesc}>{p?.stock} left in store</Text>
        <Text style={styles.cardRating}>⭐ {p?.rating} ({p?.numReviews} reviews)</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={() => handleMoreBtn(p._id)}>
            <Text style={styles.btnText}>Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnCart} onPress={() => handleAddtoCartBtn(p._id)}>
            <Text style={styles.btnText}>Add to cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'lightgray',
    width: '100%', 
    padding: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  cardImage: {
    height: 160, 
    width: '100%', 
    resizeMode: 'cover', 
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardDesc: {
    fontSize: 10,
    textAlign: 'left',
  },
  cardPrice: {
    fontSize: 14,
    textAlign: 'left',
    color: '#FF0033'
  },
  btnContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#000000',
    height: 20,
    width: 75,
    borderRadius: 5,
    justifyContent: 'center',
  },
  btnCart: {
    backgroundColor: 'orange',
    height: 20,
    width: 75,
    borderRadius: 5,
    justifyContent: 'center',
  },
  btnText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
export default ProductsCard
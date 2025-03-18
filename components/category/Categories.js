import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CategoriesData } from '../../data/CategoriesData'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {useNavigation} from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories } from '../../redux/features/categoryActions'

const Categories = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const {categories, loading} = useSelector((state) => state.category)

  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch])

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        { categories?.map(item => (
          <View key={item._id}>
            <TouchableOpacity  style={styles.catContainer}
              onPress={() => navigation.navigate(item.category.toLowerCase())}>
              <AntDesign name={item.icon} style={styles.catIcon}/>
              <Text style={styles.catTitle}>{item.category}</Text>
            </TouchableOpacity>
          </View>
        )) }
      </View>
    </ScrollView>
  )
}

const  styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 5,
    flexDirection: 'row',
  },
  catContainer:{
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  catIcon: {
    fontSize: 30,
    verticalAlign: 'top',
  },
  catTitle: {
    fontSize: 12,
  }
})

export default Categories
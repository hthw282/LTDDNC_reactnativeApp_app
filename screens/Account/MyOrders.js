import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import OrderStatus from '../../components/orders/OrderStatus'
import Layout from '../../components/Layout/Layout'
import OrderItems from '../../components/orders/OrderItems';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../redux/features/auth/userActions';
import { getAllOrders, getOrdersByStatus } from '../../redux/features/orderActions';

const MyOrders = () => {
  const dispatch = useDispatch();
  const {isAuth} = useSelector((state) => state.user)
  const {orders, totalOrder, loading, error} = useSelector((state) => state.order)
  
  const [selectedStatus, setSelectedStatus] = useState('all')

  useEffect(() => {
    dispatch(getUserData());
    if (selectedStatus === 'all') {
      dispatch(getAllOrders());
    } else {
      dispatch(getOrdersByStatus(selectedStatus));
    }
  }, [dispatch, selectedStatus])
  
  const statusTextMap = {
    all: 'All Orders',
    new: 'New Orders',
    confirmed: 'Confirmed Orders',
    preparing: 'Preparing Orders',
    delivering: 'Orders in Delivery',
    delivered: 'Delivered Orders',
    canceled: 'Canceled Orders',
  };

  return (
    <Layout>
      <OrderStatus selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}/>
      <Text style={styles.statusInfo}><Text style={styles.statusText}>{statusTextMap[selectedStatus]}</Text></Text>
      <Text style={styles.heading}>
            {totalOrder > 0 ? `You have ${totalOrder} items in the list ` : 'Your order is empty'}
      </Text>
      {totalOrder > 0 && (
        <>
          <ScrollView>
            {orders.map(item => (
              <OrderItems  item={item} key={item._id} />
              ))}
          </ScrollView>
        </>
      )}
    </Layout>
  )
}

const styles = StyleSheet.create({
  statusInfo: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#333',
  },
  statusText: {
    color: 'green',
  },
  heading: {
    textAlign: 'center',
    color: 'green',
    marginTop: 10,
  },
});

export default MyOrders
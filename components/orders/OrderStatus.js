import { Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React from 'react'


const OrderStatus = ({ selectedStatus, setSelectedStatus }) => {
  const statuses = ['all', 'new', 'confirmed', 'preparing', 'delivering', 'delivered', 'canceled'];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {statuses.map((status) => (
        <TouchableOpacity
          key={status}
          style={[styles.statusButton, selectedStatus === status && styles.selectedStatus]}
          onPress={() => setSelectedStatus(status)}
        >
          <Text style={[styles.statusText, selectedStatus === status && styles.selectedText]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const  styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  statusButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  selectedStatus: {
    backgroundColor: 'green',
  },
  statusText: {
    fontSize: 14,
    color: '#333',
  },
  selectedText: {
    color: 'white',
    fontWeight: 'bold',
  },
})

export default OrderStatus
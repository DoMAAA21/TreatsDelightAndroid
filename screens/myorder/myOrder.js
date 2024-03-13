import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';



const OrderHistory = ({ orders }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order History</Text>
      <FlatList
        data={orders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.orderItem}>
            <Text style={styles.orderDate}>Date: {item.date}</Text>
            <Text style={styles.orderDetails}>Total Amount: ${item.totalAmount}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  orderDate: {
    fontSize: 16,
    marginBottom: 5,
  },
  orderDetails: {
    fontSize: 14,
  },
});

export default OrderHistory;

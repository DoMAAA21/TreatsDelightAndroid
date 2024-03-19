import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';


const Cart = ({ cart, handleCheckout, handleRemoveItem }) => {
  const total = cart.reduce((acc, item) => acc + item.sellPrice * (item?.quantity ?? 0), 0);

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Text>{item?.name}</Text>
      <Text>{item?.quantity}</Text>
      <Text>₱{item?.sellPrice}</Text>
      <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveItem(item._id)}>
        <Text style={styles.buttonText}>x</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
      />
      <View>
        <Text style={styles.totalPriceText}>Total Price: ₱{total} </Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={()=>handleCheckout()}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  removeButton: {
    backgroundColor: 'red',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  checkoutButton: {
    backgroundColor: '#48BB78',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  checkoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalPriceText: {
    paddingTop: 10,
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default Cart;

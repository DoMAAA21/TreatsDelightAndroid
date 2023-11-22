import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { removeItemFromCart, increaseItemQuantity, decreaseItemQuantity, checkoutCart } from '../../store/reducers/cart/cartSlice';



const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cart);

  const increaseQuantity = (id) => {
    dispatch(increaseItemQuantity(id))
  }

  const decreaseQuantity = (id) => {
    dispatch(decreaseItemQuantity(id))
  }
  const removeItem = (id) => {
    dispatch(removeItemFromCart(id))
  }
  const onSubmit = async () => {
    const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2);
    dispatch(checkoutCart({cartItems,totalPrice})) 
  }

  return (
    <>
      <ScrollView>
        {cartItems.length > 0 ? (
          <View style={styles.container}>
            {cartItems.map(item => (
              <View key={item.id} style={styles.itemContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.infoContainer}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.store}>{item.store}'s Store</Text>
                  <Text style={styles.price}>₱{item.price}</Text>
                </View>
                <View style={styles.quantityContainer}>
                  <Button title="-" color="red" onPress={() => decreaseQuantity(item.id)} />
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <Button title="+" onPress={() => increaseQuantity(item.id)} />
                </View>
                <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(item.id)}>
                  <FontAwesome name="remove" color="white" size={15} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartText}>There's no item in the cart.</Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.bottomSection}>
        <Text style={styles.totalPrice}>Total: ₱{cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={onSubmit}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingTop: 30,
    paddingBottom: 100
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#cccccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 20
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoContainer: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  store: {
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    color: '#888',
  },
  removeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    color: 'white',
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 20
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    textAlign: 'center',
    width: 40,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopRightRadius:20,
    borderTopLeftRadius: 20,
    height: 100
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  checkoutButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: 'center',
  },
})

export default Cart
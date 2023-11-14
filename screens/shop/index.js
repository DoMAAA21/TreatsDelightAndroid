import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text } from 'galio-framework';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ItemList from './itemList';
import { fetchAllItems, clearErrors } from '../../store/reducers/product/allProductsSlice';



const ShopScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { products } = useSelector(state => state.allProducts);
  const [firstLoading, setFirstLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchAllItems())
      .then(() => {
        setFirstLoading(false);
      });
     
    }, [dispatch])
  );


return (
    <View style={styles.container}>
      {firstLoading ? <ActivityIndicator size="large" style={styles.loadingIndicator} /> : <ItemList products={products} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebf0f7',
    paddingRight: 5,
    paddingLeft: 5,
  },
  card: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: 'transparent',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    elevation: 2,
    borderRadius: 5,
    height: 80,
    backgroundColor: '#b4e373',
  },
  title: {
    color: 'black',
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 10,
  },
  addButton: {
    marginTop: 20,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: '#16aec1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingButtonText: {
    fontSize: 30,
    color: 'white',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default ShopScreen;

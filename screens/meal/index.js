import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text} from 'galio-framework';
import { useNavigation } from '@react-navigation/native';
import MealList from './mealList';
import { fetchAllProducts,clearErrors } from '../../store/reducers/product/allProductsSlice';
import { deleteProductReset, updateProductReset, updateStatusReset } from '../../store/reducers/product/productSlice';
import { successMsg, errorMsg } from '../../shared/toast';


const ProductScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { error, products } = useSelector(state => state.allProducts);
  const { success } = useSelector(state => state.newProduct);
  const { isDeleted, isUpdated, isStatusUpdated, error: errorProduct } = useSelector(state => state.product)
  const [ firstLoading, setFirstLoading] = useState(true);



  
  useEffect(() => {
    if (success) {
      dispatch(fetchAllProducts());
    } else {
      dispatch(fetchAllProducts())
      .then(() => {
        setFirstLoading(false);
      });
    }
    if (error) {
      errorMsg(error)
      dispatch(clearErrors())
    }
    

  }, [dispatch, error, success]);

  useEffect(() => {
    if (isDeleted) {
      successMsg('Deleted','Product Removed');
      dispatch(deleteProductReset());
      dispatch(fetchAllProducts());
    }

    if (isUpdated) {
      successMsg('Updated','Product Updated');
      dispatch(updateProductReset());
      dispatch(fetchAllProducts());
    }
    if (isStatusUpdated) {
      dispatch(fetchAllProducts());
      dispatch(updateStatusReset());
    }
    if (errorProduct){      
      errorMsg(errorProduct);
      dispatch(deleteProductReset());
      dispatch(fetchAllProducts());
    }


  },[isDeleted, isUpdated, isStatusUpdated,errorProduct])





  return (
    <View style={styles.container}>
      {firstLoading ? <ActivityIndicator size="large" style={styles.loadingIndicator} /> : <MealList products={products} />}
      <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate('AddMeal')}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
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

export default ProductScreen;

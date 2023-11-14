import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text } from 'galio-framework';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import MealList from './mealList';
import { fetchAllMeals, clearErrors, clearProducts } from '../../store/reducers/product/allProductsSlice';
import { deleteProductReset, updateProductReset, updateStatusReset } from '../../store/reducers/product/productSlice';
import { successMsg, errorMsg } from '../../shared/toast';


const MealScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { error, products } = useSelector(state => state.allProducts);
  const { success } = useSelector(state => state.newProduct);
  const { isDeleted, isUpdated, isStatusUpdated, error: errorProduct } = useSelector(state => state.product)
  const [firstLoading, setFirstLoading] = useState(true);



  useFocusEffect(
    useCallback(() => {
      if (success) {
        dispatch(fetchAllMeals());
      } else {
        dispatch(fetchAllMeals())
          .then(() => {
            setFirstLoading(false);
          });
      }
      if (error) {
        errorMsg(error)
        dispatch(clearErrors())
      }
      return(()=>{
        dispatch(clearProducts())
      })

    }, [dispatch, error, success])
  );

  useFocusEffect(
    useCallback(() => {
      if (isDeleted) {
        successMsg('Deleted', 'Meal Removed');
        dispatch(deleteProductReset());
        dispatch(fetchAllMeals());
      }

      if (isUpdated) {
        successMsg('Updated', 'Meal Updated');
        dispatch(updateProductReset());
        dispatch(fetchAllMeals());
      }
      if (isStatusUpdated) {
        dispatch(fetchAllMeals());
        dispatch(updateStatusReset());
      }
      if (errorProduct) {
        errorMsg(errorProduct);
        dispatch(deleteProductReset());
        dispatch(fetchAllMeals());
      }
      return(()=>{
        dispatch(clearProducts())
      })
    }, [isDeleted, isUpdated, isStatusUpdated, errorProduct])
  );





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

export default MealScreen;

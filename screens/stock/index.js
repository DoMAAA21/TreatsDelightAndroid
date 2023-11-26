import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import StockList from './stockList';
import { fetchAllProducts, clearErrors, clearProducts } from '../../store/reducers/product/allProductsSlice';
import { updateProductReset } from '../../store/reducers/product/productSlice';
import { topSuccessMsg, topErrorMsg } from '../../shared/toast';
import { useCallback } from 'react';


const StockScreen = () => {
  const dispatch = useDispatch();
  const { products, error } = useSelector(state => state.allProducts);
  const { isUpdated, error: errorProduct } = useSelector(state => state.product)
  const [firstLoading, setFirstLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchAllProducts())
        .then(() => {
          setFirstLoading(false);
        });
        return () => {
            dispatch(clearProducts());
        }
    }, [dispatch, error])
  );

  useEffect(() => {
    if (isUpdated) {
      topSuccessMsg('Stocks Updated');
      dispatch(updateProductReset());
      dispatch(fetchAllProducts());
    }
    if (errorProduct) {
      topErrorMsg(errorProduct);
      dispatch(clearErrors());
    }
  }, [isUpdated])

  return (
    <View style={styles.container}>
      {firstLoading ? <ActivityIndicator size="large" style={styles.loadingIndicator} /> : <StockList products={products} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  addButton: {
    marginTop: 20,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default StockScreen;

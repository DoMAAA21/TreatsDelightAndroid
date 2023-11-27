import React, { useEffect, useState,useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import StockList from './stockList';
import { fetchAllProducts, clearErrors, clearProducts } from '../../store/reducers/product/allProductsSlice';
import { noChanges, updateProductReset } from '../../store/reducers/product/productSlice';
import { topSuccessMsg, topErrorMsg } from '../../shared/toast';


const StockScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { products, error } = useSelector(state => state.allProducts);
  const { isUpdated, error: errorProduct, isEdited } = useSelector(state => state.product);
  const [firstLoading, setFirstLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchAllProducts())
        .then(() => {
          setFirstLoading(false);
        });
        return () => {
          dispatch(noChanges());
          dispatch(clearProducts());
        }
    }, [dispatch, error])
  );
  useEffect(() =>
      navigation.addListener('beforeRemove', (e) => {
        if (!isEdited) {
          return;
        }
        e.preventDefault();
        Alert.alert(
          'Discard changes?',
          'You have unsaved changes. Are you sure you want to leave the screen?',
          [
            { text: "Stay", style: 'cancel'},
            {
              text: 'Leave',
              style: 'destructive',
              onPress: () => navigation.dispatch(e.data.action),
            },
          ]
        );
      }),
    [navigation, isEdited]
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

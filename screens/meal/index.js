import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { Text} from 'galio-framework';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import MealList from './mealList';
import { fetchAllProducts,clearErrors } from '../../store/reducers/product/allProductsSlice';
import { deleteProductReset, updateProductReset } from '../../store/reducers/product/productSlice';

const { width , height } = Dimensions.get('screen');
const buttonSize = Math.min(width * 0.15, height * 0.25);

const successMsg = (title,message) => {
  Toast.show({
    text1: `${title}`,
    text2: `${message}`,
    type: 'success',
    position: 'bottom',
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
    customStyles: {
      title: {
        fontSize: 30,
        fontWeight: 'bold',
      },
      message: {
        fontSize: 24,
        fontWeight: 'bold',
      },
    },
  });
};

const errorMsg = (message) => {
  Toast.show({
    text1: 'Error',
    text2: `${message}`,
    type: 'error',
    position: 'bottom',
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
    customStyles: {
      title: {
        fontSize: 30,
        fontWeight: 'bold',
      },
      message: {
        fontSize: 24,
        fontWeight: 'bold',
      },
    },
  });
};

const ProductScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { error, products } = useSelector(state => state.allProducts);
  const { success } = useSelector(state => state.newProduct);
  const { isDeleted, isUpdated, error: errorProduct } = useSelector(state => state.product)
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
    if (errorProduct){      
      errorMsg(errorProduct);
      dispatch(deleteProductReset());
      dispatch(fetchAllProducts());
    }


  },[isDeleted, isUpdated, errorProduct])





  return (
    <View style={styles.container}>
      {firstLoading ? <ActivityIndicator size="large" style={styles.loadingIndicator} /> : <MealList products={products} />}
      <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate('AddProduct')}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebf0f7',
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
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonSize / 2,
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
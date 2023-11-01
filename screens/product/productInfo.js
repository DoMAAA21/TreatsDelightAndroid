import React, { useEffect } from 'react';
import { View, ScrollView, Image, Text, Button, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { getProductDetails } from '../../store/reducers/product/productDetailsSlice';
import { categories } from '../../constants/inputs';

const ProductInfo = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const { product, loading, error } = useSelector(state => state.productDetails);
  const { productId } = route.params;
  
  useEffect(() => {
    dispatch(getProductDetails(productId));
    
    if (error) {
      console.log(error)
    }

  }, [dispatch, productId, error]);
  const categoryLabel = categories.find(category => category.value === product?.category)?.label;
  if (loading) {
    return (
      <ActivityIndicator size="large" style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}/>
    );
  }
 

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.image} source={{ uri: product?.firstImage?.url }} />
      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text> 
        <Text style={styles.description}>{product?.description}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Category:</Text>
        <Text style={styles.infoValue}>{categoryLabel}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Cost:</Text>
          <Text style={styles.infoValue}>{product.costPrice}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Sell Price:</Text>
          <Text style={styles.infoValue}>{product?.sellPrice}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Stock:</Text>
          <Text style={styles.infoValue}>{product.stock ? product.stock : 'By Portion'}</Text>
        </View>
      
      </View>
    </ScrollView>
  );
};

const styles = {
  container: {
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  info: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: '#999',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  infoContainer: {
    marginTop: 20,
  },
  infoLabel: {
    fontWeight: 'bold',
    fontSize: 16
  },
  infoValue: {
    marginTop: 5,
    fontSize: 16
    
  },
};

export default ProductInfo;
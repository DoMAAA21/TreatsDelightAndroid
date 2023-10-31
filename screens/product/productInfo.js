import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView ,ActivityIndicator} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Card } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';
import SkeletonLoader from '../loader/userInfoLoader';
import { getProductDetails } from '../../store/reducers/product/productDetailsSlice';

const screenWidth = Dimensions.get('window').width;
const ProductInfo = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { product, loading,error } = useSelector(state => state.productDetails);
  const { productId } = route.params;
  
  useEffect(() => {
    dispatch(getProductDetails(productId));

    if(error) {
      console.log(error)
    }
   
  }, [dispatch, productId, error]);


  if (loading) {
    return (
      <SkeletonLoader/>
    );
  }

  return (
    
    <ScrollView style={styles.container}>
        <Card
        flex
        style={styles.card}
       
      >
      <View style={styles.contentContainer}>
        <Image source={{ uri: product?.firstImage?.url }} style={styles.avatar} />
        <Text style={styles.name}>
          {product.name}
        </Text>
        <View style={styles.info}>
          <Icon name="quote-left" size={20} style={styles.icon} />
          <Text style={styles.infoText}>"{product.description}"</Text>
        </View>
        <View style={styles.info}>
          <Icon name="list" size={20} style={styles.icon} />
          <Text style={styles.infoText}>Cost Price: P{product.costPrice}</Text>
        </View>
        <View style={styles.info}>
          <Icon name="list" size={20} style={styles.icon} />
          <Text style={styles.infoText}>Sell Price: P{product.sellPrice}</Text>
        </View>
        <View style={styles.info}>
          <Icon name="location-arrow" size={20} style={styles.icon} />
          <Text style={styles.infoText}>{product.location}</Text>
        </View>
        <View style={styles.info}>
          <Icon name="check" size={20} style={styles.icon} />
          <Text style={styles.infoText}>Is Active:{product?.active?.toString()}</Text>
        </View>
      </View>
      </Card>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1, // Make the container full-screen
      backgroundColor: 'white',
    },
    card: {
        margin: 10,
      },
    contentContainer: {
      padding: 20,
    },
    avatar: {
      width: screenWidth * 0.8, // Responsive avatar size
      height: screenWidth * 0.8,
      borderRadius: (screenWidth * 0.8) / 2,
      marginBottom: 20,
    },
    name: {
      fontSize: 35,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    info: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    icon: {
      marginRight: 10,
    },
    infoText: {
      fontSize: 20,
    },
  });

export default ProductInfo;

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, ScrollView, Image, Text, Button, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { getProductDetails } from '../../store/reducers/product/productDetailsSlice';
import { categories } from '../../shared/inputs';

const { width, height } = Dimensions.get('window');
const ProductInfo = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const { product, loading, error } = useSelector(state => state.productDetails);
  const { productId } = route.params;
  const scrollViewRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages([]);
    dispatch(getProductDetails(productId))
      .then(() => {
        setImages(product.images);
        setFetchLoading(true)
      });
  
    if (error) {
      console.log(error);
    }
  }, [dispatch, productId, error, fetchLoading]);


  const changeActiveIndex = (index) => {
    setActiveIndex(index);
    const scrollX = (width) * index;
    scrollViewRef.current.scrollTo({ x: scrollX, y: 0, animated: true });
  };
  const categoryLabel = categories.find(category => category.value === product?.category)?.label;

  const renderCarousel = () => {
      return (
        <>
        <ScrollView
          ref={scrollViewRef}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            const x = event.nativeEvent.contentOffset.x;
            const index = Math.floor(x / (width - 60));
            if (index !== activeIndex) {
              setActiveIndex(index);
            }
          }}
          scrollEventThrottle={16}
        >
          {images.map((image, index) => (
            <View key={index} style={styles.productContainer}>
              <Image source={{ uri: image.url }} style={styles.image} />
            </View>
          ))}
        </ScrollView>
         <View style={styles.dotContainer}>
          {images.map((_, index) => (
            <TouchableOpacity key={index} onPress={() => changeActiveIndex(index)}>
              <View
                style={[
                  styles.dot,
                  { backgroundColor: index === activeIndex ? '#bfbaba' : '#f8f7f7'  },
                ]}
              />
            </TouchableOpacity>
          ))}
        </View> 
        </>
      );
              
  };



  return (
    <>
      {!loading && fetchLoading && images && images.length > 0 ? (
        <ScrollView style={styles.container}>
          <View style={styles.carouselContainer}>
            {renderCarousel()}
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>{product?.name}</Text>
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
      ) : (
        <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
      )}
    </>
  );
  
};

const styles = {
  container: {
    backgroundColor: '#fff',
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
  carouselContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
  },
  productContainer: {
    width: width - 60,
    height: height / 2,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 30,
  },
  image: {
    width: '100%',
    height: '60%',
    resizeMode: 'cover',
    borderRadius: 10,
    aspectRatio: 1.5
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  content: {
    fontSize: 14,
    textAlign: 'center',
  },
  dotContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '90%',
    padding: 10,
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },
  dot: {
    width: 40,
    height: 8,
    borderRadius: 6,
    margin: 5,
    borderWidth: 0.1
  },
};

export default ProductInfo;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Image, Animated, Dimensions, ActivityIndicator } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { getProductDetails } from '../../store/reducers/product/productDetailsSlice';
import { useRoute, useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const FlipCard = ({ frontContent, backContent }) => {
  const [flipped, setFlipped] = useState(false);
  const [flipAnimation] = useState(new Animated.Value(0));

  const handleFlip = () => {
    Animated.timing(flipAnimation, {
      toValue: flipped ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setFlipped(!flipped);
    });
  };

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '90deg', '180deg'],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['180deg', '270deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  return (
    <TouchableWithoutFeedback onPress={handleFlip}>
      <View style={styles.cardContainer} >
        <View style={styles.card}>
          <Animated.View style={[styles.cardContent, styles.cardFace, frontAnimatedStyle]}>
            {frontContent}
          </Animated.View>
          <Animated.View
            style={[styles.cardContent, styles.cardBack, backAnimatedStyle]}>
            {backContent}
          </Animated.View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const ItemInfo = () => {

  const route = useRoute();
  const dispatch = useDispatch();
  const { product, error } = useSelector(state => state.productDetails);
  const { productId } = route.params;
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

  return (
    <>
      <View style={styles.container}>
        <FlipCard
          frontContent={!fetchLoading ? (<ActivityIndicator color="black" size="large" style={styles.loadingIndicator} />) :

            <Carousel
              loop
              pressSwipe
              width={width}
              // height={width / 2}
              autoPlay={true}
              data={images}
              scrollAnimationDuration={1000}
              renderItem={({ item }) => (
                <View
                  key={item.id}
                  style={styles.carouselView}
                >
                  <Image
                    source={{ uri: item.url }}
                    style={styles.image}
                  />
                </View>
              )}
            />
          }
          backContent={<Text style={styles.cardText}>Back of card</Text>}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.name}>{product?.name}</Text>
        <Text style={styles.description}>{product?.description}</Text>
        <Text style={styles.shopName}>{product?.store?.name}</Text>
        <Text style={styles.price}>Price: ₱{product?.sellPrice}</Text>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebf0f7',
  },
  buttonContainer: {
    flex: 1,
    marginTop: 20,
    height: height * 0.6,
    borderRadius: 25,
    alignItems: 'justify',
    backgroundColor: 'white',
    padding: 20,
  },
  carouselView: {
    borderRadius: 50,
  },
  image: {
    height: '95%',
    width: '100%',
    borderRadius: 20,
    padding: 20
  },
  cardContainer: {
    width: width * 0.9,
    height: height * 0.4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
    backfaceVisibility: 'hidden',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardContent: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
  },
  cardFace: {
    backgroundColor: 'white'
  },
  cardBack: {
    transform: [{ rotateY: '180deg' }],
    backgroundColor: '#FF4500'
  },
  cardText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 20,
    color: '#333',
    marginBottom: 10,
  },
  shopName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: '#ff4500',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: 'black',
    padding: 18,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20, // You can adjust this value as needed
    left: 20,
    right: 20,
  },
  addToCartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});


export default ItemInfo;
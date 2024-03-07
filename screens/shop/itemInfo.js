import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Image, Animated, Dimensions, ActivityIndicator, Alert } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { getItemDetails } from '../../store/reducers/product/productDetailsSlice';
import { addItemToCart } from '../../store/reducers/cart/cartSlice';
import { topSuccessMsg } from '../../shared/toast';

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
  const { product } = useSelector(state => state.productDetails);
  const { productId } = route.params;
  const [fetchLoading, setFetchLoading] = useState(false);
  const [images, setImages] = useState([]);
  useEffect(() => {
    setImages([]);
    dispatch(getItemDetails(productId))
      .then(() => {
        setImages(product.images);
        setFetchLoading(true)

      });
  }, [productId, fetchLoading]);

  const addToCart = () => {
    // Check if product cholesterol is higher than or equal to 50
    if (product?.nutrition?.cholesterol >= 50) {
      // Show alert to the user
      Alert.alert(
        'High Cholesterol Content',
        'This product has high cholesterol content. Are you sure you want to add it to your cart?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Add to Cart',
            onPress: () => {
              // Dispatch action to add item to cart
              dispatch(addItemToCart({ id: productId, quantity: 1 })).then(() => {
                topSuccessMsg('Added to Cart');
              });
            },
          },
        ],
        { cancelable: false } // Prevent user from dismissing the alert by tapping outside
      );
    } else {
      // If cholesterol is not high, directly add item to cart
      dispatch(addItemToCart({ id: productId, quantity: 1 })).then(() => {
        topSuccessMsg('Added to Cart');
      });
    }
  };
  return (
    <>
      <View style={styles.container}>
        <FlipCard
          frontContent={!fetchLoading ? (<ActivityIndicator color="black" size="large" style={styles.loadingIndicator} />) :
            <Carousel
              loop
              pressSwipe
              width={width}
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
          backContent={
            <View>
              <Text style={styles.cardTitle}>Nutrional Values</Text>
              <View style={styles.nutritionContainer}>
                <Text style={styles.nutritionLabel}>{`Calories: ${product?.nutrition?.calories || 0} kcal`}</Text>
                <Text style={styles.nutritionLabel}>{`Protein: ${product?.nutrition?.protein || 0} g`}</Text>
                <Text style={styles.nutritionLabel}>{`Carbohydrates: ${product?.nutrition?.carbs || 0} g`}</Text>
                <Text style={styles.nutritionLabel}>{`Fat: ${product?.nutrition?.fat || 0} g`}</Text>
                <Text style={styles.nutritionLabel}>{`Fiber: ${product?.nutrition?.fiber || 0} g`}</Text>
                <Text style={styles.nutritionLabel}>{`Sugar: ${product?.nutrition?.sugar || 0} g`}</Text>
                <Text style={styles.nutritionLabel}>{`Cholesterol: ${product?.nutrition?.cholesterol || 0} mg`}</Text>

              </View>
            </View>
          }
        />
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.name}>{product?.name}</Text>
        <Text style={styles.description}>{product?.description}</Text>
        <Text style={styles.shopName}>{product?.store?.name}'s Store</Text>
        <Text style={styles.price}>Price: ₱{product?.sellPrice}</Text>
        <TouchableOpacity
          style={[styles.addToCartButton, { opacity: product.active ? 1 : 0.5 }]}
          onPress={product.active ? addToCart : null}
          disabled={!product.active}
        >
          <Text style={styles.addToCartButtonText}>{product.active ? 'Add to Cart' : 'Not Available'}</Text>
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
    paddingBottom: 80,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.4,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: 'justify',
    backgroundColor: 'white',
    padding: 20,
  },
  carouselView: {
    borderRadius: 50,
  },
  image: {
    height: '100%',
    width: '100%',
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
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    fontSize: 20,
    color: '#4B7F52',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: '#ee9536',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: '#609D9F',
    padding: 18,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  addToCartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  nutritionContainer: {
    marginTop: 5,
  },
  nutritionLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
});


export default ItemInfo;
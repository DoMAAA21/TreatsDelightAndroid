import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

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
    <TouchableOpacity style={styles.cardContainer} onPress={handleFlip}>
      <View style={styles.card}>
        <Animated.View style={[styles.cardContent, styles.cardFace, frontAnimatedStyle]}>
          {frontContent}
        </Animated.View>
        <Animated.View
          style={[styles.cardContent, styles.cardBack, backAnimatedStyle]}>
          {backContent}
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const ItemInfo = () => {
  return (
    <View style={styles.container}>
      <FlipCard
        frontContent={<Text style={styles.cardText}>Front of card</Text>}
        backContent={<Text style={styles.cardText}>Back of card</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebf0f7',
  },
  cardContainer: {
    width: 350,
    height: 500,
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
    backgroundColor:'white'
  },
  cardBack: {
    transform: [{ rotateY: '180deg' }],
    backgroundColor:'#FF4500'
  },
  cardText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});


export default ItemInfo;
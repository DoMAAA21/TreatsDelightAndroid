import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import QuestionSvg from '../../assets/svg/Question';

const ProductsList = ({ products, onAddToCart }) => {

  const handleAddToCart = (product) => {
    onAddToCart(product);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => handleAddToCart(item)}>
        <View style={styles.card}>
          <Image source={{ uri: item?.images[0]?.url }} style={styles.image} />
          <Text style={styles.title}>{item?.name}</Text>
          <Text style={styles.subtitle}> {item.category.toLowerCase() !== "meals" ? `Stock: ${item.stock}` : null}</Text>
          <Text style={styles.price}>₱{item?.sellPrice}</Text>
        </View>
      </TouchableOpacity>
    </View>

  );

  if (products.length === 0) {
    return (
      <View style={styles.noteContainer}>
        <QuestionSvg height="80%" width="100%" />
        <Text style={styles.subtitle}>No items found</Text>
      </View>

    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    flex: 1,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  noteContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  price: {
    color: '#4caf50',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  contentContainer: {
    paddingBottom: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default ProductsList;

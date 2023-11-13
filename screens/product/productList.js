import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FlatList, Image, View, Alert, TextInput, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { deleteProduct } from '../../store/reducers/product/productSlice';

const { width } = Dimensions.get('screen');

const ProductList = ({ products }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const confirmDelete = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this product?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => dispatch(deleteProduct(id)),
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const navigateProduct = (id) => {
    navigation.navigate('ProductInfo', { productId: id });
  };

  const handleEdit = (id) => {
    navigation.navigate('EditProduct', { productId: id });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        style={styles.searchBar}
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />
      <FlatList
        data={products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.sellPrice.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )}
        contentContainerStyle={styles.flatList}
        keyExtractor={(product) => product._id.toString()}
        renderItem={({ item: product }) => (
          <View key={product._id} style={styles.container}>
            <TouchableOpacity style={styles.card} onPress={() => navigateProduct(product._id)}>
              <Image style={styles.image} source={{ uri: product?.images[0]?.url }} />
              <View style={styles.cardContent}>
                <Text style={styles.name}>{product?.name}</Text>
                <Text style={styles.count}>P{product?.sellPrice}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.followButton, { backgroundColor: '#2196F3', width: width * 0.25 }]}
                    onPress={() => handleEdit(product._id)}>
                    <Text style={styles.followButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.followButton, { backgroundColor: '#ff2752', width: width * 0.25 }]}
                    onPress={() => confirmDelete(product._id)}>
                    <Text style={styles.followButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
       
      />
    </View>
  );
};

const styles = {
  flatList: {
    padding: 10,
    paddingBottom: 70,
  },
  searchBar: {
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  container: {
    flex: 1,
    marginTop: 10,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
    flex: 1,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ebf0f7',
  },
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    borderRadius: 30,
  },
  name: {
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  count: {
    fontSize: 14,
    flex: 1,
    alignSelf: 'center',
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 20,
  },
  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#dcdcdc',
    marginLeft: width * 0.015,
    marginRight: width * 0.015,
  },
  followButtonText: {
    color: 'white',
    fontSize: 12,
  },
};

export default ProductList;

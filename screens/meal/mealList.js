import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FlatList, Image, View, Alert, TextInput, TouchableOpacity, Dimensions, Text } from 'react-native';
import { deleteProduct } from '../../store/reducers/product/productSlice';
import { useNavigation } from '@react-navigation/native';

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
    }

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
                contentContainerStyle={styles.flatList}
                data={products
                    .filter((product) => {
                        const fullName = `${product.fname} ${product.lname}`;
                        return (
                            fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.religion.toLowerCase().includes(searchQuery.toLowerCase())
                        );
                    })}
                keyExtractor={(product) => product._id.toString()}
                numColumns={2}
                renderItem={({ item: product }) => (
                    <View style={styles.itemContainer}>
                        <View style={styles.card}>
                            <Image source={{ uri: product?.images[0]?.url }} style={styles.image} />
                            <Text style={styles.title}>{product.name}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );

};

const styles = {
    flatList:{
        paddingTop: 10,
        paddingBottom: 80
    },
    buttonGroup: {
        flexDirection: 'row',
    },
    searchBar: {
        padding: 10,
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    container: {
        flex: 1,
        marginTop: 10,
    },
    contentList: {
        flex: 1,
    },

    itemContainer: {
        flex: 1,
        paddingBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        
      },
      card: {
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        width: 190,
        height: 200,
      },
      image: {
        width: '100%',
        height: 140,
        padding: 20,
        borderRadius: 8,
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
        marginRight: 20
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
        marginRight: width * 0.015
    },
    followButtonText: {
        color: 'white',
        fontSize: 12,
    },
};

export default ProductList;

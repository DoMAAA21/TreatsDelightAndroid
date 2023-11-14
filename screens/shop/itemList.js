import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FlatList, Image, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('screen');

const ItemList = ({ products }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');


    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TextInput
                    placeholder="Search"
                    style={styles.searchBar}
                    onChangeText={(text) => setSearchQuery(text)}
                    value={searchQuery}
                />
                <TouchableOpacity style={styles.cartButton}>
                    <MaterialCommunityIcons name="cart" size={30} color="#000" />
                </TouchableOpacity>
            </View>
            <FlatList
                contentContainerStyle={styles.flatList}
                data={products
                    .filter((product) => {
                        return (
                            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.sellPrice.toString().toLowerCase().includes(searchQuery.toLowerCase())
                        );
                    })}
                keyExtractor={(product) => product._id.toString()}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: product }) => (
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('MealInfo', { productId: product._id })}>
                        <View style={styles.itemContainer} >
                            <View style={styles.card}>
                                <Image source={{ uri: product?.images[0]?.url }} style={styles.image} />
                                <Text style={styles.title}>{product?.name}</Text>
                                <Text style={styles.price}>₱{product?.sellPrice}</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                )}
            />
        </View>
    );

};

const styles = {
    flatList: {
        paddingTop: 10,
        paddingBottom: 80,
    },
    buttonGroup: {
        flexDirection: 'row',
    },
    headerContainer: {
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    searchBar: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    cartButton: {
        paddingRight: 15,
        paddingLeft: 12,
        borderRadius: 20
    },
    container: {
        flex: 1,
        marginTop: 10
    },
    contentList: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    itemContainer: {
        flex: 0.5,
        paddingBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    price: {
        color: '#4caf50',
        fontWeight: 'bold',
        fontSize: 16
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
        width: width * 0.48,
        height: height * 0.3,
        marginBottom: 10
    },
    image: {
        width: '100%',
        height: 160,
        padding: 20,
        borderRadius: 8,
    }
};

export default ItemList;

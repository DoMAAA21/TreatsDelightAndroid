import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FlatList, Image, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Text } from 'react-native';
import { updateProductStatus } from '../../store/reducers/product/productSlice';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const { width, height } = Dimensions.get('screen');

const MealList = ({ products }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');


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
                showsVerticalScrollIndicator={false}
                renderItem={({ item: product }) => (
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('MealInfo', { productId: product._id })}>
                    <View style={styles.itemContainer} >
                        <View style={styles.card}>
                            <Image source={{ uri: product?.images[0]?.url }} style={styles.image} />
                            
                            <Text style={styles.title}>{product?.name}</Text>
                            <Text style={[styles.badge,{backgroundColor: product.active? 'green' : 'red' }]}>
                               {product.active ? 'Available' : 'Not Available'}
                            </Text>
                            <TouchableOpacity style={styles.switchButton} onPress={() => dispatch(updateProductStatus(product._id))}>
                                <MaterialCommunityIcon size={25} name="rotate-3d-variant" />
                            </TouchableOpacity>
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
        marginTop: 10
    },
    contentList: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'semibold'
    },
    itemContainer: {
        flex: 0.5,
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
        width: width * 0.48,
        height: height * 0.3,
        marginBottom: 10
    },
    image: {
        width: '100%',
        height: 160,
        padding: 20,
        borderRadius: 8,
    },
    switchButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#f1f3d4',
        padding: 10,
        borderRadius: 30,
    },
    badge: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        color: 'white', 
        padding: 5,
        borderRadius: 5,
        height: 30,
        fontSize: 16
    },
};

export default MealList;

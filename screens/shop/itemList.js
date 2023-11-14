import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FlatList, Image, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { allCategories } from '../../shared/inputs';
const { width, height } = Dimensions.get('screen');

const ItemList = ({ products }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategoryPress = (category) => {
        setSelectedCategory((prevCategory) =>
            prevCategory && prevCategory.value === category.value ? null : category
        );
    };

    const filteredProducts = products.filter((product) => {
        return (
            (selectedCategory ? product.category === selectedCategory.value : true) &&
            (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.sellPrice.toString().toLowerCase().includes(searchQuery.toLowerCase()))
        );
    });

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
                    <View style={styles.badgeContainer}>
                        <Text style={styles.badgeText}>3</Text>
                    </View>
                </TouchableOpacity>

            </View>
            <View style={styles.categoryContainer}>
                <FlatList
                    style={styles.categoryList}
                    data={allCategories}
                    keyExtractor={(category) => category.value}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item: category }) => (
                        <TouchableOpacity
                            style={[
                                styles.categoryItem,
                                selectedCategory?.value === category.value && { backgroundColor: '#13263e' },
                            ]}
                            onPress={() => handleCategoryPress(category)}
                        >
                            <Text style={
                                [styles.categoryText,
                                selectedCategory?.value === category.value && { color: '#fff' },]}>
                                {category.label}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>

            <FlatList
                contentContainerStyle={styles.flatList}
                data={filteredProducts}
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
    badgeContainer: {
        position: 'absolute',
        top: -4,
        right: 8,
        backgroundColor: 'red',
        borderRadius: 10,
        paddingHorizontal: 6,
    },
    badgeText: {
        color: '#fff',
        fontWeight: 'bold',
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
    },
    categoryContainer: {
        marginBottom: 10
    },
    categoryList: {
        marginTop: 10,
        paddingLeft: 10,
    },
    categoryItem: {
        marginRight: 10,
        height: 40,
        paddingHorizontal: 10,
        backgroundColor: '#f0a047',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
};

export default ItemList;

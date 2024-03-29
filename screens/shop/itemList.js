import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, Image, View, TextInput, TouchableOpacity, Dimensions, Text, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { allCategories } from '../../shared/inputs';
import { fetchStores } from '../../store/reducers/store/allStoresSlice';
import QuestionSvg from '../../assets/svg/Question';

const { width, height } = Dimensions.get('screen');

const ItemList = ({ products, onRefresh, refreshing }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedStore, setSelectedStore] = useState(null);
    const { cartItems } = useSelector(state => state.cart);
    const { stores } = useSelector(state => state.allStores);

    useEffect(() => {
        dispatch(fetchStores());
    }, [dispatch]);



    const handleCategoryPress = (category) => {
        setSelectedCategory((prevCategory) =>
            prevCategory && prevCategory.value === category.value ? null : category
        );
    };

    const handleStorePress = (store) => {

        setSelectedStore((prevStore) =>
            prevStore && prevStore.name === store.name ? null : store
        );
    };

    const filteredProducts = products?.filter((product) => {
        return (
            (selectedCategory ? product.category === selectedCategory.value : true) &&
            (selectedStore ? product.store.name === selectedStore.name : true) &&
            (product?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product?.sellPrice.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
                product?.store?.name.toLowerCase().includes(searchQuery.toLowerCase())

            )
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
                <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
                    <MaterialCommunityIcons name="cart" size={30} color="#000" />
                    <View style={styles.badgeContainer}>
                        <Text style={styles.badgeText}>{cartItems?.length}</Text>
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
                            <Text style={[styles.categoryText, selectedCategory?.value === category.value && { color: '#fff' }]}>
                                {category.label}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
            {stores && stores.length > 0 && (
                <View style={styles.categoryContainer}>
                    <FlatList
                        style={styles.categoryList}
                        data={stores}
                        keyExtractor={(store) => store._id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item: store }) => (
                            <TouchableOpacity
                                style={[
                                    styles.storeItem,
                                    selectedStore?._id === store._id && { backgroundColor: '#13263e' },
                                ]}
                                onPress={() => handleStorePress(store)}
                            >
                                <Text style={[styles.categoryText, selectedStore?.name === store.name && { color: '#fff' }]}>
                                    {store.name}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}

                <FlatList
                    contentContainerStyle={styles.flatList}
                    data={filteredProducts}
                    keyExtractor={(product) => product._id.toString()}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    renderItem={({ item: product }) => (
                        product ? (
                            <TouchableOpacity onPress={() => navigation.navigate('ItemInfo', { productId: product._id })}>
                                <View style={styles.itemContainer}>
                                    <View style={styles.card}>
                                        <Image source={{ uri: product?.images[0]?.url }} style={styles.image} />
                                        <Text style={styles.title}>{product?.name}</Text>
                                        <Text style={styles.subtitle}>{product?.store?.name}</Text>
                                        <Text style={styles.price}>₱{product?.sellPrice}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.infoContainer}>
                            <QuestionSvg height="80%" />
                            <Text style={styles.infoText}>No products found.</Text>
                        </View>
                        )
                    )}
                    
                />
           
        </View>
    );
};

const styles = {
    infoContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    infoText: {
        fontSize: 20,
        alignSelf: 'center'
    },
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
    subtitle: {
        fontSize: 16,

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
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    storeItem: {
        marginRight: 10,
        height: 40,
        paddingHorizontal: 10,
        backgroundColor: '#7a8fda',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
};

export default ItemList;
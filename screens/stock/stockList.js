import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, Image, View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { updateProductStocks, isChanged, noChanges } from '../../store/reducers/product/productSlice';


const StockList = ({ products }) => {
    const dispatch = useDispatch();
    const { isEdited } = useSelector(state => state.product);
    const [searchQuery, setSearchQuery] = useState('');
    const [localProducts, setLocalProducts] = useState(products);

    const confirmUpdate = (action) => {
        Alert.alert(
            'Confirm Changes',
            'Are You sure you want to save changes?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Update',
                    onPress: () => action().then(() => dispatch(noChanges())),
                    style: 'destructive',
                },
            ],
            { cancelable: false }
        );
    };

    const updateLocalStock = (productId, newStock) => {
        dispatch(isChanged());
        setLocalProducts((prevProducts) =>
            prevProducts.map((product) =>
                product._id === productId ? { ...product, stock: newStock } : product
            )
        );
    };
    const incrementStock = (productId) => {
        const productToUpdate = localProducts.find((product) => product._id === productId);
        if (productToUpdate && productToUpdate.stock < 999) {
            updateLocalStock(productId, productToUpdate.stock + 1);
        }
    };
    const decrementStock = (productId) => {
        const productToUpdate = localProducts.find((product) => product._id === productId);
        if (productToUpdate && productToUpdate.stock > 0) {
            updateLocalStock(productId, productToUpdate.stock - 1);
        }
    };
    const onSubmit = async () => {
        if (isEdited) {
            const filteredStock = localProducts.map(({ _id, stock }) => ({ _id, stock }));
            confirmUpdate(() => dispatch(updateProductStocks({ updatedStocks: filteredStock })));
        }
    }
    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search"
                style={styles.searchBar}
                onChangeText={(text) => setSearchQuery(text)}
                value={searchQuery}
            />
            <FlatList
                data={localProducts.filter((product) =>
                    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    product.sellPrice.toString().toLowerCase().includes(searchQuery.toLowerCase())
                )}
                contentContainerStyle={styles.flatList}
                keyExtractor={(product) => product._id.toString()}
                renderItem={({ item: product }) => (
                    <View key={product._id} style={styles.container}>
                        <View style={styles.productCard}>
                            <Image source={{ uri: product?.images[0]?.url }} style={styles.productImage} />
                            <View style={styles.productInfo}>
                                <Text style={styles.productName}>{product.name}</Text>
                                <Text style={styles.productDescription}>{product.description}</Text>
                                <Text style={styles.productPrice}>₱{product?.sellPrice.toFixed(2)} <Text style={styles.productPriceText}>per item</Text></Text>
                            </View>
                            <View style={styles.productAmount}>
                                <TouchableOpacity style={[styles.amountButton, { backgroundColor: 'red' }]} onPress={() => decrementStock(product._id)}>
                                    <Text style={styles.amountButtonText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.amountText}>{product?.stock}</Text>
                                <TouchableOpacity style={[styles.amountButton, { backgroundColor: '#5ac2ff' }]} onPress={() => incrementStock(product._id)}>
                                    <Text style={styles.amountButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            />
            <TouchableOpacity style={styles.updateButton} onPress={onSubmit}>
                <Text style={styles.updateButtonText}>Update</Text>
            </TouchableOpacity>
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
    productList: {
        flex: 1,
        paddingTop: 16,
    },
    productCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        padding: 16,
        marginBottom: 16,
    },
    productImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 16,
    },
    productInfo: {
        flex: 1,
        marginRight: 16,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    productDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffa726',
        fontStyle: 'italic'
    },
    productPriceText: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#666',

    },
    productAmount: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    amountButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    amountButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    amountText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        width: 45
    },
    updateButton: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        right: 16,
        backgroundColor: '#ff7f50',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
    },
    updateButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
};

export default StockList;

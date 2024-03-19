import React, { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as ScreenOrientation from "expo-screen-orientation";
import CategoriesList from './categoryList';
import ProductsList from './productList';
import Cart from './cart';
import { useFocusEffect } from '@react-navigation/native';
import { fetchAllStoreItems } from '../../store/reducers/product/allProductsSlice';
import { topSuccessMsg, topErrorMsg } from '../../shared/toast';
import { inventoryCheckout, checkoutReset } from '../../store/reducers/cart/inventorySlice';

const InventoryScreen = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.allProducts);
    const { success, error } = useSelector((state) => state.inventory);
    const [selectedCategory, setSelectedCategory] = useState(null);
   
    const [cart, setCart] = useState([]);
    useFocusEffect(
        useCallback(() => {
            checkOrientation();
            changeOrientation(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)
            return () => {
                changeOrientation(ScreenOrientation.OrientationLock.PORTRAIT_UP)
            };
        }, []));

    useFocusEffect(useCallback(()=>{
        dispatch(fetchAllStoreItems());
    },[dispatch]));


    useFocusEffect(useCallback(()=>{
        if (success) {
            topSuccessMsg('Checkout success');
            dispatch(fetchAllStoreItems());
            dispatch(checkoutReset());
            setCart([]);
        }
        if (error) {
            topErrorMsg(`Checkout Error: ${error}`);
            dispatch(clearErrors());
        }
    },[success, error]));



    const checkOrientation = async () => {
         await ScreenOrientation.getOrientationAsync();
    };
    const changeOrientation = async (newOrientation) => {
        await ScreenOrientation.lockAsync(newOrientation);
    };


    const onSelectCategory = (category) => {
        setSelectedCategory((prevCategory) => (prevCategory === category ? null : category));
    };

    const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

    const handleAddToCart = (product) => {
        const existingCartItemIndex = cart.findIndex((cartItem) => cartItem._id === product._id);
        if(product.category.toLowerCase() !== "meals" && product.stock <= 0){
            errorMsg('Insufficient Stock available');
            return;
        }
        
        if (existingCartItemIndex !== -1) {
            const updatedCart = [...cart];
            if (product.category.toLowerCase() !== "meals" && product.stock <= updatedCart[existingCartItemIndex].quantity) {
                errorMsg('Insufficient Stock available');
                return;
            }
        
            updatedCart[existingCartItemIndex].quantity += 1;
            setCart(updatedCart);
            return;
        }
        

        
        setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);

    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            errorMsg('No items in cart');
            return;
        }
        const totalPrice = cart.reduce((acc, item) => acc + item.sellPrice * (item?.quantity ?? 0), 0);
        dispatch(inventoryCheckout({ cartItems: cart, totalPrice }));
    }

    const handleRemoveFromCart = (itemId) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
    };

    

    return (
        <>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <CategoriesList onSelectCategory={onSelectCategory} />
                </View>
                <View style={styles.middleContainer}>
                    <ProductsList products={filteredProducts} onAddToCart={handleAddToCart} />
                </View>
                <View style={styles.rightContainer}>
                    
                    <Cart cart={cart} handleCheckout={handleCheckout} handleRemoveItem={handleRemoveFromCart}  />
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#ebf0f7', 
    },
    leftContainer: {
        flex: 1,
        borderRightWidth: 1,
        borderRightColor: '#CCCCCC', // Border color between categories and products
    },
    middleContainer: {
        flex: 2.5,
    },
    rightContainer: {
        flex: 1.5,
        borderLeftWidth: 1,
        borderLeftColor: '#CCCCCC', // Border color between products and cart
    },
});

export default InventoryScreen;

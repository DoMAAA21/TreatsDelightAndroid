import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { WEB_URL } from '../../shared/constants';
import { checkoutCart } from '../../store/reducers/cart/cartSlice';
const PayPalIntegrationScreen = () => {
    const webViewRef = useRef(null);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { cartItems, loading } = useSelector(state => state.cart);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2);

    const onReserve = async () => {
        const isReserve = true;
        if (cartItems.length === 0) {
            topErrorMsg('Empty Cart')
            return;
        }
        const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2);
        await dispatch(checkoutCart({ cartItems, totalPrice, isReserve })).then(() => {
            navigation.navigate('Receipt');
        })

    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#000" style={[styles.activityIndicator, { transform: [{ scale: 1.5 }] }]} />
            </View>

        )
    }

    return (
        <View style={styles.container}>

            <WebView
                ref={webViewRef}
                source={{ uri: `${WEB_URL}/mobile-payment/${totalPrice}` }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                style={styles.webview}
                onMessage={onReserve}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    webview: {
        flex: 1,
    },
    button: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#007bff',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    activityIndicator: {
        position: 'absolute',
        alignSelf: 'center',
        top: '50%',
        zIndex: 1,
    },
});

export default PayPalIntegrationScreen;

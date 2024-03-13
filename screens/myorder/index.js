import React from 'react';
import { View, StyleSheet } from 'react-native';
import OrderHistory from './myOrder';

const orders = [
    { date: '2024-03-13', totalAmount: 50.00 },
    { date: '2024-03-10', totalAmount: 75.00 },
];

const MyOrderScreen = () => {
    return (
        <View style={styles.container}>
            <OrderHistory orders={orders} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
});


export default MyOrderScreen;

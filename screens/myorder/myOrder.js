import React from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';


const getOrderStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return "#D97706";
      case 'paid':
        return "#16A34A";
      case 'complete':
        return "#4299e1";
      case 'incomplete':
        return "#EF4444";
      default:
        return "black";
    }
}

const OrderHistory = ({ orders, refreshing, onRefresh }) => {



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Order History</Text>
            <FlatList
                data={orders}
                keyExtractor={(order, index) => index.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                renderItem={({ item: order }) => (
                    <View key={order?.orderItems?.id} style={styles.orderItem}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.orderDate}>{new Date(order?.createdAt).toISOString().slice(0, 10)}</Text>
                            <Text style={styles.productName}>{order?.orderItems.name}</Text>
                        </View>

                        <Text style={styles.orderDetails}>Qty:{order?.orderItems?.quantity} x ₱{order?.orderItems?.price}</Text>
                        <View style={styles.titleContainer}>
                            <Text style={styles.orderDetails}>Total Amount: ₱{(order?.orderItems?.quantity) * (order?.orderItems?.price)}</Text>
                            <View style={[styles.statusContainer,{backgroundColor: getOrderStatusStyle(order.orderItems.status)}]}>
                            <Text style={styles.textStatus} >{(order?.orderItems?.status)}</Text> 
                            </View>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    orderItem: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#ECFDF5',
        borderRadius: 15,
        padding: 10,
        marginBottom: 10,
       
    },
    orderDate: {
        fontSize: 16,
        marginBottom: 5,
    },
    productName:{
        fontSize: 20,
        fontStyle: "italic",
        fontWeight: "700"
    },
    orderDetails: {
        fontSize: 14,
    },
    statusContainer:{
        padding: 3,
        borderRadius: 5,
    },
    textStatus:{
      color: "#fff",
      fontSize: 16,
      fontWeight: "600"

    }
});

export default OrderHistory;

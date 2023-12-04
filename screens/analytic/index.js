import React, { useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, Dimensions, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import OrdersPerMonth from './chart/ordersPerMonth';
import ProductsSold from './chart/productsSold';
import SalesPerMonth from './chart/salesPerMonth';
import { fetchAllOrders, clearAllOrders } from '../../store/reducers/chart/allOrdersSlice';
import { fetchAllSold, clearAllSold } from '../../store/reducers/chart/productsSoldSlice';
import { fetchAllSales, clearAllSales } from '../../store/reducers/chart/allSalesSlice';
import { fetchAllItems } from '../../store/reducers/product/allProductsSlice';
import Card from './card';
import Food from '../../assets/svg/Food';
import Order from '../../assets/svg/Order';
import Peso from '../../assets/svg/Peso';
import Employees from '../../assets/svg/Employees'

const { height } = Dimensions.get('window');
const data = [{ value: 50 }, { value: 80 }, { value: 90 }, { value: 70 }];

const ChartScreen = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector(state => state.allOrders);
    const { sold, loading: soldLoading } = useSelector(state => state.allSold);
    const { sales, loading: salesLoading } = useSelector(state => state.allSales);
    const { items } = useSelector(state => state.allProducts);
    const [loading, setLoading] = useState(true);
    const fetchAllOrdersAction = useMemo(() => fetchAllOrders(), []);
    const fetchAllSoldAction = useMemo(() => fetchAllSold(), []);
    const fetchAllSalesAction = useMemo(() => fetchAllSales(), []);
    const fetchAllItemsAction = useMemo(() => fetchAllItems(), []);
    const totalOrder = orders && orders.reduce((sum, { totalOrderItems }) => sum + totalOrderItems, 0);
    const totalSales = sales && sales.reduce((sum, { totalSales }) => sum + totalSales, 0);
    const totalItems = items.length;



    useFocusEffect(
        useCallback(() => {
            dispatch(fetchAllOrdersAction).then(() => {
                setLoading(false);
            });
            dispatch(fetchAllSoldAction);
            dispatch(fetchAllSalesAction);
            dispatch(fetchAllItemsAction);
            return () => {
                dispatch(clearAllOrders());
                dispatch(clearAllSold());
                dispatch(clearAllSales());
            }
        }, [fetchAllOrdersAction, fetchAllSoldAction, fetchAllSalesAction])
    );

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="extralarge" color="#000" />
            </View>
        );
    }
    return (
        <>
            <View style={styles.container}>
                <View style={styles.row}>
                    <Card title="Total Products" value={totalItems} icon={<Food height={40} width={40} />} />

                    <Card title="Total Orders" value={totalOrder} icon={<Order height={40} width={40} />} />
                </View>
                <View style={styles.row}>
                    <Card title="Total Employees" value={2} icon={<Employees height={40} width={40} />} />

                    <Card title="Total Sales" value={`₱${totalSales}`} icon={<Peso height={40} width={40} />} />
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <View>
                        <Text style={styles.title}>Sales Per Month</Text>
                        {salesLoading ? <ActivityIndicator /> : <SalesPerMonth data={sales} />}
                    </View>
                    <View>
                        <Text style={styles.title}>Orders Per Month</Text>
                        <OrdersPerMonth data={orders} />
                    </View>
                    <View>
                        {soldLoading ? <ActivityIndicator /> : <ProductsSold data={sold} />}
                    </View>

                </ScrollView>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingTop: 10,
        backgroundColor: '#ebf0f7'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        alignSelf: 'center',
    },
    bottomContainer: {
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: height * 0.6,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'justify',
        backgroundColor: 'white',
        paddingTop: 20,
        paddingHorizontal: 10
    },
    scrollView: {
        alignItems: 'center',
        justifyContent: 'center',
    }

});


export default ChartScreen;

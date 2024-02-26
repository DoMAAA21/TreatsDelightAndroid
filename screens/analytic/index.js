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
import { fetchAllProducts } from '../../store/reducers/product/allProductsSlice';
import { getStoreDetails } from '../../store/reducers/store/storeDetailsSlice';
import Card from './card';
import Food from '../../assets/svg/Food';
import Order from '../../assets/svg/Order';
import Peso from '../../assets/svg/Peso';
import Employees from '../../assets/svg/Employees'

const { height } = Dimensions.get('window');




const formattedExpenses= (value) => {
    const formattedValue = (value || 0) < 0 ? `-₱${Math.abs(value || 0)}` : `₱${value || 0}`;
    const color = value && value < 0 ? 'red' : 'green';
    return { formattedValue, color };
  };

const ChartScreen = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector(state => state.allOrders);
    const { user } = useSelector(state => state.auth);
    const { store } = useSelector((state) => state.storeDetails);
    const { sold, loading: soldLoading } = useSelector(state => state.allSold);
    const { sales, loading: salesLoading } = useSelector(state => state.allSales);
    const { products } = useSelector(state => state.allProducts);
    const [loading, setLoading] = useState(true);
    const totalOrder = orders && orders.reduce((sum, { totalOrderItems }) => sum + totalOrderItems, 0);
    const totalSales = sales && sales.reduce((sum, { totalSales }) => sum + totalSales, 0);
    const totalItems = products.length;

    const electricity = formattedExpenses(store?.electricity);
    const water = formattedExpenses(store?.water);
    const rent = formattedExpenses(store?.rent);



    useFocusEffect(
        useCallback(() => {
            dispatch(fetchAllOrders()).then(()=>{
                setLoading(false);
            });
            

            if (user?.store?.storeId) {
                dispatch(getStoreDetails(user.store.storeId));
            }
            dispatch(fetchAllSold());
            dispatch(fetchAllSales());
            dispatch(fetchAllProducts());
            return () => {
                dispatch(clearAllOrders());
                dispatch(clearAllSold());
                dispatch(clearAllSales());
                setLoading(true);
            }
        }, [dispatch])
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
                    <Card title="Rent" 
                    value={rent.formattedValue}
                    valueStyle={{ color: rent.color }}
                    icon={<Food height={40} width={40} />} />

                    <Card title="Electricity" 
                    value={electricity.formattedValue}
                    valueStyle={{ color: electricity.color }}
                    icon={<Order height={40} width={40} />} />
                </View>
                <View style={styles.row}>
                    <Card title="Water" 
                    value={water.formattedValue}
                    valueStyle={{ color: water.color }}
                    icon={<Employees height={40} width={40} />} />

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
                       {/* { orders && <OrdersPerMonth data={orders} /> }  */}
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

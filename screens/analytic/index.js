import React, { useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, Dimensions, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import { BarChart, LineChart as LineChart1 } from "react-native-gifted-charts";
import OrdersPerMonth from './chart/ordersPerMonth';
import ProductsSold from './chart/productsSold';
import { fetchAllOrders, clearAllOrders } from '../../store/reducers/chart/allOrdersSlice';
import { fetchAllSold, clearAllSold } from '../../store/reducers/chart/productsSoldSlice';
import Card from './card';
import Food from '../../assets/svg/Food';
import Order from '../../assets/svg/Order';
import Peso from '../../assets/svg/Peso';

const { height, width } = Dimensions.get('window');
const data = [{ value: 50 }, { value: 80 }, { value: 90 }, { value: 70 }];

const ChartScreen = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector(state => state.allOrders);
    const { sold } = useSelector(state => state.allSold);
    const [loading, setLoading] = useState(true);
    const fetchAllOrdersAction = useMemo(() => fetchAllOrders(), []);
    const clearAllOrdersAction = useMemo(() => clearAllOrders(), []);
    const fetchAllSoldAction = useMemo(() => fetchAllSold(), []);
    const clearAllSoldAction = useMemo(() => clearAllSold(), []);
    const totalOrder = orders && orders.reduce((sum, { totalOrderItems }) => sum + totalOrderItems, 0);


    useFocusEffect(
        useCallback(() => {
            dispatch(fetchAllOrdersAction).then(() => {
                setLoading(false);
            });
            dispatch(fetchAllSoldAction);
            return () => {
                dispatch(clearAllOrdersAction);
                dispatch(clearAllSoldAction);
            }
        }, [fetchAllOrdersAction, fetchAllSoldAction])
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
                    <Card title="Total Products" value={30} icon={<Food height={40} width={40} />} />

                    <Card title="Total Orders" value={totalOrder} icon={<Order height={40} width={40} />} />
                </View>
                <View style={styles.row}>
                    <Card title="Total Employees" value={30} icon={<Food height={40} width={40} />} />

                    <Card title="Total Sales" value={30} icon={<Peso height={40} width={40} />} />
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <View>
                        <Text style={styles.title}>Orders Per Month</Text>
                        <OrdersPerMonth data={orders} />
                    </View>
                    <View>
                        <ProductsSold data={sold} />
                    </View>
                    <BarChart data={data}
                        showFractionalValue
                        showYAxisIndices
                        hideRules
                        noOfSections={4}
                        maxValue={400}
                        barWidth={40}
                        sideWidth={15}
                        isThreeD
                        backgroundColor={'#FECF9E'}
                        width={400}
                        side="right"
                    />

                    <LineChart1

                        initialSpacing={0}
                        spacing={100}
                        // hideDataPoints
                        thickness={3}
                        // hideRules
                        // hideYAxisText
                        yAxisColor="#0BA5A4"
                        // showVerticalLines
                        verticalLinesColor="rgba(14,164,164,0.5)"
                        xAxisColor="#0BA5A4"
                        color="#0BA5A4"
                        width={400}
                        data={data} />


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
        color: 'black'
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

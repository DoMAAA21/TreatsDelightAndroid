import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, Dimensions, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import { BarChart, LineChart as LineChart1, PieChart } from "react-native-gifted-charts";
import OrdersPerMonth from './chart/ordersPerMonth';
import { fetchAllOrders, clearAllOrders } from '../../store/reducers/chart/allOrdersSlice';
import Card from './card';
import Food from '../../assets/svg/Food';
import Order from '../../assets/svg/Order';
import Peso from '../../assets/svg/Peso';

const { height, width } = Dimensions.get('window');
const data = [{ value: 50 }, { value: 80 }, { value: 90 }, { value: 70 }];

const ChartScreen = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector(state => state.allOrders);
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(true);
    useFocusEffect(
        useCallback(() => {
            dispatch(fetchAllOrders()).then(() => {
                setLoading(false);
            })

            return () => {
                dispatch(clearAllOrders());
            }
        }, [])
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

                    <Card title="Total Orders" value={30} icon={<Order height={40} width={40} />} />
                </View>
                <View style={styles.row}>
                    <Card title="Total Employees" value={30} icon={<Food height={40} width={40} />} />

                    <Card title="Total Sales" value={30} icon={<Peso height={40} width={40} />} />
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <Text style={styles.title}>Orders Per Month</Text>
                    <OrdersPerMonth data={orders} />
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
                    <PieChart
                        donut
                        isThreeD
                        showText
                        innerCircleBorderWidth={6}
                        innerCircleBorderColor="lightgray"
                        shiftInnerCenterX={-10}
                        shiftInnerCenterY={-15}
                        textColor="black"
                        radius={170}
                        textSize={20}
                        showTextBackground
                        textBackgroundRadius={26}
                        // data={pieData}
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
        padding: 20,
    },
    scrollView:{
        alignItems: 'center',
        justifyContent: 'center',
    }

});


export default ChartScreen;

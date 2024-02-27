import React, { useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, Dimensions, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import OrdersPerMonth from './chart/ordersPerMonth';
import ElectricBillChart from './chart/electricBillsPerMonth';
import WaterBillChart from './chart/waterBillsPerMonth';
import ProductsSold from './chart/productsSold';
import SalesPerMonth from './chart/salesPerMonth';
import { fetchAllOrders } from '../../store/reducers/chart/allOrdersSlice';
import { fetchAllSold } from '../../store/reducers/chart/productsSoldSlice';
import { fetchSalesThisMonth, fetchSalesToday } from '../../store/reducers/chart/allSalesSlice';
import { getStoreDetails } from '../../store/reducers/store/storeDetailsSlice';
import Card from './card';
import RentIcon from '../../assets/svg/RentIcon';
import WaterIcon from '../../assets/svg/WaterIcon';
import Peso from '../../assets/svg/Peso';
import ElectricityIcon from '../../assets/svg/ElectricityIcon'

const { height } = Dimensions.get('window');




const formattedExpenses = (value) => {
    const formattedValue = (value || 0) < 0 ? `-₱${Math.abs(value || 0)}` : `₱${value || 0}`;
    const color = value && value < 0 ? 'red' : 'green';
    return { formattedValue, color };
};

const ChartScreen = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { store } = useSelector((state) => state.storeDetails);
    const { sold, loading: soldLoading } = useSelector(state => state.allSold);
    const { salesThisMonth, salesToday, loading: salesLoading } = useSelector(state => state.allSales);
    const [loading, setLoading] = useState(true);
    // const totalSales = sales && sales.reduce((sum, { totalSales }) => sum + totalSales, 0);

    const electricity = formattedExpenses(store?.electricity);
    const water = formattedExpenses(store?.water);
    const rent = formattedExpenses(store?.rent);

    useFocusEffect(
        useCallback(() => {
            dispatch(fetchAllOrders()).then(() => {
                setLoading(false);
            });


            if (user?.store?.storeId) {
                dispatch(getStoreDetails(user?.store?.storeId));
            }
            dispatch(fetchAllSold());
            dispatch(fetchSalesThisMonth());
            dispatch(fetchSalesToday())

            return () => {
                setLoading(true);
            }
        }, [dispatch, user?.store])
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
                        icon={<RentIcon height={40} width={40} />} />

                    <Card title="Electricity"
                        value={electricity.formattedValue}
                        valueStyle={{ color: electricity.color }}
                        icon={<ElectricityIcon height={40} width={40} />} />
                </View>
                <View style={styles.row}>
                    <Card title="Water"
                        value={water.formattedValue}
                        valueStyle={{ color: water.color }}
                        icon={<WaterIcon height={40} width={40} />} />

                    {/* <Card title="Sales This Month" value={`₱${salesThisMonth}`} icon={<Peso height={40} width={40} />} /> */}
                </View>

            </View>
            <View style={styles.bottomContainer}>
                <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>

                    <View style={styles.row}>
                        <Card title="Sales Today" value={`₱${salesToday}`} valueStyle={{ color: 'green' }} icon={<Peso height={40} width={40} />} />

                        <Card title="Sales This Month" value={`₱${salesThisMonth}`} valueStyle={{ color: 'green' }} icon={<Peso height={40} width={40} />} />
                    </View>
                    <View>
                        {soldLoading ? <ActivityIndicator /> : <ProductsSold data={sold} />}
                    </View>
                    <View>
                        <Text style={styles.title}>Electric Bill Per Month</Text>
                    
                        <ElectricBillChart />
                    </View>
                    <View>
                        <Text style={styles.title}>Water Bill Per Month</Text>
                        
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

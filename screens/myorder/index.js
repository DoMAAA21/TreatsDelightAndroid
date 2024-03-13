import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import OrderHistory from './myOrder';
import { fetchAllMyOrders } from '../../store/reducers/myorder/myOrdersSlice';



const MyOrderScreen = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector(state => state.myOrders);
    const [refreshed, setRefreshed] = useState(false);
    const [refreshing, setRefreshing] = useState(false);


    const onRefresh = () => {
        setRefreshed(true)
      };


    useFocusEffect(
        useCallback(() => {
            dispatch(fetchAllMyOrders()); 
            
            if(refreshed){
                setRefreshing(true)
                dispatch(fetchAllMyOrders()); 
                setRefreshing(false)
                setRefreshed(false);
              }


        }, [dispatch, refreshed]));

    return (
        <View style={styles.container}>
            <OrderHistory orders={orders} onRefresh={onRefresh} refreshing={refreshing} />
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

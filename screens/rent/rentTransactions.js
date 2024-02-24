import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import {  useFocusEffect, useRoute } from '@react-navigation/native';
import Transactions from './transactionList';
import { fetchAllRents, clearErrors, clearRents } from '../../store/reducers/rent/allRentsSlice';
import { errorMsg } from '../../shared/toast';

const RentTransactionScreen = () => {
    const dispatch = useDispatch();
    const route = useRoute();
    const { id } = route.params;
    const { error, rents } = useSelector(state => state.allRent);
   
    useFocusEffect(
        useCallback(() => {
            dispatch(fetchAllRents(id));
            if (error) {
                errorMsg(error)
                dispatch(clearErrors())
            }
            return () => {
                dispatch(clearRents())
            };
        }, [dispatch, error])
    );
    return (
        <View style={styles.container}>
            <Transactions rents={rents} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    card: {
        padding: 20,
        marginVertical: 10,
        backgroundColor: 'transparent',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        elevation: 2,
        borderRadius: 5,
        height: 80,
        backgroundColor: '#b4e373',
    },
    title: {
        color: 'black',
        textAlign: 'center',
        fontSize: 25,
        marginBottom: 10,
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default RentTransactionScreen;

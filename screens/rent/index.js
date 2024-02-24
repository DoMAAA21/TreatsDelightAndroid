import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import {  useFocusEffect } from '@react-navigation/native';
import StoreList from './storeList';
import { fetchAllStores, clearErrors, clearStores } from '../../store/reducers/store/allStoresSlice';
import { errorMsg } from '../../shared/toast';

const RentScreen = () => {
    const dispatch = useDispatch();
    const { error, stores } = useSelector(state => state.allStores);
   
    useFocusEffect(
        useCallback(() => {
            dispatch(fetchAllStores());
            if (error) {
                errorMsg(error)
                dispatch(clearErrors())
            }
            return () => {
                dispatch(clearStores())
            };
        }, [dispatch, error])
    );
    return (
        <View style={styles.container}>
            <StoreList stores={stores} />
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

export default RentScreen;

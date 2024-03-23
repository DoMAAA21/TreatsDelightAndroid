import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useFocusEffect, useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Transactions from './transactionList';
import { fetchAllRents, clearErrors, clearRents } from '../../store/reducers/rent/allRentsSlice';
import { errorMsg, successMsg } from '../../shared/toast';
import { deleteRentReset, updateRentReset } from '../../store/reducers/rent/rentSlice';

const RentTransactionScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;
    const { error, rents } = useSelector(state => state.allRent);
    const { isDeleted, isUpdated } = useSelector(state => state.rent);
    const [firstLoading, setFirstLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            dispatch(fetchAllRents(id)).then(() => {
                setFirstLoading(false);
            });
            if (error) {
                errorMsg(error)
                dispatch(clearErrors())
            }
            return () => {
                dispatch(clearRents())
            };
        }, [dispatch, error])
    );

    useEffect(() => {
        if (isDeleted) {
            successMsg('Deleted', 'Rent Removed');
            dispatch(deleteRentReset());
            dispatch(fetchAllRents(id));
        }

        if (isUpdated) {
            successMsg('Updated', 'Rent Updated');
            dispatch(updateRentReset());
            dispatch(fetchAllRents(id));
        }
    }, [isDeleted,  isUpdated])

    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={() => navigation.navigate('RentArchives', { id })} style={styles.archivesButton}>
                <Ionicons name="archive" size={25} style={{ marginLeft: 'auto', color: 'black' }} />
            </TouchableOpacity>
            {firstLoading ? <ActivityIndicator size="large" style={styles.loadingIndicator} /> : <Transactions rents={rents} storeId={id} />}
            <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate('AddRent', { id })}>
                <Text style={styles.floatingButtonText}>+</Text>
            </TouchableOpacity>
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
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 66,
        height: 66,
        borderRadius: 33,
        backgroundColor: '#16aec1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    floatingButtonText: {
        fontSize: 30,
        color: 'white',
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    archivesButton: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderRadius: 5,
        width: 50,
        alignSelf: 'flex-end'
    },
    archivesButtonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: '700',
    },
});

export default RentTransactionScreen;

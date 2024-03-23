import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useFocusEffect, useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Transactions from './transactionList';
import { fetchAllWaters, clearErrors, clearWaters } from '../../store/reducers/water/allWatersSlice';
import { errorMsg, successMsg } from '../../shared/toast';
import { deleteWaterReset, updateWaterReset } from '../../store/reducers/water/waterSlice';

const WaterTransactionScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;
    const { error, waters } = useSelector(state => state.allWater);
    const { isDeleted, isUpdated } = useSelector(state => state.water);
    const [firstLoading, setFirstLoading] = useState(true);
    useFocusEffect(
        useCallback(() => {
            dispatch(fetchAllWaters(id)).then(() => {
                setFirstLoading(false);
            });
            if (error) {
                errorMsg(error)
                dispatch(clearErrors())
            }
            return () => {
                dispatch(clearWaters())
            };
        }, [dispatch, error])
    );

    useEffect(() => {
        if (isDeleted) {
            successMsg('Deleted', 'Water Removed');
            dispatch(deleteWaterReset());
            dispatch(fetchAllWaters(id));
        }

        if (isUpdated) {
            successMsg('Updated', 'Paid');
            dispatch(updateWaterReset());
            dispatch(fetchAllWaters(id));
        }
    }, [isDeleted, isUpdated])

    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={() => navigation.navigate('WaterArchives', { id })} style={styles.archivesButton}>
                <Ionicons name="archive" size={25} style={{ marginLeft: 'auto', color: 'black' }} />
            </TouchableOpacity>
            {firstLoading ? <ActivityIndicator size="large" style={styles.loadingIndicator} /> : <Transactions waters={waters} storeId={id} />}
            <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate('AddWater', { id })}>
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

export default WaterTransactionScreen;

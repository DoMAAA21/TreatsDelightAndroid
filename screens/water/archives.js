import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import ArchivesList from './archivesList';
import { fetchArchivedWaters, clearErrors, clearWaters } from '../../store/reducers/water/allWatersSlice';
import { errorMsg, successMsg } from '../../shared/toast';
import { restoreWaterReset } from '../../store/reducers/water/waterSlice';

const WaterArchiveScreen = () => {
    const dispatch = useDispatch();
    const route = useRoute();
    const { id } = route.params;
    const { error, waters } = useSelector(state => state.allWater);
    const { isRestored } = useSelector(state => state.water);
    const [firstLoading, setFirstLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            dispatch(fetchArchivedWaters(id)).then(() => {
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
        if (isRestored) {
            successMsg('Restored', 'Water Restored');
            dispatch(restoreWaterReset());
            dispatch(fetchArchivedWaters(id));
        }
    }, [isRestored])

    return (
        <View style={styles.container}>
            {firstLoading ? <ActivityIndicator size="large" style={styles.loadingIndicator} /> : <ArchivesList waters={waters} />}
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
    }
});

export default WaterArchiveScreen;

import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import ArchivesList from './archivesList';
import { fetchArchivedRents, clearErrors, clearRents } from '../../store/reducers/rent/allRentsSlice';
import { errorMsg, successMsg } from '../../shared/toast';
import { deleteRentReset, restoreRentReset } from '../../store/reducers/rent/rentSlice';

const RentArchiveScreen = () => {
    const dispatch = useDispatch();
    const route = useRoute();
    const { id } = route.params;
    const { error, rents} = useSelector(state => state.allRent);
    const { isRestored } = useSelector(state => state.rent);
    const [ firstLoading, setFirstLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            dispatch(fetchArchivedRents(id)).then(()=>{
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

    useEffect(()=>{
        if (isRestored) {
          successMsg('Restored','Rent Restored');
          dispatch(restoreRentReset());
          dispatch(fetchArchivedRents(id));
        }
      },[isRestored])
      
    return (
        <View style={styles.container}>
            {firstLoading ? <ActivityIndicator size="large" style={styles.loadingIndicator} /> : <ArchivesList rents={rents} />}
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

export default RentArchiveScreen;

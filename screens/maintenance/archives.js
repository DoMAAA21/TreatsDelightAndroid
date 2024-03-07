import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import ArchivesList from './archivesList';
import { fetchArchivedMaintenances, clearErrors, clearMaintenances } from '../../store/reducers/maintenance/allMaintenancesSlice';
import { errorMsg, successMsg } from '../../shared/toast';
import { restoreMaintenanceReset } from '../../store/reducers/maintenance/maintenanceSlice';

const MaintenanceArchiveScreen = () => {
    const dispatch = useDispatch();
    const route = useRoute();
    const { id } = route.params;
    const { error, maintenances} = useSelector(state => state.allMaintenance);
    const { isRestored } = useSelector(state => state.maintenance);
    const [ firstLoading, setFirstLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            dispatch(fetchArchivedMaintenances(id)).then(()=>{
                setFirstLoading(false);
            });
            if (error) {
                errorMsg(error)
                dispatch(clearErrors())
            }
            return () => {
                dispatch(clearMaintenances())
            };
        }, [dispatch, error])
    );

    useEffect(()=>{
        if (isRestored) {
          successMsg('Restored','Maintenance Restored');
          dispatch(restoreMaintenanceReset());
          dispatch(fetchArchivedMaintenances(id));
        }
      },[isRestored])
      
    return (
        <View style={styles.container}>
            {firstLoading ? <ActivityIndicator size="large" style={styles.loadingIndicator} /> : <ArchivesList maintenances={maintenances} />}
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
        backgroundColor: 'transpamaintenance',
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

export default MaintenanceArchiveScreen;

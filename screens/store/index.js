import React, { useEffect, useState, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text} from 'galio-framework';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import StoreList from './storeList';
import { fetchAllStores , clearErrors, clearStores } from '../../store/reducers/store/allStoresSlice';
import { deleteStoreReset, updateStoreReset } from '../../store/reducers/store/storeSlice';
import { successMsg, errorMsg } from '../../shared/toast';

const StoreScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { error, stores } = useSelector(state => state.allStores);
  const { success } = useSelector(state => state.newStore);
  const { isDeleted, isUpdated, error: errorStore } = useSelector(state => state.store)
  const [ firstLoading, setFirstLoading] = useState(true);


  
  useFocusEffect(
    useCallback(() => {
    if (success) {
      dispatch(fetchAllStores());
    } else {
      dispatch(fetchAllStores())
      .then(() => {
        setFirstLoading(false);
      });
    }

    if (error) {
      errorMsg(error)
      dispatch(clearErrors())
    }

    return () => {
      dispatch(clearStores())
  };


  }, [dispatch, error, success])
);
useEffect(()=>{
  if (isDeleted) {
    successMsg('Deleted','Store Removed');
    dispatch(deleteStoreReset());
    dispatch(fetchAllStores());
  }
  if (isUpdated) {
    successMsg('Updated','Store Updated');
    dispatch(updateStoreReset());
    dispatch(fetchAllStores());
  }
  if (errorStore){    
    errorMsg(errorStore); 
    dispatch(deleteStoreReset());
    dispatch(fetchAllStores());
  }
},[isDeleted, isUpdated, errorStore])




  return (
    <View style={styles.container}>
      {firstLoading ? <ActivityIndicator size="large" style={styles.loadingIndicator} /> : <StoreList stores={stores} />}
      <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate('AddStore')}>
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
  addButton: {
    marginTop: 20,
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

export default StoreScreen;

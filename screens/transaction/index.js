import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import TransactionList from './transactionList';
import { fetchAllTransactions, clearErrors, clearTransaction } from '../../store/reducers/transaction/allTransactionsSlice';
import { updateTransactionReset } from '../../store/reducers/transaction/transactionSlice';
import { successMsg, errorMsg } from '../../shared/toast';


const TransactionScreen = () => {
  const dispatch = useDispatch();
  const { error, transactions } = useSelector(state => state.allTransactions);
  const { isUpdated } = useSelector(state => state.transaction)
  const [firstLoading, setFirstLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchAllTransactions()).then(()=>{
        setFirstLoading(false);
      });
    
      if (error) {
        errorMsg(error)
        dispatch(clearErrors())
      }
      return () => {
        dispatch(clearTransaction())
      };

    }, [dispatch, error])
  );

  useEffect(() => {
    if (isUpdated) {
      successMsg('Updated', 'Transaction Updated');
      dispatch(updateTransactionReset());
      dispatch(fetchAllTransactions());
    }

  }, [isUpdated])

  const handleRefresh = async () => {
    setRefreshing(true);
    dispatch(fetchAllTransactions()).then(()=>{
      setRefreshing(false);
    });
  };


  return (
    <View style={styles.container}>
      {firstLoading ? <ActivityIndicator size="large" style={styles.loadingIndicator} /> : <TransactionList transactions={transactions} refreshing={refreshing} handleRefresh={handleRefresh} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ebf0f7',
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

export default TransactionScreen;

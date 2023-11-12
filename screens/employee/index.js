import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text } from 'galio-framework';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import EmployeeList from './employeeList';
import { fetchAllEmployees, clearErrors, clearEmployee } from '../../store/reducers/employee/allEmployeesSlice';
import { deleteEmployeeReset, updateEmployeeReset } from '../../store/reducers/employee/employeeSlice';
import { successMsg, errorMsg } from '../../shared/toast';


const EmployeeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { error, employees } = useSelector(state => state.allEmployees);
  const { success } = useSelector(state => state.newEmployee);
  const { isDeleted, isUpdated, error: errorEmployee } = useSelector(state => state.employee)
  const [firstLoading, setFirstLoading] = useState(true);




  useFocusEffect(
    useCallback(() => {
      if (success) {
        dispatch(fetchAllEmployees());
      } else {
        dispatch(fetchAllEmployees())
          .then(() => {
            setFirstLoading(false);
          });
      }
      if (error) {
        errorMsg(error)
        dispatch(clearErrors())
      }
      return () => {
        dispatch(clearEmployee())
      };

    }, [dispatch, success, error])
  );

  useEffect(() => {
    if (isDeleted) {
      successMsg('Deleted', 'Employee Removed');
      dispatch(deleteEmployeeReset());
      dispatch(fetchAllEmployees());
    }

    if (isUpdated) {
      successMsg('Updated', 'Employee Updated');
      dispatch(updateEmployeeReset());
      dispatch(fetchAllEmployees());
    }
    if (errorEmployee) {
      errorMsg(errorEmployee);
      dispatch(deleteEmployeeReset());
      dispatch(fetchAllEmployees());
    }


  }, [isDeleted, isUpdated, errorEmployee])


  return (
    <View style={styles.container}>
      {firstLoading ? <ActivityIndicator size="large" style={styles.loadingIndicator} /> : <EmployeeList employees={employees} />}
      <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate('AddEmployee')}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
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

export default EmployeeScreen;

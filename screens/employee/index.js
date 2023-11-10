import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { Text } from 'galio-framework';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import EmployeeList from './employeeList';
import { fetchAllEmployees, clearErrors, clearEmployee } from '../../store/reducers/employee/allEmployeesSlice';
// import { deleteEmployeeReset, updateEmployeeReset } from '../../store/reducers/employee/employeeSlice';
import { successMsg, errorMsg } from '../../shared/toast';

const { width, height } = Dimensions.get('screen');
const buttonSize = Math.min(width * 0.15, height * 0.25);


const EmployeeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { error, employees, loading } = useSelector(state => state.allEmployees);
  // const { success } = useSelector(state => state.newEmployee);
  // const { isDeleted, isUpdated, error: errorEmployee } = useSelector(state => state.employee)
  // const [ firstLoading, setFirstLoading] = useState(true);




  useFocusEffect(
    useCallback(() => {
      dispatch(fetchAllEmployees());
      // if (success) {
      //   dispatch(fetchAllEmployees());
      // } else {
      //   dispatch(fetchAllEmployees())
      //   .then(() => {
      //     setFirstLoading(false);
      //   });
      // }
      // if (error) {
      //   errorMsg(error)
      //   dispatch(clearErrors())
      // }
      return () => {
        dispatch(clearEmployee())
      };

    }, [dispatch])
  );

  // useEffect(() => {
  //   if (isDeleted) {
  //     successMsg('Deleted','Employee Removed');
  //     dispatch(deleteEmployeeReset());
  //     dispatch(fetchAllEmployees());
  //   }

  //   if (isUpdated) {
  //     successMsg('Updated','Employee Updated');
  //     dispatch(updateEmployeeReset());
  //     dispatch(fetchAllEmployees());
  //   }
  //   if (errorEmployee){        //error for deleting
  //     errorMsg(errorEmployee);
  //     dispatch(deleteEmployeeReset());
  //     dispatch(fetchAllEmployees());
  //   }


  // },[isDeleted, isUpdated, errorEmployee])


  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator size="large" style={styles.loadingIndicator} /> : <EmployeeList employees={employees} />}
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
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonSize / 2,
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

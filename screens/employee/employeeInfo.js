import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';
import { getEmployeeDetails } from '../../store/reducers/employee/employeeDetailsSlice';

const EmployeeInfo = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { employee, loading } = useSelector(state => state.employeeDetails);
  const { employeeId } = route.params;

  useEffect(() => {
    dispatch(getEmployeeDetails(employeeId));
  }, [dispatch, employeeId]);

  if (loading) {
    return (
      <ActivityIndicator size="large" style={styles.loadingIndicator}/>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.coverContainer}/>
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: employee?.avatar?.url }}
          style={styles.avatar}
        />
        <Text style={[styles.name, styles.textWithShadow]}>{employee?.fname} {employee?.lname}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoValue}>{employee?.email}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Religion</Text>
          <Text style={styles.infoValue}>{employee?.religion}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    padding: 20,    
  },
  coverContainer: {
    height: 180,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#91b7b1',

  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color:'black'
  },
  content: {
    marginTop: 20,
  },
  infoContainer: {
    marginTop: 20,
  },
  infoLabel: {
    fontWeight: 'bold',
  },
  infoValue: {
    marginTop: 5,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default EmployeeInfo;
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ScrollView, Image, View, Alert, TextInput, TouchableOpacity, Dimensions, Text } from 'react-native';
import { deleteEmployee } from '../../store/reducers/employee/employeeSlice';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('screen'); 

const EmployeeList = ({ employees }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const confirmDelete = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this employee?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => dispatch(deleteEmployee(id)),
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const navigateEmployee = (id) => {
    navigation.navigate('EmployeeInfo', { employeeId: id });
  }

  const handleEdit = (id) => {
    navigation.navigate('EditEmployee', { employeeId: id });
  };


  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        style={styles.searchBar}
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />
      <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps="always">
        {employees
          .filter((employee) => {
            const fullName = `${employee.fname} ${employee.lname}`;
            return (
              fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
              employee.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
              employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
              employee.religion.toLowerCase().includes(searchQuery.toLowerCase())
            );
          })
          .map((employee, index) => (
            <View  key={index} style={styles.container}>

              <TouchableOpacity  style={styles.card} onPress={() => navigateEmployee(employee._id)}>
                <Image style={styles.image} source={{ uri: employee?.avatar?.url }} />
                <View style={styles.cardContent}>
                  <Text style={styles.name}>{employee?.fname} {employee?.lname}</Text>
                  <Text style={styles.count}>{employee?.email}</Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[styles.followButton, { backgroundColor: '#2196F3', width: width * 0.25}]}
                      onPress={() => handleEdit(employee._id)}>
                      <Text style={styles.followButtonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.followButton, { backgroundColor: '#ff2752', width: width * 0.25 }]}
                      onPress={() => confirmDelete(employee._id)}>
                      <Text style={styles.followButtonText}>Delete</Text>

                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = {
  scrollView: {
    padding: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  searchBar: {
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  container: {
    flex: 1,
    marginTop: 10,
  },
  contentList: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
    flex: 1,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#ebf0f7',
  },

  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    borderRadius: 30,
  },

  name: {
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  count: {
    fontSize: 14,
    flex: 1,
    alignSelf: 'center',
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 20
  },
  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#dcdcdc',
    marginLeft: width * 0.015,
    marginRight: width * 0.015
  },
  followButtonText: {
    color: 'white',
    fontSize: 12,
  },
};

export default EmployeeList;
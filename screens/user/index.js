import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Block } from 'galio-framework';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserList from './userList';
import { fetchAllUsers } from '../../store/reducers/auth/allUsersSlice';
import { deleteUserReset } from '../../store/reducers/auth/userSlice';




const UserScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { loading, error, users } = useSelector(state => state.allUsers);
  const { isDeleted } = useSelector(state => state.user)


  const successMsg = (message) => {
    Toast.show({
      text1: 'Deleted', 
      text2: `${message}`, 
      type: 'success', 
      position: 'bottom', 
      visibilityTime: 4000,
      autoHide: true, 
      topOffset: 30, 
      bottomOffset: 40,
      customStyles: {
        title: {
          fontSize: 30, 
          fontWeight: 'bold', 
        },
        message: {
          fontSize: 24,
          fontWeight: 'bold', 
        },
      },
    });
  };
  useEffect(() => {

    dispatch(fetchAllUsers());
  
    if (isDeleted) {
      successMsg('User Removed')
      dispatch(deleteUserReset())
    }
  }, [dispatch, error, isDeleted])




  return (
    <View style={styles.container}>
      <UserList users={users} />
      <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate('AddUser')}>
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
    color: 'black', // Text color
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
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#16aec1', // Adjust the color as needed
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingButtonText: {
    fontSize: 30,
    color: 'white',
  },
});

export default UserScreen;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text} from 'galio-framework';
import { useNavigation } from '@react-navigation/native';
import UserList from './userList';
import { fetchAllUsers,clearErrors } from '../../store/reducers/user/allUsersSlice';
import { deleteUserReset, updateUserReset } from '../../store/reducers/user/userSlice';
import { successMsg, errorMsg } from '../../shared/toast';


const UserScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { error, users } = useSelector(state => state.allUsers);
  const { success } = useSelector(state => state.newUser);
  const { isDeleted, isUpdated, error: errorUser } = useSelector(state => state.user)
  const [ firstLoading, setFirstLoading] = useState(true);



  
  useEffect(() => {
    if (success) {
      dispatch(fetchAllUsers());
    } else {
      dispatch(fetchAllUsers())
      .then(() => {
        setFirstLoading(false);
      });
    }
    if (error) {
      errorMsg(error)
      dispatch(clearErrors())
    }
    

  }, [dispatch, error, success]);

  useEffect(() => {
    if (isDeleted) {
      successMsg('Deleted','User Removed');
      dispatch(deleteUserReset());
      dispatch(fetchAllUsers());
    }

    if (isUpdated) {
      successMsg('Updated','User Updated');
      dispatch(updateUserReset());
      dispatch(fetchAllUsers());
    }
    if (errorUser){      
      errorMsg(errorUser);
      dispatch(deleteUserReset());
      dispatch(fetchAllUsers());
    }


  },[isDeleted, isUpdated, errorUser])





  return (
    <View style={styles.container}>
      {firstLoading ? <ActivityIndicator size="large" style={styles.loadingIndicator} /> : <UserList users={users} />}
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

export default UserScreen;

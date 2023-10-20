import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView, Image, View, Alert, TextInput, TouchableOpacity, Dimensions } from 'react-native'; // Import Dimensions
import { Card, Block, Text, Button } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';
import { deleteUser } from '../../store/reducers/user/userSlice';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('screen'); // Get screen width

const UserList = ({ users }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const confirmDelete = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this user?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => dispatch(deleteUser(id)),
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

 const navigateUser = (id) =>{
  navigation.navigate('UserInfo', { userId: id });
  }

  const handleEdit = (id) => {
    
    // console.log(`Edit user with ID ${id}`);
    navigation.navigate('EditUser', { userId: id });
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
        {users
          .filter((user) => {
            const fullName = `${user.fname} ${user.lname}`;
            return (
              fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
              user.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
              user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
              user.religion.toLowerCase().includes(searchQuery.toLowerCase())
            );
          })
          .map((user, index) => (
            <TouchableOpacity key={index} style={styles.touchableUsers} onPress={() => navigateUser(user._id)}>
            <Card key={index} flex shadow style={styles.card}>
              <Block card style={styles.block}>
                <View style={styles.leftContainer}>
                  <Image
                    source={{ uri: user.avatar.url }}
                    style={styles.avatar}
                  />
                </View>
                <View style={styles.rightContainer}>
                  <Text h4>{user.fname} {user.lname}</Text>
                  <Text p>{user.role}</Text>
                 
                  
                </View>
              </Block>
              <Block bottom right>
                <View style={styles.buttonGroup}>
                  <Button
                    round
                    color="info"
                    style={styles.editButton} // Set button width based on screen width
                    onPress={() => handleEdit(user._id)}
                  >
                    <Icon name="edit" color="white" size={width * 0.07} />
                  </Button>
                  <Button
                    round
                    color="error"
                    style={styles.deleteButton} 
                    onPress={() => confirmDelete(user._id)}
                  >
                    <Icon name="trash-o" color="white" size={width * 0.07} />
                  </Button>
                </View>
              </Block>
            </Card>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 10,
  },
  card: {
    marginBottom: 10,
    borderRadius: 10,
  },
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 0,
  },
  leftContainer: {
    marginRight: 10,
  },
  rightContainer: {
    flex: 1,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    marginRight: 10,
    width : width * 0.15
  },
  deleteButton: {
    backgroundColor: '#ff2752',
    color: 'white',
    width : width * 0.15,
    marginRight: 10,
  },
  searchBar: {
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  touchableUsers: {
    flex: 1
  }
};

export default UserList;

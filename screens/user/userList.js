import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FlatList, Image, View, Alert, TextInput, TouchableOpacity, Dimensions, Text } from 'react-native';
import { deleteUser } from '../../store/reducers/user/userSlice';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('screen');

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

  const navigateUser = (id) => {
    navigation.navigate('UserInfo', { userId: id });
  }

  const handleEdit = (id) => {
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
      <FlatList
        data={users
          .filter((user) => {
           
            return (
              user?.fname?.toLowerCase().includes(searchQuery.toLowerCase())  ||
              user?.lname?.toLowerCase().includes(searchQuery.toLowerCase())  ||
              user?.email?.toLowerCase().includes(searchQuery.toLowerCase())  ||
              user?.course?.toLowerCase().includes(searchQuery.toLowerCase())  ||
              user?.religion?.toLowerCase().includes(searchQuery.toLowerCase())
            );
          })}
        contentContainerStyle={styles.flatList}
        keyExtractor={(user) => user._id.toString()}
        renderItem={({ item: user }) => (
          <View style={styles.container}>
            <TouchableOpacity style={styles.card} onPress={() => navigateUser(user._id)}>
              <Image style={styles.image} source={{ uri: user?.avatar?.url }} />
              <View style={styles.cardContent}>
                <Text style={styles.name}>{user?.fname} {user?.lname}</Text>
                <Text style={styles.count}>{user?.email}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.followButton, { backgroundColor: '#2196F3', width: width * 0.25 }]}
                    onPress={() => handleEdit(user._id)}>
                    <Text style={styles.followButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.followButton, { backgroundColor: '#ff2752', width: width * 0.25 }]}
                    onPress={() => confirmDelete(user._id)}>
                    <Text style={styles.followButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );

};

const styles = {
  flatList: {
    padding: 10,
    paddingBottom: 70,   
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

export default UserList;

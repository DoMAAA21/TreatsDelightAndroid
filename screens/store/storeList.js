import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ScrollView, Image, View, Alert, TextInput, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { deleteStore } from '../../store/reducers/store/storeSlice';
const { width } = Dimensions.get('screen');  

const StoreList = ({ stores }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const confirmDelete = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this store?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => dispatch(deleteStore(id)),
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

 const navigateStore = (id) =>{
  navigation.navigate('StoreInfo', { storeId: id });
  }

  const handleEdit = (id) => {
    navigation.navigate('EditStore', { storeId: id });
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
        {stores
          .filter((store) => {
            return (
              store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              store.slogan.toLowerCase().includes(searchQuery.toLowerCase()) 
            );
          })
          .map((store, index) => (
            <View  key={index} style={styles.container}>

            <TouchableOpacity  style={styles.card} onPress={() => navigateStore(store._id)}>
              <Image style={styles.image} source={{ uri: store?.logo?.url }} />
              <View style={styles.cardContent}>
                <Text style={styles.name}>{store?.name}</Text>
                <Text style={styles.count}>{store?.slogan}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.followButton, { backgroundColor: '#2196F3', width: width * 0.25}]}
                    onPress={() => handleEdit(store._id)}>
                    <Text style={styles.followButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.followButton, { backgroundColor: '#ff2752', width: width * 0.25 }]}
                    onPress={() => confirmDelete(store._id)}>
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
    borderRadius: 30,
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

export default StoreList;

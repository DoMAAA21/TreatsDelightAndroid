import React, { useState } from 'react';
import { FlatList, Image, View, Alert, TextInput, TouchableOpacity, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('screen');

const TransactionList = ({ transactions }) => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const navigateTransaction = (id) => {
    navigation.navigate('TransactionInfo', { transactionId: id });
  }

  const handleEdit = (id) => {
    navigation.navigate('EditTransaction', { transactionId: id });
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
        data={transactions
          .filter((transaction) => {
            return (
              transaction?.orderItems.id?.toLowerCase().includes(searchQuery.toLowerCase())
            );
          })}
        keyExtractor={(transaction) => transaction.orderItems.id.toString()}
        renderItem={({ item: transaction }) => (
          <View key={transaction?.orderItems.id} style={styles.container}>
            <TouchableOpacity style={styles.card} onPress={() => navigateTransaction(transaction.id)}>
              <View style={styles.cardContent}>
                <Text style={styles.name}>{transaction?.orderItems.name} x {transaction?.orderItems.quantity}</Text>
                <Text style={styles.count}>{transaction?.user?.name || 'Guest'}</Text>
                <Text style={styles.count}>{transaction?.orderItems.status}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.followButton, { backgroundColor: '#2196F3', width: width * 0.25 }]}
                    onPress={() => handleEdit(transaction._id)}>
                    <Text style={styles.followButtonText}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.flatList}
      />
    </View>
  );
};

const styles = {
  flatList: {
    padding: 10,
    paddingBottom: 70,
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
    marginRight: 20,
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
    marginRight: width * 0.015,
  },
  followButtonText: {
    color: 'white',
    fontSize: 12,
  },
};

export default TransactionList;

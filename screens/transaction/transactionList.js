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
          <View key={transaction?.orderItems.id} style={styles.itemContainer}>
          <TouchableOpacity style={styles.card} onPress={() => navigateTransaction(transaction.id)}>
            <View style={styles.cardContent}>
              <View style={styles.rowContainer}>
                <Text style={styles.name}>{transaction?.orderItems.name} x {transaction?.orderItems.quantity}</Text>
                <Text style={styles.count}>{transaction?.user?.name || 'Guest'}</Text>
                <Text style={styles.count}>{transaction?.orderItems.status}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.followButton, { backgroundColor: '#2196F3' }]}
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
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 16,
    margin: 5,
    width: '100%',
    backgroundColor: 'white'
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    
  },
  count: {
    flex :1,
    fontSize: 14,
    marginRight: 10,
  },
  buttonContainer: {},
  followButton: {
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  followButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
};

export default TransactionList;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FlatList, View, TextInput, TouchableOpacity, Text, Modal, RefreshControl } from 'react-native';
import { updateTransaction } from '../../store/reducers/transaction/transactionSlice';
const statuses = ['Pending', 'Paid', 'Completed', 'Incomplete'];
const getStatusStyle = (status) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return { color: 'orange' };
    case 'paid':
      return { color: 'green' };
    case 'completed':
      return { color: '#4299e1' };
    case 'incomplete':
      return { color: 'red' };
    default:
      return {};
  }
};


const TransactionList = ({ transactions, refreshing, handleRefresh }) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [selectedId, setSelectedId] = useState('');

  const handleEdit = (id) => {
    setSelectedId(id);
    setIsModalVisible(true);
  };


  const handleStatusUpdate = () => {
    if (!selectedId || !newStatus) {
      return;
    }
    dispatch(updateTransaction({ id: selectedId, status: newStatus }));
    setIsModalVisible(false);
    setNewStatus('');
    setSelectedId('');
    return
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
        refreshControl={ // Add RefreshControl to FlatList
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        renderItem={({ item: transaction }) => (
          <View key={transaction?.orderItems.id} style={styles.itemContainer}>
            <TouchableOpacity style={styles.card} onPress={() => handleEdit(transaction.orderItems.id)}>
              <View style={styles.cardContent}>
                <View style={styles.rowContainer}>
                  <Text style={styles.name}>{transaction?.orderItems.name} x {transaction?.orderItems.quantity}</Text>
                  <Text style={styles.count}>{transaction?.user?.name || 'Guest'}</Text>
                  <Text style={[styles.count, getStatusStyle(transaction?.orderItems.status), { fontWeight: '900' },]}>
                    {transaction?.orderItems.status}
                  </Text>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.followButton, { backgroundColor: '#2196F3' }]}
                    onPress={() => handleEdit(transaction.orderItems.id)}>
                    <Text style={styles.followButtonText}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.flatList}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Status</Text>
            {statuses.map((status, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.dropdownItem, newStatus === status && styles.selectedDropdownItem]}
                onPress={() => setNewStatus(status)}
              >
                <Text>{status}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.updateButton} onPress={handleStatusUpdate}>
              <Text style={styles.updateButtonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    flex: 1,
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
  flatList: {
    padding: 10,
    paddingBottom: 70,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dropdownItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedDropdownItem: {
    backgroundColor: '#e2e2e2',
  },
  updateButton: {
    backgroundColor: '#4299e1',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  updateButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
};

export default TransactionList;

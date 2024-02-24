import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FlatList, View, Alert, TextInput, Text, TouchableOpacity, Dimensions } from 'react-native';
import { deleteWater } from '../../store/reducers/water/waterSlice';

const { width } = Dimensions.get('screen');

const TransactionList = ({ waters }) => {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');


    const confirmDelete = (id) => {
        Alert.alert(
          'Confirm Delete',
          'Are you sure you want to delete this water?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              onPress: () => dispatch(deleteWater(id)),
              style: 'destructive',
            },
          ],
          { cancelable: false }
        );
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
                data={waters.filter((water) =>
                    water?.amount?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
                    water?.type?.toLowerCase().includes(searchQuery.toLowerCase())
                )
                }


                contentContainerStyle={styles.flatList}
                keyExtractor={(water) => water._id.toString()}
                renderItem={({ item: water }) => (
                    <View key={water._id} style={styles.container}>
                        <View style={styles.card} >
                            <View style={styles.cardContent}>
                                <Text style={[styles.name, water.total < 0 ? { color: 'red' } : { color: 'green' }]}>
                                    {water.total >= 0 ? 'Paid ' : 'To Pay '}{water?.total < 0 && "-"}
                                    ₱{Math.abs(water?.total)}
                                </Text>
                                <Text style={styles.count}>Issued At: {new Date(water.issuedAt).toISOString().slice(0, 10)}</Text>
                                <Text style={styles.count}>Paid At: {water?.paidAt ? new Date(water.paidAt).toISOString().slice(0, 10) : 'Not paid yet'}</Text>
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={[styles.followButton, { backgroundColor: '#ff2752' }]}
                                    onPress={() => confirmDelete(water._id)}>
                                    <Text style={styles.followButtonText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
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
        alignItems: 'center'
    },
    name: {
        fontSize: 16,
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
        width: 80,
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

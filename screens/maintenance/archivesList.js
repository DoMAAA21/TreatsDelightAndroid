import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FlatList, View, Alert, TextInput, Text, TouchableOpacity, Dimensions } from 'react-native';
import { restoreMaintenance } from '../../store/reducers/maintenance/maintenanceSlice';

const { width } = Dimensions.get('screen');

const ArchivesList = ({ maintenances }) => {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');

    const confirmDelete = (id) => {
        Alert.alert(
          'Confirm Delete',
          'Are you sure you want to restore this maintenance?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Restore',
              onPress: () => dispatch(restoreMaintenance(id)),
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
                data={maintenances.filter((maintenance) =>
                    maintenance?.amount?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
                    maintenance?.type?.toLowerCase().includes(searchQuery.toLowerCase())
                )
                }


                contentContainerStyle={styles.flatList}
                keyExtractor={(maintenance) => maintenance._id.toString()}
                renderItem={({ item: maintenance }) => (
                    <View key={maintenance._id} style={styles.container}>
                        <View style={styles.card} >
                            <View style={styles.cardContent}>
                                <Text style={[styles.name, maintenance.amount < 0 ? { color: 'red' } : { color: 'green' }]}>
                                    {maintenance.amount >= 0 ? 'Paid ' : 'To Pay '}{maintenance?.amount < 0 && "-"}
                                    ₱{Math.abs(maintenance?.amount)}
                                </Text>
                                <Text style={styles.count}>Issued At: {new Date(maintenance.issuedAt).toISOString().slice(0, 10)}</Text>
                                <Text style={styles.count}>Paid At: {maintenance?.paidAt ? new Date(maintenance.paidAt).toISOString().slice(0, 10) : 'Not paid yet'}</Text>
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={[styles.followButton, { backgroundColor: '#2196F3' }]}
                                    onPress={() => confirmDelete(maintenance._id)}>
                                    <Text style={styles.followButtonText}>Restore</Text>
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

export default ArchivesList;

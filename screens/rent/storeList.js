import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FlatList, Image, View, Alert, TextInput, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const StoreList = ({ stores }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');


    const navigateRent = (id) => {
        navigation.navigate('RentTransactions', { id });
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
                data={stores.filter((store) =>
                    store?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    store?.slogan?.toLowerCase().includes(searchQuery.toLowerCase())
                )}
                contentContainerStyle={styles.flatList}
                keyExtractor={(store) => store._id.toString()}
                renderItem={({ item: store }) => (
                    <View key={store._id} style={styles.container}>
                        <TouchableOpacity style={styles.card} onPress={() => navigateRent(store._id)}>
                            <Image style={styles.image} source={{ uri: store?.logo?.url }} />
                            <View style={styles.cardContent}>
                                <Text style={styles.name}>{store?.name}</Text>
                                <Text style={[styles.name, store?.rent < 0 ? { color: 'red' } : { color: 'green' }]}>
                                    {store?.rent < 0 ? '-₱' : '₱'}
                                    {Math.abs(store?.rent || 0)}
                                </Text>

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

};

export default StoreList;

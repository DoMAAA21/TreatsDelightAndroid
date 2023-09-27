import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView, Image, View, Alert, TextInput } from 'react-native';
import { Card, Block, Text, Button } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';
import { deleteUser } from '../../store/reducers/auth/userSlice';


const UserList = ({ users }) => {
    const dispatch = useDispatch();
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

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search"
                style={styles.searchBar}
                onChangeText={(text) => setSearchQuery(text)}
                value={searchQuery}
            />
            <ScrollView contentContainerStyle={styles.scrollView}>
                {users
                    .filter((user) => {
                        const fullName = `${user.fname} ${user.lname}`;
                        return (
                            fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            user.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            user.religion.toLowerCase().includes(searchQuery.toLowerCase())
                          );
                      
                        
                        ;
                    })
                    .map((user, index) => (
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
                                    <Text p>{user.course}</Text>
                                    <Text p>{user.religion}</Text>
                                    <Text p>{user.email}</Text>
                                </View>
                            </Block>
                            <Block right>
                                <Button
                                    round
                                    color="error"
                                    style={styles.deleteButton}
                                    onPress={() => confirmDelete(user._id)}
                                >
                                    <Icon name="trash-o" size={28} />
                                </Button>
                            </Block>
                        </Card>
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
    deleteButton: {
        backgroundColor: 'red',
        color: 'white',
        width: 50,
        height: 50,
    },
    searchBar: {
        padding: 10,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
};

export default UserList;

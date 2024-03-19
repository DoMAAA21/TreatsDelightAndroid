import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fetchAllNotifications } from '../../store/reducers/notification/allNotificationSlice';

const NotificationsScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { notifications, currentPage } = useSelector(state => state.allNotification);

    useEffect(() => {
        dispatch(fetchAllNotifications({ page: 1 }));
    }, [dispatch]);

    const handleNotificationClick = (item) => {
        navigation.navigate(item.mobileLink.stack, { screen: item.mobileLink.screen});
    };

    
    const handleLoadMore = () => {
        console.log('asdas');
        dispatch(fetchAllNotifications({ page: currentPage + 1 }));
    };



    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleNotificationClick(item)}>
            <View style={[styles.notificationItem, item.read ? styles.readItem : styles.unreadItem]}>
                <Image source={{ uri: item.image }} style={styles.notificationImage} />
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.notificationText}>{item.message}</Text>
            </View>
        </TouchableOpacity>

    );

    return (
        <View style={styles.container}>
            {notifications.length === 0 ? (
                <Text>No notifications</Text>
            ) : (
                    <FlatList
                        data={notifications}
                        renderItem={renderItem}
                        keyExtractor={(item) => item._id.toString()}
                        showsVerticalScrollIndicator={false}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.8}
                        ListFooterComponent={<ActivityIndicator/>}
                    />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 2,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    notificationImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    notificationText: {
        fontSize: 16,
        paddingHorizontal: 20,
    },
    readItem: {
        backgroundColor: 'white', // Define the background color for read items
    },
    unreadItem: {
        backgroundColor: '#cfd8e6', // Define the background color for unread items
    },
});

export default NotificationsScreen;

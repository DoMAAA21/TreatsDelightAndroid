import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { fetchAllNotifications } from '../../store/reducers/notification/allNotificationSlice';
import { updateNotification } from '../../store/reducers/notification/notificationSlice';
import WomanThinking from '../../assets/svg/WomanThinking';

const NotificationsScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { notifications, currentPage, hasMore, loading } = useSelector(state => state.allNotification);
    const { success } = useSelector(state => state.notification);
    const [firstLoading, setFirstLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {

            dispatch(fetchAllNotifications({ page: 1 })).then(() => {
                setFirstLoading(false);
            });

            if (success) {
                dispatch(fetchAllNotifications({ page: 1 }));
            }
        }, [dispatch, success]));

    const handleNotificationClick = (item) => {
        dispatch(updateNotification(item._id));
        if (item.mobileLink?.stack && item.mobileLink?.screen) {
            navigation.navigate(item.mobileLink.stack, { screen: item.mobileLink.screen });

            return
        }
    };


    const handleLoadMore = () => {
        if (hasMore) {
            dispatch(fetchAllNotifications({ page: currentPage + 1 }));
        }
        return;
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity key={item._id} onPress={() => handleNotificationClick(item)}>
            <View style={[styles.notificationItem, item.read ? styles.readItem : styles.unreadItem]}>
                <Image source={{ uri: item.image }} style={styles.notificationImage} />
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.notificationText}>{item.message}</Text>
            </View>
        </TouchableOpacity>

    );

    if (firstLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {notifications.length === 0 && !loading ? (
                <View style={styles.noNotifContainer}>
                    <WomanThinking style={styles.womanThinking}/>
                    <Text style={styles.noNotifText}>No notifications</Text>
                </View>
            ) : (
                <FlatList
                    data={notifications}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.8}
                    ListFooterComponent={
                        hasMore ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color="#000" />
                            </View>
                        ) :
                            <>
                                <View style={styles.loadingContainer}>
                                    <Text>No more notifications to load.</Text>
                                </View>
                            </>

                    }

                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    notificationImage: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 25,
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
    noNotifContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', // Background color
    },
    noNotifText: {
        fontSize: 18,
        marginTop: 20,
        color: '#555',
    },
    womanThinking: {
        width: 400,
        height: 400,
    },
});

export default NotificationsScreen;

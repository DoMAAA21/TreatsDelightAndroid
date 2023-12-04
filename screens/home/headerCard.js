import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Switch } from 'react-native';
import { updateStoreStatus } from '../../store/reducers/store/storeSlice';
import { useDispatch } from 'react-redux';
import { topSuccessMsg } from '../../shared/toast';

const HeaderCard = ({ user, date, store }) => {
    const dispatch = useDispatch();
    const [isEnabled, setIsEnabled] = useState(store.active);
    const toggleSwitch = async () => {
        dispatch(updateStoreStatus(store?._id)).then(() => {
                setIsEnabled(!isEnabled);
        });
    };

    useEffect(() => {
        if (isEnabled && (user.role === 'Employee' || user.role === 'Owner')) {
            topSuccessMsg('Store is Open')
        } else if (!isEnabled && (user.role === 'Employee' || user.role === 'Owner')) {
            topSuccessMsg('Store is Closed')
        }

    }, [setIsEnabled])


    if (user.role === 'Employee' || user.role === 'Owner') {
        return (
            <>
                <View style={[styles.card, { backgroundColor: isEnabled ? '#86CD82' : 'grey' }]}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Howdy! {user?.store?.name} {user?.role === "Employee" ? 'Store' : null}</Text>
                        <Text style={styles.headerSubtitle}>{date}</Text>
                    </View>

                    <View style={styles.body}>
                        <Image source={{ uri: user?.avatar?.url }} style={styles.avatar} />
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>{user?.fname} {user?.lname}</Text>
                            <Text style={styles.userRole}>{user?.role}</Text>
                        </View>
                    </View>

                </View>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </>
        )
    }
    else {
        return (
            <>
                <View style={styles.card}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Howdy!</Text>
                        <Text style={styles.headerSubtitle}>{date}</Text>
                    </View>

                    <View style={styles.body}>
                        <Image source={{ uri: user?.avatar?.url }} style={styles.avatar} />
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>{user?.fname} {user?.lname}</Text>
                            <Text style={styles.userRole}>{user?.role}</Text>
                        </View>
                    </View>

                </View>
                <View style={styles.switchSpace} />
            </>
        )
    }

}
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ff7f50',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        padding: 16,
        width: '100%',
        height: 150,
        margin: 16

    },
    header: {
        marginBottom: 8,
    },
    headerTitle: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#ffffff',
    },
    body: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 8,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    userRole: {
        fontSize: 12,
        color: '#ffffff',
    },
    switchSpace: {
        height: 48,
    }
})

export default HeaderCard
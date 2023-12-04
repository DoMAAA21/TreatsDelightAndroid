import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { topSuccessMsg } from '../../shared/toast';

const ProfileInfo = () => {
  const navigation = useNavigation();
  const { error, isUpdated, loading } = useSelector(state => state.user);
  const [user, setUser] = useState('');

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await AsyncStorage.getItem('user');

        setUser(JSON.parse(user));

      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
    fetchUser();

    if(isUpdated){
      topSuccessMsg('Profile Updated');
    }
  }, [setUser, isUpdated]);


  return (
    <View style={styles.container}>
      <View style={styles.coverContainer} />
      <ScrollView>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: user?.avatar?.url }}
            style={styles.avatar}
          />
          <Text style={[styles.name, styles.textWithShadow]}>{user?.fname} {user?.lname}</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{user?.email}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Course:</Text>
            <Text style={styles.infoValue}>{user?.course}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Religion</Text>
            <Text style={styles.infoValue}>{user?.religion}</Text>
          </View>

        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.editProfileButton}
        onPress={() => navigation.navigate('EditProfile', { userId: user._id })}
      >
        <Text style={styles.editProfileText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    padding: 20,
  },
  coverContainer: {
    height: 180,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#91b7b1',

  },
  avatarContainer: {
    alignItems: 'left',
    marginTop: 60,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'black'
  },
  content: {
    marginTop: 20,
  },
  infoContainer: {
    marginTop: 20,
  },
  infoLabel: {
    fontWeight: 'bold',
  },
  infoValue: {
    marginTop: 5,
  },
  editProfileButton: {
    backgroundColor: '#2196F3',
    padding: 18,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  editProfileText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileInfo;
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileInfo = () => {
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
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.coverContainer}/>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  coverContainer: {
    height: 100,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#91b7b1'
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color:'black'
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
});

export default ProfileInfo;
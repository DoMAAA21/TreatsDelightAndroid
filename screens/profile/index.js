import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { logout } from '../../store/reducers/auth/authenticationSlice';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, Block, Icon } from 'galio-framework';
import { FontAwesome } from 'react-native-vector-icons';

const screenHeight = Dimensions.get('window').height;

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [user, setUser] = useState('');

  async function fetchUser() {
    try {
      const user = await AsyncStorage.getItem('user');

      setUser(JSON.parse(user));

    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }
  useEffect(() => {
    fetchUser();
  }, [dispatch]);
  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  const confirmLogout = () => {
    setLogoutModalVisible(false);
    dispatch(logout()); // App navigator is the one who handles isAuthenticated
  };

  const logoutModal = (
    <Modal
      isVisible={isLogoutModalVisible}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
    >
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Logout</Text>
        <Text style={styles.modalText}>Are you sure you want to log out?</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#f93a5f' }]}
            onPress={confirmLogout}>
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#5b92d6' }]}
            onPress={() => setLogoutModalVisible(false)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user?.avatar?.url }}
        style={styles.avatar}
      />
      <Card
        style={styles.card}
      >
        <Block row style={styles.cardHeader}>
          <Block right>
            <Text style={styles.userName}>{user.fname} {user.lname}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </Block>
        </Block>
        <Block row style={styles.menuItemContent}>
        <TouchableOpacity
          style={styles.menuItem}
        >
          <FontAwesome name="user" height={35} size={35} width= {35} color="#000" />
          <Text style={styles.menuText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
        >
          <FontAwesome name="cog" height={35} size={35} width= {35} color="#000" />
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
        >
          <FontAwesome name="info" height={35} size={35} width= {35} color="#000" />
          <Text style={styles.menuText}>Information</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleLogout}
        >
          <FontAwesome name="sign-out" height={35} size={35} width= {35} color="#000" />
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
        </Block>
      </Card>
      {logoutModal}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 75,
    position: 'absolute',
    top: 75,
    left: 18,
    width: 150,
    height: 150,
    zIndex: 1,
  },
  card: {
    width: '90%',
    marginTop: screenHeight * 0.15,
    padding: 20,
    borderRadius: 10,
    zIndex: 0,
  },
  cardHeader: {
    padding: 10,
    paddingLeft: 100,
    borderBottomWidth: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 16,
  },
  menuCard: {
    width: '90%',
    margin: 10,
    borderRadius: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    
 
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5, // Add an underline
    borderBottomColor: '#000', // Underline color
    height: screenHeight * 0.08,
  },
  menuItemContent: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  menuText: {
    fontSize: 20,
    marginLeft: 10,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    marginBottom: 5,
    fontSize: 22,
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 20,
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ProfileScreen;

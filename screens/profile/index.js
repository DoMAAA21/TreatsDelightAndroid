import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/reducers/auth/authenticationSlice';
import Modal from 'react-native-modal';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  const confirmLogout = () => {
    setLogoutModalVisible(false);
    dispatch(logout());
    
  };

  const logoutModal = (
    <Modal
      isVisible={isLogoutModalVisible}
      animationIn="slideInLeft" // Slide in from the right
      animationOut="slideOutLeft" // Slide out to the right
    >
      <View style={styles.modalContainer}>
       <Text style={styles.modalTitle}>Logout</Text>
        <Text style={styles.modalText}>Are you sure you want to log out?</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#f93a5f' }]}
            onPress={confirmLogout}
          >
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#5b92d6' }]}
            onPress={()=>setLogoutModalVisible(false) }
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <Text>Welcome to Profile Screen</Text>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      {logoutModal} 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontWeight: 'bold'
    
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
  logoutButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default ProfileScreen;

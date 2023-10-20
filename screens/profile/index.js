import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux'; // Import useDispatch to dispatch the logout action
import { logout } from '../../store/reducers/auth/authenticationSlice';

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Dispatch the logout action here
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to Profile Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;

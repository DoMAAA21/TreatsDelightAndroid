import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome to Home Screen</Text>
      <Text>Welcome to Home Screen</Text>
      <Text>Welcome to Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  

export default HomeScreen;
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icon
import { Block, Text, GalioProvider } from 'galio-framework';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();
    return (
      <GalioProvider>
        <View style={styles.container}>
          
          <View style={styles.grid}>
            <TouchableOpacity
              key='User'
              style={styles.box}
              onPress={() => navigation.navigate('User')}
            >
              <Block middle center style={styles.content}>
                <FontAwesomeIcon
                  name='user' 
                  size={40} 
                  color='#405b43' 
                />
                <Text size={16}>User</Text>
              </Block>
            </TouchableOpacity>

            <TouchableOpacity
              key='Dashboard'
              style={styles.box}
              onPress={() => console.log(`Pressed Box `)}
            >
              <Block middle center style={styles.content}>
                <FontAwesomeIcon
                  name='rocket' 
                  size={40} 
                  color='#405b43' 
                />
                <Text size={16}>Dashboard</Text>
              </Block>
            </TouchableOpacity>
             
           
          </View>
        </View>
      </GalioProvider>
    );
  };

  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
    },
    box: {
      margin: 10,
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 10,
      overflow: 'hidden',
      width: 100,
      height: 100,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      
    },
  });
  
  export default HomeScreen;
  
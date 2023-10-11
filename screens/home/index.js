import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Block, Text, GalioProvider } from 'galio-framework';
import { useNavigation } from '@react-navigation/native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const HomeScreen = () => {
    const navigation = useNavigation();
    return (
      <GalioProvider>
        <View style={styles.container}>
          
          <View style={styles.grid}>
            <TouchableOpacity
              key='User'
              style={styles.box}
              onPress={() => navigation.navigate('Users')}
            >
              <Block middle center style={styles.content}>
                <FontAwesomeIcon
                  name='user' 
                  size={40} 
                  color='#405b43' 
                />
                <Text size={16}>Users</Text>
              </Block>
            </TouchableOpacity>

            <TouchableOpacity
              key='Stores'
              style={styles.box}
              onPress={() => navigation.navigate('Stores')}
            >
              <Block middle center style={styles.content}>
                <MaterialCommunityIcons
                  name='store' 
                  size={40} 
                  color='#405b43' 
                />
                <Text size={16}>Stores</Text>
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
      width: screenWidth * 0.25,
      height: screenHeight * 0.12,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      
    },
  });
  
  export default HomeScreen;
  
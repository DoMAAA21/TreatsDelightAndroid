import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import { useDispatch } from 'react-redux';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../../store/reducers/auth/authenticationSlice';
import { FontAwesome } from 'react-native-vector-icons';

export default ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
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
  }, []);
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
        <View style={styles.modalbuttonContainer}>
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
    <ScrollView style={styles.container}>
      <View style={styles.header}></View>
      <Image
        style={styles.avatar}
        source={{ uri: user?.avatar?.url }}
      />

      <View style={styles.body}>

        <View style={styles.bodyContent}>
          <Text style={styles.name}>{user?.fname} {user?.lname}</Text>
          <Text style={styles.info}>{user?.email}</Text>
          
        <View style={styles.menuCard}>
          <View style={styles.menuContainer} >
            <TouchableOpacity style={styles.buttonContainer} onPress={()=> navigation.navigate('ProfileInfo')}>
              <FontAwesome name="user" height={35} size={35} width={35} color="#abafac" />
              <Text style={styles.menuText}>Profile</Text>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <FontAwesome name="angle-right" height={35} size={35} width={35} color="#37c5d9" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.menuContainer} >
            <TouchableOpacity style={styles.buttonContainer} >
              <FontAwesome name="cog" height={35} size={35} width={35} color="#abafac" />
              <Text style={styles.menuText}>Settings</Text>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <FontAwesome name="angle-right" height={35} size={35} width={35} color="#37c5d9" />
              </View>
            </TouchableOpacity>
          </View>


          <View style={styles.menuContainer} >
            <TouchableOpacity style={styles.buttonContainer} >
              <FontAwesome name="info-circle" height={35} size={35} width={35} color="#abafac" />
              <Text style={styles.menuText}>Information</Text>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <FontAwesome name="angle-right" height={35} size={35} width={35} color="#37c5d9" />
              </View>
            </TouchableOpacity>
          </View>



          <View style={styles.menuContainer} >
            <TouchableOpacity style={styles.buttonContainer} onPress={handleLogout}>
              <FontAwesome name="sign-out" height={35} size={35} width={35} color="#abafac" />
              <Text style={styles.menuText}>Logout</Text>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <FontAwesome name="angle-right" height={35} size={35} width={35} color="#37c5d9" />
              </View>
            </TouchableOpacity>
          </View>
          </View>

        </View>

      </View>
      {logoutModal}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#b4e373',
    height: 200,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
    zIndex: 9999
  },
  name: {
    fontSize: 22,
    color: 'black',
    fontWeight: '700',
  },
  info: {
    fontSize: 20,
    color: 'black',
    marginTop: 10,
    marginBottom: 50,
  },
  body: {
    marginTop: 10,
  },
  bodyContent: {
    paddingTop: 70,
    alignItems: 'center',
    padding: 0,
  },
  menuText:{
    fontSize: 16,
    fontWeight: '600'
  },

  menuContainer: {
    width: '100%',
    height: 75,
    marginStart: 10,
    marginEnd: 10,
    alignItems: 'center',
  },
  menuCard:{
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
  },
  buttonContainer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
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
  modalbuttonContainer: {
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
})

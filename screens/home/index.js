import React,{useState , useEffect} from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Block, Text } from 'galio-framework';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenHeight = Dimensions.get('window').height;
const HomeScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState('');
  const currentDate = new Date();
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);

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

    <>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Howdy! {user?.store?.name} {user.role === "Employee" ? 'Store' : null}</Text>
            <Text style={styles.headerSubtitle}>{formattedDate}</Text>
          </View>

          <View style={styles.body}>
            <Image source={{ uri: user?.avatar?.url}} style={styles.avatar} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user?.fname} {user?.lname}</Text>
              <Text style={styles.userRole}>{user?.role}</Text>
            </View>
          </View>
        </View>

        <View style={styles.grid}>
          <TouchableOpacity
            key='User'
            style={styles.box}
            onPress={() => navigation.navigate('Users')}
          >
            <Block middle center style={styles.content}>
              <FontAwesomeIcon
                name='users'
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

          <TouchableOpacity
            key='Products'
            style={styles.box}
            onPress={() => navigation.navigate('Products')}
          >
            <Block middle center style={styles.content}>
              <MaterialCommunityIcons
                name='food'
                size={40}
                color='#405b43'
              />
              <Text size={16}>Products</Text>
            </Block>
          </TouchableOpacity>

          <TouchableOpacity
            key='Employees'
            style={styles.box}
            onPress={() => navigation.navigate('Employees')}
          >
            <Block middle center style={styles.content}>
              <FontAwesome5Icon
                name='users-cog'
                size={40}
                color='#405b43'
              />
              <Text size={16}>Employees</Text>
            </Block>
          </TouchableOpacity>

          <TouchableOpacity
            key='ManageMenu'
            style={styles.box}
            onPress={() => navigation.navigate('ManageMenu')}
          >
            <Block middle center style={styles.content}>
              <MaterialIcons
                name='restaurant-menu'
                size={40}
                color='#405b43'
              />
              <Text size={16}>Menu Today</Text>
            </Block>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 16
  },
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
    width: screenHeight * 0.12,
    height: screenHeight * 0.12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
});

export default HomeScreen;

import React,{useState , useEffect} from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native';
import { Block, Text } from 'galio-framework';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserGroup from '../../assets/svg/UserGroup';
import Store from '../../assets/svg/Store';
import Burger from '../../assets/svg/Burger';
import UserSquare from '../../assets/svg/UserSquare';
import Dish from '../../assets/svg/Dish';
import Package from '../../assets/svg/Package';
import Chart from '../../assets/svg/Chart';


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
      <ScrollView >
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
              <UserGroup height={40} width={40}/>
              <Text size={16}>Users</Text>
            </Block>
            
          </TouchableOpacity>
        
          <TouchableOpacity
            key='Stores'
            style={styles.box}
            onPress={() => navigation.navigate('Stores')}
          >
            <Block middle center style={styles.content}>
              <Store height={40} width={40}/>
              <Text size={16}>Stores</Text>
            </Block>
          </TouchableOpacity>

          <TouchableOpacity
            key='Products'
            style={styles.box}
            onPress={() => navigation.navigate('Products')}
          >
            <Block middle center style={styles.content}>
            <Burger height={40} width={40}/>
              <Text size={16}>Products</Text>
            </Block>
          </TouchableOpacity>

          <TouchableOpacity
            key='Employees'
            style={styles.box}
            onPress={() => navigation.navigate('Employees')}
          >
            <Block middle center style={styles.content}>
            <UserSquare height={40} width={40}/>
              <Text size={16}>Employees</Text>
            </Block>
          </TouchableOpacity>

          <TouchableOpacity
            key='Meals'
            style={styles.box}
            onPress={() => navigation.navigate('Meals')}
          >
            <Block middle center style={styles.content}>
            <Dish height={40} width={40}/>
              <Text size={16}>Meals</Text>
            </Block>
          </TouchableOpacity>

          <TouchableOpacity
            key='Stocks'
            style={styles.box}
            onPress={() => navigation.navigate('Stocks')}
          >
            <Block middle center style={styles.content}>
            <Package height={40} width={40}/>
              <Text size={16}>Stocks</Text>
            </Block>
          </TouchableOpacity>

          <TouchableOpacity
            key='Charts'
            style={styles.box}
            onPress={() => navigation.navigate('Charts')}
          >
            <Block middle center style={styles.content}>
            <Chart height={40} width={40}/>
              <Text size={16}>Charts</Text>
            </Block>
          </TouchableOpacity>
        </View>
        </View>
      </ScrollView>
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

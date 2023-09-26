import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from '@react-navigation/native';
import HomeScreen from '../screens/home/index'; // Import your HomeScreen component
import ProfileScreen from '../screens/profile/index'; // Import your ProfileScreen component
import UserScreen from '../screens/user';
import AddUserScreen from '../screens/user/addUser';
// const HomeIcon = <Icon name="navicon" size={30} color="#900" />;


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeIcon = ({ color, size }) => {
  const isFocused = useIsFocused();
  return (
    <Icon
      name="home"
      size={35}
      color={isFocused ? '#759277' : 'gray'}
    />
  );
};

const ProfileIcon = ({ color, size }) => {
  const isFocused = useIsFocused();
  return (
    <Icon
      name="user"
      size={35}
      color={isFocused ? '#759277' : 'gray'}
    />
  );
};


const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#b4e373', } }} >
      <Stack.Screen name="Dashboard" component={HomeScreen} options={{ headerTitle: 'Dashboard' }} />
      <Stack.Screen name="User" component={UserScreen} options={{ headerTitle: 'Users' }} />
      <Stack.Screen name="AddUser" component={AddUserScreen} options={{ headerTitle: 'Add User' }} />
    </Stack.Navigator>
  );
};


const AppNavigator = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={
          ({ route }) => ({
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
            tabBarLabelStyle: {
              fontSize: 16,
            },
            tabBarStyle: {
              backgroundColor: '#131b15',
            },
          })}


      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <HomeIcon color={color} size={size} />
            ),

          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <ProfileIcon color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </>

  );
};

export default AppNavigator;

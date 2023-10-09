import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from '@react-navigation/native';
import HomeScreen from '../screens/home/index'; 
import ProfileScreen from '../screens/profile/index';
import UserScreen from '../screens/user';
import AddUserScreen from '../screens/user/addUser';
import EditUserScreen from '../screens/user/editUser';
import UserInfo from '../screens/user/userInfo';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const activeColor = '#05acff';
const inactiveColor = 'gray';

const HomeIcon = () => {
  const isFocused = useIsFocused();
  return (
    <Icon
      name="home"
      size={35}
      color={isFocused ? activeColor : inactiveColor}
    />
  );
};

const ProfileIcon = () => {
  const isFocused = useIsFocused();
  return (
    <Icon
      name="user"
      size={35}
      color={isFocused ? activeColor : inactiveColor }
    />
  );
};


const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#b4e373', } }} >
      <Stack.Screen name="Dashboard" component={HomeScreen} options={{ headerTitle: 'Dashboard' }} />
      <Stack.Screen name="Users" component={UserScreen} options={{ headerTitle: 'Users' }} />
      <Stack.Screen name="AddUser" component={AddUserScreen} options={{ headerTitle: 'Add User' }} />
      <Stack.Screen name="EditUser" component={EditUserScreen} options={{ headerTitle: 'Edit User' }} />
      <Stack.Screen name="UserInfo" component={UserInfo} options={{ headerTitle: 'User Information' }} />
      

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
              backgroundColor: 'white',
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
              <HomeIcon  />
            ),

          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <ProfileIcon  />
            ),
          }}
        />
      </Tab.Navigator>
    </>

  );
};

export default AppNavigator;

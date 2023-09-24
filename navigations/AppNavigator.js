import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from '@react-navigation/native';
import HomeScreen from '../screens/home/index'; // Import your HomeScreen component
import ProfileScreen from '../screens/profile/index'; // Import your ProfileScreen component

// const HomeIcon = <Icon name="navicon" size={30} color="#900" />;


const Tab = createBottomTabNavigator();

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
  

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
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
          component={HomeScreen} 
          options={{
            tabBarShowLabel: false,
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
    </NavigationContainer>
  );
};

export default AppNavigator;

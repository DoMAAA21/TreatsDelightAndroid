import React from 'react';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native';
import HomeStack from './HomeStack';
import AuthStack from './AuthStack';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();


const activeColor = 'black';
const inactiveColor = 'gray';

const HomeIcon = () => {
  const isFocused = useIsFocused();
  return (
    <MaterialCommunityIcons
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
      color={isFocused ? activeColor : inactiveColor}
    />
  );
};

const AppNavigator = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (!isAuthenticated) {
    return <AuthStack />;
  }

  return (
    <Tab.Navigator
      screenOptions={() => ({
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
          tabBarIcon: () => <HomeIcon />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: () => <ProfileIcon />,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;

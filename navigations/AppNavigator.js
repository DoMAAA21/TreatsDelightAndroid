import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native';
import ProfileScreen from '../screens/profile/index';
import HomeStack from './HomeStack';
import LoginScreen from '../screens/auth/login';
import { useNavigation } from '@react-navigation/native';

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
      color={isFocused ? activeColor : inactiveColor }
    />
  );
};

const AppNavigator = () => {
  const { isAuthenticated, error, loading } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <LoginScreen/>;
  }

  return (
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
  );
};

export default AppNavigator;

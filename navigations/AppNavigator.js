import React,{ useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { verifyToken } from '../store/reducers/auth/authenticationSlice';
import HomeStack from './HomeStack';
import AuthStack from './AuthStack';
import ProfileStack from './ProfileStack';
import ShopStack from './ShopStack';

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

const ShopIcon = () => {
  const isFocused = useIsFocused();
  return (
    <FontAwesome5Icon
      name="shopping-bag"
      size={25}
      color={isFocused ? activeColor : inactiveColor}
    />
  );
};
const MessageIcon = () => {
  const isFocused = useIsFocused();
  return (
    <AntDesignIcon
      name="message1"
      size={25}
      color={isFocused ? activeColor : inactiveColor}
    />
  );
};
const ProfileIcon = () => {
  const isFocused = useIsFocused();
  return (
    <Icon
      name="user"
      size={25}
      color={isFocused ? activeColor : inactiveColor}
    />
  );
};



const AppNavigator = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useFocusEffect(
    useCallback(()=>{
      dispatch(verifyToken());
    },[])
  );
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
        name="Shop"
        component={ShopStack}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: () => <ShopIcon />,
        }}
      />
      <Tab.Screen
        name="Message"
        component={ProfileStack}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: () => <MessageIcon />,
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

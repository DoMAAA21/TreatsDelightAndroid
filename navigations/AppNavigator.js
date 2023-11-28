import React,{ useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { verifyToken } from '../store/reducers/auth/authenticationSlice';
import HomeStack from './HomeStack';
import AuthStack from './AuthStack';
import ProfileStack from './ProfileStack';
import ShopStack from './ShopStack';
import HomeDark from '../assets/svg/HomeDark';
import HomeWhite from '../assets/svg/HomeWhite';
import BagDark from '../assets/svg/BagDark';
import BagWhite from '../assets/svg/BagWhite';
import MessageDark from '../assets/svg/MessageDark';
import MessageWhite from '../assets/svg/MessageWhite';
import ProfileDark from '../assets/svg/ProfileDark';
import ProfileWhite from '../assets/svg/ProfileWhite';

const Tab = createBottomTabNavigator();


const HomeIcon = () => {
  const isFocused = useIsFocused();
  return (
    isFocused ?  <HomeDark height={30} width={30} /> : <HomeWhite height={30} width={30}/>
  );
};

const ShopIcon = () => {
  const isFocused = useIsFocused();
  return (
    isFocused ?  <BagDark height={30} width={30} /> : <BagWhite height={30} width={30}/>
  );
};
const MessageIcon = () => {
  const isFocused = useIsFocused();
  return (
    isFocused ?  <MessageDark height={30} width={30} /> : <MessageWhite height={30} width={30}/>
  );
};
const ProfileIcon = () => {
  const isFocused = useIsFocused();
  return (
    isFocused ?  <ProfileDark height={30} width={30} /> : <ProfileWhite height={30} width={30}/>
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

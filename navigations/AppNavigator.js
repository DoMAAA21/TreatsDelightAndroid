import React,{ useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { verifyToken } from '../store/reducers/auth/authenticationSlice';
import HomeStack from './HomeStack';
import AuthStack from './AuthStack';
import ProfileStack from './ProfileStack';
import ShopStack from './ShopStack';
import NotificationStack from './NotificationStack';
import HomeDark from '../assets/svg/HomeDark';
import HomeWhite from '../assets/svg/HomeWhite';
import BagDark from '../assets/svg/BagDark';
import BagWhite from '../assets/svg/BagWhite';
import ProfileDark from '../assets/svg/ProfileDark';
import ProfileWhite from '../assets/svg/ProfileWhite';
import BellDark  from '../assets/svg/BellDark';
import BellWhite  from '../assets/svg/BellWhite';


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
const NotifcationIcon = () => {
  const isFocused = useIsFocused();
  return (
    isFocused ?  <BellDark height={30} width={30} /> : <BellWhite height={30} width={30}/>
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
        name="Notification"
        component={NotificationStack}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: () => <NotifcationIcon />,
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

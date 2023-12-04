import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/profile/index';
import ProfileInfo from '../screens/profile/profileInfo';
import EditProfile from '../screens/profile/editProfile';

const Stack = createStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator initialRouteName='ProfileIndex' screenOptions={{ headerStyle: { backgroundColor: '#b4e373', } }}>
            <Stack.Screen name="ProfileIndex" component={ProfileScreen} options={{ headerTitle: 'Profile' }}/>
            <Stack.Screen name="ProfileInfo" component={ProfileInfo} options={{ headerTitle: 'Profile Info' }}/>
            <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerTitle: 'Edit Profile' }}/>
        </Stack.Navigator>
    );

};

export default ProfileStack;
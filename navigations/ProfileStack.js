import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/profile/index';
import ProfileInfo from '../screens/profile/profileInfo';

const Stack = createStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='ProfileIndex'
        >
            <Stack.Screen name="ProfileIndex" component={ProfileScreen} />
            <Stack.Screen name="ProfileInfo" component={ProfileInfo} />
        </Stack.Navigator>
    );

};

export default ProfileStack;
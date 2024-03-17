import { createStackNavigator } from '@react-navigation/stack';
import NotificationsScreen from '../screens/notification/index';


const Stack = createStackNavigator();

const NotificationStack = () => {
    return (
        <Stack.Navigator initialRouteName='NotificationScreen' screenOptions={{ headerStyle: { backgroundColor: '#b4e373', } }}>
            <Stack.Screen name="NotificationScreen" component={NotificationsScreen} options={{ headerTitle: 'Notifications' }}/>
        </Stack.Navigator>
    );

};

export default NotificationStack;
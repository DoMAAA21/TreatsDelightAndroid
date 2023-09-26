import { createStackNavigator } from '@react-navigation/stack';

import UserScreen from '../screens/user';
import HomeScreen from '../screens/home';
const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="User" component={UserScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
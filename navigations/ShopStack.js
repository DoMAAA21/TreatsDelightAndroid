import { createStackNavigator } from '@react-navigation/stack';
import ShopScreen from '../screens/shop/index';
import ItemInfo from '../screens/shop/itemInfo';

const Stack = createStackNavigator();

const ShopStack = () => {
    return (
        <Stack.Navigator initialRouteName='ProfileIndex' screenOptions={{ headerStyle: { backgroundColor: '#b4e373', } }}>
            <Stack.Screen name="Shops" component={ShopScreen} options={{ headerTitle: 'Shop', headerShown: false }}/>
            <Stack.Screen name="ItemInfo" component={ItemInfo} options={{ headerTitle: 'Item Information'}}/>
        </Stack.Navigator>
    );

};

export default ShopStack;
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import ShopScreen from '../screens/shop/index';
import ItemInfo from '../screens/shop/itemInfo';

const Stack = createStackNavigator();

const ShopStack = () => {
    const navigation = useNavigation();
    return (
        <Stack.Navigator initialRouteName='Shops' screenOptions={{ headerStyle: { backgroundColor: '#b4e373'},
        headerBackImage: () => (
          <Ionicons name="chevron-back" size={25} />
        ),
      }}>
            <Stack.Screen name="Shops" component={ShopScreen} options={{ headerTitle: 'Shop', headerShown: false }}/>
            <Stack.Screen name="ItemInfo" component={ItemInfo} options={{ headerTitle: 'Item Information'}}/>
        </Stack.Navigator>
    );

};

export default ShopStack;
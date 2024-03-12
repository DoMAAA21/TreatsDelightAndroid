import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ShopScreen from '../screens/shop/index';
import ItemInfo from '../screens/shop/itemInfo';
import Cart from '../screens/shop/cart';
import ReceiptScreen from '../screens/shop/receipt';
import PaymentSelectionScreen from '../screens/shop/payment';

const Stack = createStackNavigator();

const ShopStack = () => {
  const navigation = useNavigation();

  const CustomGoBackButton = ({ navigation }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Shops')}>
      <Ionicons name="chevron-back" size={25} style={[{ paddingStart: 15 }]} />
    </TouchableOpacity>
  );

  
  return (
    <Stack.Navigator initialRouteName='Shops' screenOptions={{
      headerStyle: { backgroundColor: '#b4e373' },
      headerBackImage: () => (
        <Ionicons name="chevron-back" size={25} style={[{ paddingStart: 5 }]} />
      ),
    }}>
      <Stack.Screen name="Shops" component={ShopScreen} options={{ headerTitle: 'Shop', headerShown: false }} />
      <Stack.Screen name="ItemInfo" component={ItemInfo} options={{ headerTitle: 'Item Information' }} />
      <Stack.Screen name="Cart" component={Cart} options={{ headerTitle: 'Cart' }} />
      <Stack.Screen name="Receipt" component={ReceiptScreen} 
      options={({ navigation }) => ({
        headerTitle: 'Receipt',
        headerLeft: () => <CustomGoBackButton navigation={navigation} />,
      })}
      />
      <Stack.Screen name="Payment" component={PaymentSelectionScreen} options={{ headerTitle: 'Choose Payment' }} />
    </Stack.Navigator>
  );

};

export default ShopStack;
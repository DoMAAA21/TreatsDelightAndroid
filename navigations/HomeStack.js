import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home/index'; 
import UserScreen from '../screens/user';
import AddUserScreen from '../screens/user/addUser';
import EditUserScreen from '../screens/user/editUser';
import UserInfo from '../screens/user/userInfo';
import StoreScreen from '../screens/store/index';
import AddStoreScreen from '../screens/store/addStore';
import EditStoreScreen from '../screens/store/editStore';

const Stack = createStackNavigator();

const HomeStack = () => {
 
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#b4e373', } }} >
      <Stack.Screen name="Dashboard" component={HomeScreen} options={{ headerTitle: 'Dashboard' }} />
      <Stack.Screen name="Users" component={UserScreen} options={{ headerTitle: 'Users' }} />
      <Stack.Screen name="AddUser" component={AddUserScreen} options={{ headerTitle: 'Add User' }} />
      <Stack.Screen name="EditUser" component={EditUserScreen} options={{ headerTitle: 'Edit User' }} />
      <Stack.Screen name="UserInfo" component={UserInfo} options={{ headerTitle: 'User Information' }} />
      <Stack.Screen name="Stores" component={StoreScreen} options={{ headerTitle: 'Stores' }} />
      <Stack.Screen name="AddStore" component={AddStoreScreen} options={{ headerTitle: 'Add Store' }} />
      <Stack.Screen name="EditStore" component={EditStoreScreen} options={{ headerTitle: 'Edit Store' }} />
      
      
      
    </Stack.Navigator>
  );
};

export default HomeStack;
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from '../screens/home/index';
import UserScreen from '../screens/user';
import AddUserScreen from '../screens/user/addUser';
import EditUserScreen from '../screens/user/editUser';
import UserInfo from '../screens/user/userInfo';
import StoreScreen from '../screens/store/index';
import AddStoreScreen from '../screens/store/addStore';
import EditStoreScreen from '../screens/store/editStore';
import StoreInfo from '../screens/store/storeInfo';
import ProductScreen from '../screens/product/index'
import AddProductScreen from '../screens/product/addProduct';
import EditProductScreen from '../screens/product/editProduct';
import ProductInfo from '../screens/product/productInfo';
import EmployeeScreen from '../screens/employee/index';
import AddEmployeeScreen from '../screens/employee/addEmployee';
import EditEmployeeScreen from '../screens/employee/editEmployee';
import EmployeeInfo from '../screens/employee/employeeInfo';
import MealScreen from '../screens/meal/index';
import AddMealScreen from '../screens/meal/addMeal';
import EditMealScreen from '../screens/meal/editMeal';
import MealInfo from '../screens/meal/mealInfo';
import StockScreen from  '../screens/stock/index';
import ChartSreen from '../screens/analytic/index';
import ScannerScreen from '../screens/scanner/index';
import RentScreen from '../screens/rent/index';
import RentTransactionScreen from '../screens/rent/rentTransactions';
import AddRentScreen from '../screens/rent/addRent';




const Stack = createStackNavigator();

const HomeStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: '#b4e373', },
      
      headerBackImage: () => (
        <Ionicons name="chevron-back" size={25} style={[{ paddingStart: 5}]} />
      ),
     }} >
      <Stack.Screen name="Dashboard" component={HomeScreen}  options={{
          headerTitle:'',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Scanner')}>
              <Ionicons name="qr-code" size={25} style={{ paddingEnd: 15 }} />
            </TouchableOpacity>
          ),
        }}/>
      <Stack.Screen name="Users" component={UserScreen} options={{ headerTitle: 'Owners' }} />
      <Stack.Screen name="AddUser" component={AddUserScreen} options={{ headerTitle: 'Add User' }} />
      <Stack.Screen name="EditUser" component={EditUserScreen} options={{ headerTitle: 'Edit User' }} />
      <Stack.Screen name="UserInfo" component={UserInfo} options={{ headerTitle: 'User Information' }} />
      <Stack.Screen name="Stores" component={StoreScreen} options={{ headerTitle: 'Stores' }} />
      <Stack.Screen name="AddStore" component={AddStoreScreen} options={{ headerTitle: 'Add Store' }} />
      <Stack.Screen name="EditStore" component={EditStoreScreen} options={{ headerTitle: 'Edit Store' }} />
      <Stack.Screen name="StoreInfo" component={StoreInfo} options={{ headerTitle: 'Store Information' }} />
      <Stack.Screen name="Products" component={ProductScreen} options={{ headerTitle: 'Products' }} />
      <Stack.Screen name="AddProduct" component={AddProductScreen} options={{ headerTitle: 'Add Product' }} />
      <Stack.Screen name="EditProduct" component={EditProductScreen} options={{ headerTitle: 'Edit Product' }} />
      <Stack.Screen name="ProductInfo" component={ProductInfo} options={{ headerTitle: 'Product Information' }} />
      <Stack.Screen name="Employees" component={EmployeeScreen} options={{ headerTitle: 'Employees' }} />
      <Stack.Screen name="AddEmployee" component={AddEmployeeScreen} options={{ headerTitle: 'Add Employee' }} />
      <Stack.Screen name="EditEmployee" component={EditEmployeeScreen} options={{ headerTitle: 'Edit Employee' }} />
      <Stack.Screen name="EmployeeInfo" component={EmployeeInfo} options={{ headerTitle: 'Employee Information' }} />
      <Stack.Screen name="Meals" component={MealScreen} options={{ headerTitle: 'Meals' }} />
      <Stack.Screen name="AddMeal" component={AddMealScreen} options={{ headerTitle: 'Add Meal' }} />
      <Stack.Screen name="EditMeal" component={EditMealScreen} options={{ headerTitle: 'Edit Meal' }} />
      <Stack.Screen name="MealInfo" component={MealInfo} options={{ headerTitle: 'Meal Information' }} />
      <Stack.Screen name="Stocks" component={StockScreen} options={{ headerTitle: 'Manage Stocks' }} />
      <Stack.Screen name="Analytics" component={ChartSreen} options={{ headerTitle: 'Analytics' }} />
      <Stack.Screen name="Scanner" component={ScannerScreen} />
      <Stack.Screen name="Rent" component={RentScreen} options={{ headerTitle: 'Rent' }} />
      <Stack.Screen name="RentTransactions" component={RentTransactionScreen} options={{ headerTitle: 'Rent Transactions' }} />
      <Stack.Screen name="AddRent" component={AddRentScreen} options={{ headerTitle: 'Add Rent' }} />
    </Stack.Navigator>
  );
};

export default HomeStack;
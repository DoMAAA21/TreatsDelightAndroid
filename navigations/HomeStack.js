import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
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
import StockScreen from '../screens/stock/index';
import ScannerScreen from '../screens/scanner/index';
import RentScreen from '../screens/rent/index';
import RentTransactionScreen from '../screens/rent/rentTransactions';
import AddRentScreen from '../screens/rent/addRent';
import RentArchiveScreen from '../screens/rent/archives';
import WaterScreen from '../screens/water';
import WaterTransactionScreen from '../screens/water/waterTransactions';
import AddWaterScreen from '../screens/water/addWater';
import WaterArchiveScreen from '../screens/water/archives';
import ElectricityScreen from '../screens/electricity';
import ElectricityTransactionScreen from '../screens/electricity/electricityTransactions';
import AddElectricityScreen from '../screens/electricity/addElectricity';
import ElectricityArchiveScreen from '../screens/electricity/archives';
import MaintenanceScreen from '../screens/maintenance';
import MaintenanceTransactionScreen from '../screens/maintenance/maintenanceTransactions';
import AddMaintenanceScreen from '../screens/maintenance/addMaintenance';
import MaintenanceArchiveScreen from '../screens/maintenance/archives';
import InventoryScreen from '../screens/inventory';

import ChartSreen from '../screens/analytic/index';
import ElectricBillScreen from '../screens/analytic/electricBill';
import WaterBillScreen from '../screens/analytic/waterBill';
import RentBillScreen from '../screens/analytic/rentBill';
import TransactionScreen from '../screens/transaction';

const Stack = createStackNavigator();

const HomeStack = () => {
const { user } = useSelector(state => state.auth);


  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: '#b4e373', },

      headerBackImage: () => (
        <Ionicons name="chevron-back" size={25} style={[{ paddingStart: 5 }]} />
      ),
    }} >
      <Stack.Screen
        name="Dashboard"
        component={HomeScreen}
        options={({ navigation, route }) => ({
          headerTitle: '',
          headerRight: () => {
            if (user && (user.role.toLowerCase() === "owner" || user.role.toLowerCase() === "employee")) {
              return (
                <TouchableOpacity onPress={() => navigation.navigate('Scanner')}>
                  <Ionicons name="qr-code" size={25} style={{ paddingRight: 15 }} />
                </TouchableOpacity>
              );
            }
            return null;
          },
        })}
      />

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
      <Stack.Screen name="RentArchives" component={RentArchiveScreen} options={{ headerTitle: 'Rent Archives' }} />
      <Stack.Screen name="Water" component={WaterScreen} options={{ headerTitle: 'Water' }} />
      <Stack.Screen name="WaterTransactions" component={WaterTransactionScreen} options={{ headerTitle: 'Water Transactions' }} />
      <Stack.Screen name="AddWater" component={AddWaterScreen} options={{ headerTitle: 'Add Water' }} />
      <Stack.Screen name="WaterArchives" component={WaterArchiveScreen} options={{ headerTitle: 'Water Archives' }} />
      <Stack.Screen name="Electricity" component={ElectricityScreen} options={{ headerTitle: 'Electricity' }} />
      <Stack.Screen name="ElectricityTransactions" component={ElectricityTransactionScreen} options={{ headerTitle: 'Electricity Transactions' }} />
      <Stack.Screen name="AddElectricity" component={AddElectricityScreen} options={{ headerTitle: 'Add Electricity' }} />
      <Stack.Screen name="ElectricityArchives" component={ElectricityArchiveScreen} options={{ headerTitle: 'Electricity Archives' }} />
      <Stack.Screen name="Maintenance" component={MaintenanceScreen} options={{ headerTitle: 'Maintenance' }} />
      <Stack.Screen name="MaintenanceTransactions" component={MaintenanceTransactionScreen} options={{ headerTitle: 'Maintenance Transactions' }} />
      <Stack.Screen name="AddMaintenance" component={AddMaintenanceScreen} options={{ headerTitle: 'Add Maintenance' }} />
      <Stack.Screen name="MaintenanceArchives" component={MaintenanceArchiveScreen} options={{ headerTitle: 'Maintenance Archives' }} />
      <Stack.Screen name="ElectricBill" component={ElectricBillScreen} options={{ headerTitle: 'Electric Bill' }} />
      <Stack.Screen name="WaterBill" component={WaterBillScreen} options={{ headerTitle: 'Water Bill' }} />
      <Stack.Screen name="RentBill" component={RentBillScreen} options={{ headerTitle: 'Rent Bill' }} />
      <Stack.Screen name="Inventory" component={InventoryScreen} options={{ headerTitle: 'Inventory'}}/>
      <Stack.Screen name="Transaction" component={TransactionScreen} options={{ headerTitle: 'Transaction'}}/>
    </Stack.Navigator>
  );
};

export default HomeStack;
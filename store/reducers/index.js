import { combineReducers } from '@reduxjs/toolkit';
import allUsersReducer from './user/allUsersSlice';
import newUserReducer from './user/newUserSlice';
import userReducer from './user/userSlice';
import userDetailsReducer from './user/userDetailsSlice';
import allStoresReducer from './store/allStoresSlice';
import newStoreReducer from './store/newStoreSlice';
import storeReducer from './store/storeSlice';
import storeDetailsReducer from './store/storeDetailsSlice';
import authenticationReducer from './auth/authenticationSlice';
import allProductsReducer from './product/allProductsSlice';
import newProductReducer from './product/newProductSlice';
import productReducer from './product/productSlice';
import productDetailsReducer from './product/productDetailsSlice';
import allEmployeeReducer from './employee/allEmployeesSlice';
import newEmployeeReducer from './employee/newEmployeeSlice';
import employeeDetailsReducer from './employee/employeeDetailsSlice';
import employeeReducer from './employee/employeeSlice';
import cartReducer from './cart/cartSlice';
import allOrdersReducer from './chart/allOrdersSlice';
import productsSoldReducer from './chart/productsSoldSlice';
import allSalesReducer from './chart/allSalesSlice';
import allRentsReducer from './rent/allRentsSlice';
import newRentReducer from './rent/newRentSlice';
import rentReducer from './rent/rentSlice';
import allWatersReducer from './water/allWatersSlice';
import newWaterReducer from './water/newWaterSlice';
import waterReducer from './water/waterSlice';

const rootReducer = combineReducers({
  allUsers : allUsersReducer,
  newUser : newUserReducer,
  user : userReducer,
  userDetails : userDetailsReducer,
  allStores : allStoresReducer,
  newStore : newStoreReducer,
  store : storeReducer,
  storeDetails : storeDetailsReducer,
  auth : authenticationReducer,
  allProducts : allProductsReducer,
  newProduct : newProductReducer,
  product : productReducer,
  productDetails : productDetailsReducer,
  allEmployees : allEmployeeReducer,
  newEmployee : newEmployeeReducer,
  employeeDetails : employeeDetailsReducer,
  employee : employeeReducer,
  cart : cartReducer,
  allOrders : allOrdersReducer,
  allSold : productsSoldReducer,
  allSales : allSalesReducer,
  allRent : allRentsReducer,
  newRent : newRentReducer,
  rent : rentReducer,
  allWater : allWatersReducer,
  newWater : newWaterReducer,
  water : waterReducer,

});

export default rootReducer
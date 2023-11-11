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
// import storeDashboardSlice from './storeDashboard/storeDashboardSlice';
import allProductsReducer from './product/allProductsSlice';
import newProductReducer from './product/newProductSlice';
import productReducer from './product/productSlice';
import productDetailsReducer from './product/productDetailsSlice';
import allEmployeeReducer from './employee/allEmployeesSlice';
import newEmployeeReducer from './employee/newEmployeeSlice';
import employeeDetailsReducer from './employee/employeeDetailsSlice';
import employeeReducer from './employee/employeeSlice';

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
  employee : employeeReducer
});

export default rootReducer
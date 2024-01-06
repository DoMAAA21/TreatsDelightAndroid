import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../../../shared/constants';

const initialState = {
  loading: false,
  success: false,
  error: null,
  employees: [], 
};

export const newEmployee = createAsyncThunk('newEmployee/newEmployee', async (employeeData, { dispatch }) => {
  try {
    dispatch(newEmployeeRequest());
    const token = await AsyncStorage.getItem('token');
    const user = await AsyncStorage.getItem('user');
    const userCreds = JSON.parse(user);
    const storeId = userCreds?.store?.storeId;
    const storeName = userCreds?.store?.name;
    employeeData.append("storeId", storeId);
    employeeData.append("storeName", storeName);
    console.log(employeeData)
    
    if (!token) {
      dispatch(newEmployeeFail('Login First'));
      throw error.response.data.message;
    }
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.post(`${BACKEND_URL}/api/v1/admin/employee/new`, employeeData, config);
    dispatch(newEmployeeSuccess(data));
    return data;
  } catch (error) {
    dispatch(newEmployeeFail(error.response.data.message))
    throw error.response.data.message;
  }
});


const newEmployeeSlice = createSlice({
  name: 'newEmployee',
  initialState,
  reducers: {
    updateField: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
    newEmployeeRequest: (state) => {
      state.loading = true;
    },
    newEmployeeSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.employees = action.payload.employee;
    },
    newEmployeeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    newEmployeeReset: (state) => {
      state.success = false;
      state.error = null;
    },
    clearErrors: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(newEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(newEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.employees = action.payload.product;
      })
      .addCase(newEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  updateField,
  newEmployeeRequest,
  newEmployeeSuccess,
  newEmployeeFail,
  newEmployeeReset,
} = newEmployeeSlice.actions;

export default newEmployeeSlice.reducer;

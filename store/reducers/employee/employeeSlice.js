import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../../../shared/constants';

const initialState = {
  loading: false,
  isUpdated: false,
  isDeleted: false,
  error: null,
};


export const deleteEmployee = createAsyncThunk('employee/deleteEmployee', async (id, {dispatch}) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      dispatch(deleteEmployeeReset());
    }
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.delete(`${BACKEND_URL}/api/v1/admin/employee/${id}`,config);
    dispatch(deleteEmployeeSuccess(data.success));
    return data.success;
  } catch (error) {
    dispatch(deleteEmployeeFail(error.response.data.message))
    throw error.response.data.message;
  }
});


export const updateEmployee = createAsyncThunk('employee/updateEmployee', async ({ id, employeeData }, {dispatch}) => {
  try {
    dispatch(updateEmployeeRequest())
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      dispatch(updateEmployeeFail('Login First'));
      throw error.response.data.message;
    }
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `${token}`,
      },
    };

   
    const { data } = await axios.put(`${BACKEND_URL}/api/v1/admin/employee/${id}`, employeeData, config);

    dispatch(updateEmployeeSuccess(data.success));
  
    return data.success;
  } catch (error) {
    dispatch(updateEmployeeFail(error.response.data.message));
    throw error.response.data.message;
  }
});


  

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    updateEmployeeRequest: (state) => {
      state.loading = true;
    },
    updateEmployeeSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    deleteEmployeeSuccess: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    updateEmployeeReset: (state) => {
      state.isUpdated = false;
      state.error = null;
    },
    deleteEmployeeReset: (state) => {
      state.isDeleted = false;
      state.error = null;
    },
    updateEmployeeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }, 
    deleteEmployeeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  updateEmployeeRequest,
  updateEmployeeSuccess,
  deleteEmployeeSuccess,
  updateEmployeeReset,
  deleteEmployeeReset,
  updateEmployeeFail,
  deleteEmployeeFail,
  clearErrors,
} = employeeSlice.actions;

export default employeeSlice.reducer;

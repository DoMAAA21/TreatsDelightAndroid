import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../../../shared/constants';

const initialState = {
  employee: {},
  loading: false,
  error: null,
};

export const getEmployeeDetails = createAsyncThunk('employeeDetails/getEmployeeDetails', async (id, { dispatch }) => {
  try {
    dispatch(employeeDetailsRequest()); 
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      dispatch(employeeDetailsFail('Login First'));
      throw error.response.data.message;
    }
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.get(
      `${BACKEND_URL}/api/v1/admin/employee/${id}`,config);

    dispatch(employeeDetailsSuccess(data.employee));
    return data.employee;
  } catch (error) {
    dispatch(employeeDetailsFail(error.response.data.message))
    throw error.response.data.message;
  }
}
);

const employeeDetailsSlice = createSlice({
  name: 'employeeDetails',
  initialState,
  reducers: {
    employeeDetailsRequest: (state) => {
      state.loading = true;
    },
    employeeDetailsSuccess: (state, action) => {
      state.loading = false;
      state.employee = action.payload;
    },
    employeeDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    employeeUpdated: (state) => {
      state.error = null;
      state.employee = {};
    },
  },
});

export const {
  employeeDetailsRequest,
  employeeDetailsSuccess,
  employeeDetailsFail,
  clearErrors,
  employeeUpdated
} = employeeDetailsSlice.actions;

export default employeeDetailsSlice.reducer;

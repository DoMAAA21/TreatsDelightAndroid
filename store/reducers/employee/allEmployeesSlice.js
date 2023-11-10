import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BACKEND_URL} from '../../../shared/constants'



const initialState = {
  employees: [],
  loading: false,
  error: null,
};

export const fetchAllEmployees = createAsyncThunk('allEmployees/fetchAllEmployees',async (_, {dispatch}) => {
    try {
      dispatch(allEmployeesRequest());
      const token = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');
      const userCreds = JSON.parse(user);
      const storeId = userCreds.store.storeId;
      
      if (!token) {
        dispatch(allEmployeesFail('Login First'));
      }
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };
      const { data } = await axios.get(`${BACKEND_URL}/api/v1/admin/store/${storeId}/employees`,config);
      dispatch(allEmployeesSuccess(data.employees));
      return data.employees;
    } catch (error) {
      dispatch(allEmployeesFail(error.response.data.message))
      throw error.response.data.message; 
    }
  }
);

const allEmployeesSlice = createSlice({
  name: 'allEmployees',
  initialState,
  reducers: {
    allEmployeesRequest: (state) => {
      state.loading = true;
    },
    allEmployeesSuccess: (state, action) => {
      state.loading = false;
      state.employees = action.payload;
    },
    allEmployeesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    clearEmployee: (state) => {
      state.employees = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchAllEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  allEmployeesRequest,
  allEmployeesSuccess,
  allEmployeesFail,
  clearErrors,
  clearEmployee,
} = allEmployeesSlice.actions;

export default allEmployeesSlice.reducer;

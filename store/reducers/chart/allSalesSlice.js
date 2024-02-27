import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../../../shared/constants';

const initialState = {
  salesThisMonth: [],
  salesToday: [],
  loading: true,
  error: null,
};

export const fetchSalesThisMonth = createAsyncThunk('allSales/fetchSalesThisMonth', async (_, { dispatch }) => {
  try {
    dispatch(salesThisMonthRequest());
    const token = await AsyncStorage.getItem('token');
    const user = await AsyncStorage.getItem('user');
    const userCreds = JSON.parse(user);
    const storeId = userCreds?.store?.storeId;
    if (!token) {
      dispatch(salesThisMonthFail('Login First'));
    }
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.get(`${BACKEND_URL}/api/v1/chart/store/${storeId}/sales-current-month`, config);
    dispatch(salesThisMonthSuccess(data));
    return response.data;
  } catch (error) {
    dispatch(salesThisMonthFail(error.response.data.message));
    throw error.response.data.message;
  }
});

export const fetchSalesToday = createAsyncThunk('allSales/fetchSalesThisMonth', async (_, { dispatch }) => {
  try {
    dispatch(salesTodayRequest());
    const token = await AsyncStorage.getItem('token');
    const user = await AsyncStorage.getItem('user');
    const userCreds = JSON.parse(user);
    const storeId = userCreds?.store?.storeId;
    if (!token) {
      dispatch(salesTodayFail('Login First'));
    }
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.get(`${BACKEND_URL}/api/v1/chart/store/${storeId}/sales-current-day`, config);
    dispatch(salesTodaySuccess(data));
    return response.data;
  } catch (error) {
    dispatch(salesTodayFail(error.response.data.message));
    throw error.response.data.message;
  }
});

const allSalesSlice = createSlice({
  name: 'allSales',
  initialState,
  reducers: {
    salesThisMonthSuccess: (state, action) => {
      state.salesThisMonth = action.payload;
      state.loading = false;
      state.error = null;
    },
    salesThisMonthRequest: (state) => {
      state.loading = true;
    },
    salesThisMonthFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearSalesThisMonth: (state) => {
      state.salesThisMonth = [];

    },
    salesTodaySuccess: (state, action) => {
      state.salesToday = action.payload;
      state.loading = false;
      state.error = null;
    },
    salesTodayRequest: (state) => {
      state.loading = true;
    },
    salesTodayFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearSalesToday: (state) => {
      state.salesToday = [];

    },
  },
});

export const { 
  salesThisMonthRequest,
  salesThisMonthSuccess,
  salesThisMonthFail,
  clearSalesThisMonth,
  salesTodayRequest,
  salesTodaySuccess,
  salesTodayFail,
  clearSalesToday
} = allSalesSlice.actions;

export default allSalesSlice.reducer;

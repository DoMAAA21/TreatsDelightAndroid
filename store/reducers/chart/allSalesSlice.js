import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../../../shared/constants';

const initialState = {
  sales: [],
  loading: true,
  error: null,
};

export const fetchAllSales = createAsyncThunk('allSales/fetchAllSales', async (_, { dispatch }) => {
  try {
    dispatch(allSalesRequest());
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      dispatch(allSalesFail('Login First'));
    }
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.get(`${BACKEND_URL}/api/v1/chart/sales-per-month`, config);
    dispatch(allSalesSuccess(data));
    return response.data;
  } catch (error) {
    dispatch(allSalesFail(error.response.data.message));
    throw error.response.data.message;
  }
});

const allSalesSlice = createSlice({
  name: 'allSales',
  initialState,
  reducers: {
    allSalesSuccess: (state, action) => {
      state.sales = action.payload;
      state.loading = false;
      state.error = null;
    },
    allSalesRequest: (state) => {
      state.loading = true;
    },
    allSalesFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearAllSales: (state) => {
      state.sales = [];

    },
  },
});

export const { allSalesSuccess, allSalesRequest, allSalesFail, clearAllSales } = allSalesSlice.actions;

export default allSalesSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../../../shared/constants';
import { truncate } from 'lodash';

const initialState = {
  orders: [],
  loading: true,
  error: null,
};

export const fetchAllOrders = createAsyncThunk('allOrders/fetchAllOrders', async (_, { dispatch }) => {
  try {
    dispatch(allOrdersRequest());
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      dispatch(allOrdersFail('Login First'));
    }
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.get(`${BACKEND_URL}/api/v1/chart/orders-per-month`, config);
    dispatch(allOrdersSuccess(data));
    return response.data;
  } catch (error) {
    dispatch(allOrdersFail(error.response.data.message));
    throw error.response.data.message;
  }
});

const allOrdersSlice = createSlice({
  name: 'allOrders',
  initialState,
  reducers: {
    allOrdersSuccess: (state, action) => {
      state.orders = action.payload;
      state.loading = false;
      state.error = null;
    },
    allOrdersRequest: (state) => {
      state.loading = true;
    },
    allOrdersFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearAllOrders: (state) => {
      state.orders = [];

    },
  },
});

export const { allOrdersSuccess, allOrdersRequest, allOrdersFail, clearAllOrders } = allOrdersSlice.actions;

export default allOrdersSlice.reducer;

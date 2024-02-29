import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../../../shared/constants';


const initialState = {
  rentBillsPerMonth: [],
  loading: true,
  error: null,
};

export const fetchRentBillPerMonth = createAsyncThunk('allRentBillsPerMonths/fetchRentBillPerMonth', async (_, { dispatch }) => {
  try {
    dispatch(allRentBillsPerMonthsRequest());
    const token = await AsyncStorage.getItem('token');
    const user = await AsyncStorage.getItem('user');
    const userCreds = JSON.parse(user);
    const storeId = userCreds?.store?.storeId;
    if (!token) {
      dispatch(allRentBillsPerMonthsFail('Login First'));
    }
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.get(`${BACKEND_URL}/api/v1/chart/store/${storeId}/rent-bill-per-month`, config);
    dispatch(allRentBillsPerMonthsSuccess(data));
    return response.data;
  } catch (error) {
    dispatch(allRentBillsPerMonthsFail(error.response.data.message));
    throw error.response.data.message;
  }
});

const allRentBillsPerMonthsSlice = createSlice({
  name: 'allRentBillsPerMonths',
  initialState,
  reducers: {
    allRentBillsPerMonthsSuccess: (state, action) => {
      state.rentBillsPerMonth = action.payload;
      state.loading = false;
      state.error = null;
    },
    allRentBillsPerMonthsRequest: (state) => {
      state.loading = true;
    },
    allRentBillsPerMonthsFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearAllRentBillsPerMonths: (state) => {
      state.rentBillsPerMonth = [];

    },
  },
});

export const { allRentBillsPerMonthsSuccess, allRentBillsPerMonthsRequest, allRentBillsPerMonthsFail, clearAllRentBillsPerMonths } = allRentBillsPerMonthsSlice.actions;

export default allRentBillsPerMonthsSlice.reducer;

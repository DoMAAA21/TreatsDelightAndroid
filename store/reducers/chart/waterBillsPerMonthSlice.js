import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../../../shared/constants';


const initialState = {
  waterBillsPerMonth: [],
  loading: true,
  error: null,
};

export const fetchWaterBillPerMonth = createAsyncThunk('allWaterBillsPerMonths/fetchWaterBillPerMonth', async (_, { dispatch }) => {
  try {
    dispatch(allWaterBillsPerMonthsRequest());
    const token = await AsyncStorage.getItem('token');
    const user = await AsyncStorage.getItem('user');
    const userCreds = JSON.parse(user);
    const storeId = userCreds?.store?.storeId;
    if (!token) {
      dispatch(allWaterBillsPerMonthsFail('Login First'));
    }
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.get(`${BACKEND_URL}/api/v1/chart/store/${storeId}/water-bill-per-month`, config);
    dispatch(allWaterBillsPerMonthsSuccess(data));
    return response.data;
  } catch (error) {
    dispatch(allWaterBillsPerMonthsFail(error.response.data.message));
    throw error.response.data.message;
  }
});

const allWaterBillsPerMonthsSlice = createSlice({
  name: 'allWaterBillsPerMonths',
  initialState,
  reducers: {
    allWaterBillsPerMonthsSuccess: (state, action) => {
      state.waterBillsPerMonth = action.payload;
      state.loading = false;
      state.error = null;
    },
    allWaterBillsPerMonthsRequest: (state) => {
      state.loading = true;
    },
    allWaterBillsPerMonthsFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearAllWaterBillsPerMonths: (state) => {
      state.waterBillsPerMonth = [];

    },
  },
});

export const { allWaterBillsPerMonthsSuccess, allWaterBillsPerMonthsRequest, allWaterBillsPerMonthsFail, clearAllWaterBillsPerMonths } = allWaterBillsPerMonthsSlice.actions;

export default allWaterBillsPerMonthsSlice.reducer;

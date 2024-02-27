import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../../../shared/constants';


const initialState = {
  electricBillsPerMonth: [],
  loading: true,
  error: null,
};

export const fetchElectricBillPerMonth = createAsyncThunk('allElectricBillsPerMonths/fetchElectricBillPerMonth', async (_, { dispatch }) => {
  try {
    dispatch(allElectricBillsPerMonthsRequest());
    const token = await AsyncStorage.getItem('token');
    const user = await AsyncStorage.getItem('user');
    const userCreds = JSON.parse(user);
    const storeId = userCreds?.store?.storeId;
    if (!token) {
      dispatch(allElectricBillsPerMonthsFail('Login First'));
    }
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.get(`${BACKEND_URL}/api/v1/chart/store/${storeId}/electricity-bill-per-month`, config);
    dispatch(allElectricBillsPerMonthsSuccess(data));
    return response.data;
  } catch (error) {
    dispatch(allElectricBillsPerMonthsFail(error.response.data.message));
    throw error.response.data.message;
  }
});

const allElectricBillsPerMonthsSlice = createSlice({
  name: 'allElectricBillsPerMonths',
  initialState,
  reducers: {
    allElectricBillsPerMonthsSuccess: (state, action) => {
      state.electricBillsPerMonth = action.payload;
      state.loading = false;
      state.error = null;
    },
    allElectricBillsPerMonthsRequest: (state) => {
      state.loading = true;
    },
    allElectricBillsPerMonthsFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearAllElectricBillsPerMonths: (state) => {
      state.electricBillsPerMonth = [];

    },
  },
});

export const { allElectricBillsPerMonthsSuccess, allElectricBillsPerMonthsRequest, allElectricBillsPerMonthsFail, clearAllElectricBillsPerMonths } = allElectricBillsPerMonthsSlice.actions;

export default allElectricBillsPerMonthsSlice.reducer;

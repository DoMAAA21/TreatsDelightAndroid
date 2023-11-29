import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../../../shared/constants';

const initialState = {
  sold: [],
  loading: true,
  error: null,
};

export const fetchAllSold = createAsyncThunk('allSold/fetchAllSold', async (_, { dispatch }) => {
  try {
    dispatch(allSoldRequest());
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      dispatch(allSoldFail('Login First'));
    }
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.get(`${BACKEND_URL}/api/v1/chart/products-sold`, config);
    dispatch(allSoldSuccess(data));
    return response.data;
  } catch (error) {
    dispatch(allSoldFail(error.response.data.message));
    throw error.response.data.message;
  }
});

const allSoldSlice = createSlice({
  name: 'allSold',
  initialState,
  reducers: {
    allSoldSuccess: (state, action) => {
      state.sold = action.payload;
      state.loading = false;
      state.error = null;
    },
    allSoldRequest: (state) => {
      state.loading = true;
    },
    allSoldFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearAllSold: (state) => {
      state.sold = [];

    },
  },
});

export const { allSoldSuccess, allSoldRequest, allSoldFail, clearAllSold } = allSoldSlice.actions;

export default allSoldSlice.reducer;

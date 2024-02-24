import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../../../shared/constants';

const initialState = {
  loading: false,
  success: false,
  error: null,
  rents: [], 
};

export const newRent = createAsyncThunk('newRent/newRent', async (rentData, { dispatch }) => {

  try {
    dispatch(newRentRequest())
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      dispatch(newRentFail('Login First'));
    }
    const config = {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`${BACKEND_URL}/api/v1/admin/rent/new`, rentData, config);
    dispatch(newRentSuccess(data))
    return data;
  } catch (error) {
    dispatch(newRentFail(error.response.data.message));
    throw error.response.data.message;
  }
});

const newRentSlice = createSlice({
  name: 'newRent',
  initialState,
  reducers: {
    newRentRequest: (state) => {
      state.loading = true;
    },
    newRentSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.rents = action.payload.rent;
    },
    newRentFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    newRentReset: (state) => {
      state.success = false;
      state.error = null;
    },
    clearErrors: (state) => {
      state.success = false;
      state.error = null;
    },
  },
});

export const {
  newRentRequest,
  newRentSuccess,
  newRentFail,
  newRentReset,
} = newRentSlice.actions;

export default newRentSlice.reducer;

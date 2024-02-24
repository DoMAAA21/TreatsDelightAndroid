import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../../../shared/constants';

const initialState = {
  loading: false,
  success: false,
  error: null,
  waters: [], 
};

export const newWater = createAsyncThunk('newWater/newWater', async (waterData, { dispatch }) => {

  try {
    dispatch(newWaterRequest())
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      dispatch(newWaterFail('Login First'));
    }
    const config = {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`${BACKEND_URL}/api/v1/admin/water/new`, waterData, config);
    dispatch(newWaterSuccess(data))
    return data;
  } catch (error) {
    dispatch(newWaterFail(error.response.data.message));
    throw error.response.data.message;
  }
});

const newWaterSlice = createSlice({
  name: 'newWater',
  initialState,
  reducers: {
    newWaterRequest: (state) => {
      state.loading = true;
    },
    newWaterSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.waters = action.payload.water;
    },
    newWaterFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    newWaterReset: (state) => {
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
  newWaterRequest,
  newWaterSuccess,
  newWaterFail,
  newWaterReset,
} = newWaterSlice.actions;

export default newWaterSlice.reducer;

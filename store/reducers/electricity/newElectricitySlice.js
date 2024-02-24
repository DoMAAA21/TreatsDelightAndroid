import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../../../shared/constants';

const initialState = {
  loading: false,
  success: false,
  error: null,
  electricity: [], 
};

export const newElectricity = createAsyncThunk('newElectricity/newElectricity', async (electricityData, { dispatch }) => {

  try {
    dispatch(newElectricityRequest())
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      dispatch(newElectricityFail('Login First'));
    }
    const config = {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`${BACKEND_URL}/api/v1/admin/electricity/new`, electricityData, config);
    console.log(data);
    dispatch(newElectricitySuccess(data))
    return data;
  } catch (error) {
    dispatch(newElectricityFail(error.response.data.message));
    throw error.response.data.message;
  }
});

const newElectricitySlice = createSlice({
  name: 'newElectricity',
  initialState,
  reducers: {
    newElectricityRequest: (state) => {
      state.loading = true;
    },
    newElectricitySuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.electricity = action.payload.electricity;
    },
    newElectricityFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    newElectricityReset: (state) => {
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
  newElectricityRequest,
  newElectricitySuccess,
  newElectricityFail,
  newElectricityReset,
} = newElectricitySlice.actions;

export default newElectricitySlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../../../shared/constants';

const initialState = {
  loading: false,
  isUpdated: false,
  error: null,
};

export const updateTransaction = createAsyncThunk('transaction/updateTransaction', async ({ id, status }, {dispatch}) => {
  try {
    dispatch(updateTransactionRequest())
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      dispatch(updateTransactionFail('Login First'));
      throw error.response.data.message;
    }
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
   
    const { data } = await axios.patch(`${BACKEND_URL}/api/v1/admin/transaction/update`, {id , status}, config);
    dispatch(updateTransactionSuccess(data.success));
  
    return data.success;
  } catch (error) {
    dispatch(updateTransactionFail(error.response.data.message));
    throw error.response.data.message;
  }
});


  

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    updateTransactionRequest: (state) => {
      state.loading = true;
    },
    updateTransactionSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    updateTransactionReset: (state) => {
      state.isUpdated = false;
      state.error = null;
    },
    updateTransactionFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }, 
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  updateTransactionRequest,
  updateTransactionSuccess,
  updateTransactionReset,
  updateTransactionFail,
  clearErrors,
} = transactionSlice.actions;

export default transactionSlice.reducer;

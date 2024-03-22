import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BACKEND_URL} from '../../../shared/constants'



const initialState = {
  transactions: [],
  loading: false,
  error: null,
};

export const fetchAllTransactions = createAsyncThunk('allTransactions/fetchAllTransactions',async (_, {dispatch}) => {
    try {
      dispatch(allTransactionsRequest());
      const token = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');
      const userCreds = JSON.parse(user);
      const storeId = userCreds.store.storeId;
      
      if (!token) {
        dispatch(allTransactionsFail('Login First'));
      }
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };
      const { data } = await axios.get(`${BACKEND_URL}/api/v1/admin/store/${storeId}/transactions`,config);
      dispatch(allTransactionsSuccess(data.transactions));
      return data.transactions;
    } catch (error) {
      dispatch(allTransactionsFail(error.response.data.message))
      throw error.response.data.message; 
    }
  }
);

const allTransactionsSlice = createSlice({
  name: 'allTransactions',
  initialState,
  reducers: {
    allTransactionsRequest: (state) => {
      state.loading = true;
    },
    allTransactionsSuccess: (state, action) => {
      state.loading = false;
      state.transactions = action.payload;
    },
    allTransactionsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    clearTransaction: (state) => {
      state.transactions = [];
    },
  },
});

export const {
  allTransactionsRequest,
  allTransactionsSuccess,
  allTransactionsFail,
  clearErrors,
  clearTransaction,
} = allTransactionsSlice.actions;

export default allTransactionsSlice.reducer;

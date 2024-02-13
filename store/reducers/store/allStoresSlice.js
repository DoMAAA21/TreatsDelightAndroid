import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../../../shared/constants';


const initialState = {
  stores: [],
  loading: false,
  error: null,
};

export const fetchAllStores = createAsyncThunk('allStores/fetchAllStores', async (_, { dispatch }) => {
  try {
    dispatch(allStoresRequest());
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      dispatch(allStoresFail('Login First'));
    }
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.get(`${BACKEND_URL}/api/v1/admin/stores`, config);
    dispatch(allStoresSuccess(data.stores));
    return data.stores;
  } catch (error) {
    dispatch(allStoresFail(error.response.data.message))
    throw error.response.data.message;
  }
});

export const fetchStores = createAsyncThunk('allStores/fetchAllStores', async (_, { dispatch }) => {
  try {
    dispatch(allStoresRequest());
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      dispatch(allStoresFail('Login First'));
    }
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.get(`${BACKEND_URL}/api/v1/stores`, config);
    dispatch(allStoresSuccess(data.stores));
    return data.stores;
  } catch (error) {
    dispatch(allStoresFail(error.response.data.message))
    throw error.response.data.message;
  }
});

const allStoresSlice = createSlice({
  name: 'allStores',
  initialState,
  reducers: {
    allStoresRequest: (state) => {
      state.loading = true;
    },
    allStoresSuccess: (state, action) => {
      state.loading = false;
      state.stores = action.payload;
    },
    allStoresFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    clearStores: (state) => {
      state.stores = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllStores.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllStores.fulfilled, (state, action) => {
        state.loading = false;
        state.stores = action.payload;
      })
      .addCase(fetchAllStores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  allStoresRequest,
  allStoresSuccess,
  allStoresFail,
  clearErrors,
  clearStores
} = allStoresSlice.actions;

export default allStoresSlice.reducer;

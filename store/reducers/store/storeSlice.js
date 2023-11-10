import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../../../shared/constants';


const initialState = {
  loading: false,
  isUpdated: false,
  isDeleted: false,
  error: null,
};

const maxRetries = 3;
export const deleteStore = createAsyncThunk('store/deleteStore', async (id, { dispatch }) => {
  try {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      dispatch(deleteStoreReset());
    }
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.delete(`${BACKEND_URL}/api/v1/admin/store/${id}`, config);
    dispatch(deleteStoreSuccess(data.success))
    return data.success;

  } catch (error) {
    dispatch(deleteStoreFail(error.response.data.message))
    throw error.response.data.message;
  }
}
);


export const updateStore = createAsyncThunk('store/updateStore', async (payload, { dispatch }) => {
  const { id, storeData } = payload;

  try {
    dispatch(updateStoreRequest());
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      dispatch(updateStoreFail('Login First'));
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `${token}`,
      },
    };
    let retryCount = 0;
    let success = false;

    while (!success && retryCount < maxRetries) {
      try {
        const { data } = await axios.put(`${BACKEND_URL}/api/v1/admin/store/${id}`, storeData, config);
        dispatch(updateStoreSuccess(data.success));
        success = true;
        return data.success;
      } catch (error) {
        retryCount++;
      }
    }
    dispatch(updateStoreFail('Server is Busy'))
  } catch (error) {
    dispatch(updateStoreFail(error.response.data.message))
    throw error.response.data.message;
  }
});


const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    updateStoreRequest: (state) => {
      state.loading = true;
    },
    updateStoreSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    deleteStoreSuccess: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    updateStoreReset: (state) => {
      state.isUpdated = false;
      state.error = null;
    },
    deleteStoreReset: (state) => {
      state.isDeleted = false;
      state.error = null;
    },
    deleteStoreFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStoreFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  updateStoreRequest,
  updateStoreSuccess,
  deleteStoreSuccess,
  updateStoreReset,
  deleteStoreReset,
  deleteStoreFail,
  updateStoreFail,
  clearErrors,
} = storeSlice.actions;

export default storeSlice.reducer;

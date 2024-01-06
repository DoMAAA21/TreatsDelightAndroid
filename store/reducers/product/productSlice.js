import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../../../shared/constants';

const initialState = {
  loading: false,
  isUpdated: false,
  isStatusUpdated: false,
  isDeleted: false,
  error: null,
  isEdited: false,
};
const maxRetries = 3;

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id, { dispatch }) => {
  try {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      dispatch(deleteProductReset());
    }
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.delete(`${BACKEND_URL}/api/v1/admin/product/${id}`, config);
    dispatch(deleteProductSuccess(data.success))
    return data.success;

  } catch (error) {
    dispatch(deleteProductFail(error.response.data.message))
    throw error.response.data.message;
  }
}
);

export const updateProduct = createAsyncThunk('product/updateProduct', async ({ id, productData }, { dispatch }) => {
  try {
    dispatch(updateProductRequest());
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      dispatch(updateProductFail('Login First'));
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
        const { data } = await axios.put(`${BACKEND_URL}/api/v1/admin/product/${id}`, productData, config);
        dispatch(updateProductSuccess(data.success));
        success = true;
        return data.success;
      } catch (error) {
        retryCount++;
      }
    }

    dispatch(updateProductFail('Server is Busy'))
  } catch (error) {
    dispatch(updateProductFail(error.response.data.message))
    throw error.response.data.message;
  }
});

export const updateProductStatus = createAsyncThunk('product/updateProductStatus', async (id, { dispatch }) => {
  try {
    dispatch(updateProductRequest());
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      dispatch(updateProductFail('Login First'));
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(`${BACKEND_URL}/api/v1/admin/product/status/${id}`, config);
    dispatch(updateStatusSuccess(data.success))
    return data.success;

  } catch (error) {
    dispatch(updateProductFail(error.response.data.message))
    throw error.response.data.message;
  }
}
);

export const updateProductStocks = createAsyncThunk('product/updateProductStocks', async (updatedStocks, { dispatch }) => {
  try {
    dispatch(updateProductRequest());
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      dispatch(updateProductFail('Login First'));
    }
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.patch(`${BACKEND_URL}/api/v1/admin/product/update-stocks`, updatedStocks, config);
    dispatch(updateProductSuccess(data.success))
    return data.success;

  } catch (error) {
    dispatch(updateProductFail(error.response.data.message))
    throw error.response.data.message;
  }
}
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    updateProductRequest: (state) => {
      state.loading = true;
    },
    updateProductSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    deleteProductSuccess: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    updateProductReset: (state) => {
      state.isUpdated = false;
      state.error = null;
      state.loading = false
    },
    deleteProductReset: (state) => {
      state.isDeleted = false;
      state.error = null;
    },
    deleteProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStatusSuccess: (state, action) => {
      state.loading = false;
      state.isStatusUpdated = true
    },
    updateStatusReset: (state) => {
      state.isStatusUpdated = false;
      state.error = null;
      state.loading = false
    },
    updateStatusFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    isChanged: (state) => {
      state.isEdited = true;
    },
    noChanges: (state) => {
      state.isEdited = false;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  updateProductRequest,
  updateProductSuccess,
  deleteProductSuccess,
  updateProductReset,
  deleteProductReset,
  deleteProductFail,
  updateProductFail,
  updateStatusSuccess,
  updateStatusReset,
  clearErrors,
  isChanged,
  noChanges
} = productSlice.actions;

export default productSlice.reducer;

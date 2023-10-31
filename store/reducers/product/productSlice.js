import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../../../constants/constants';


const initialState = {
  loading: false,
  isUpdated: false,
  isDeleted: false,
  error: null,
};


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

    dispatch(updateProductRequest())
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
    const { data } = await axios.put(`${BACKEND_URL}/api/v1/admin/product/${id}`, productData, config);
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
  clearErrors,
} = productSlice.actions;

export default productSlice.reducer;

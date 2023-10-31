import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../../../constants/constants';

const initialState = {
  product: {},
  loading: false,
  error: null,
};

export const getProductDetails = createAsyncThunk('productDetails/getProductDetails', async (id, { dispatch }) => {
  try {
    dispatch(productDetailsRequest());
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      dispatch(productDetailsFail('Login First'));
    }
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${token}`
        
      },
    };
    const { data } = await axios.get(`${BACKEND_URL}/api/v1/admin/product/${id}`, config);

    dispatch(productDetailsSuccess(data.product));
    return data.product;
  } catch (error) {
    dispatch(productDetailsFail(error.response.data.message))
    throw error.response.data.message;
  }
}
);

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {
    productDetailsRequest: (state) => {
      state.loading = true;
    },
    productDetailsSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    productDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    productUpdated: (state) => {
      state.error = null;
      state.product = {};
    },
  },
});

export const {
  productDetailsRequest,
  productDetailsSuccess,
  productDetailsFail,
  clearErrors,
  productUpdated
} = productDetailsSlice.actions;

export default productDetailsSlice.reducer;

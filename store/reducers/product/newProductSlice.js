import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../../../constants/constants';

const initialState = {
  loading: false,
  success: false,
  error: null,
  products: [], // Initialize products with your desired initial value
};

export const newProduct = createAsyncThunk('newProduct/newProduct', async (productData, { dispatch }) => {
  
    try {
      dispatch(newProductRequest())
      const token = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');
      const userCreds = JSON.parse(user);
      const storeId = userCreds?.store?.storeId;
      const storeName = userCreds?.store?.name;
      productData.append("storeId", storeId);
      productData.append("storeName", storeName);

      if(!storeId || !storeName){
        dispatch(newProductFail('Login First'));
      }
      
      if (!token) {
        dispatch(newProductFail('Login First'));
      }
      const config = {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      
      const { data } = await axios.post(`${BACKEND_URL}/api/v1/admin/product/new`, productData, config);
       dispatch(newProductSuccess(data.success))
      return data;
    } catch (error) 
    {
       dispatch(newProductFail(error.response.data.message));
      throw error.response.data.message;
    }
  });

const newProductSlice = createSlice({
  name: 'newProduct',
  initialState,
  reducers: {
    updateField: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
    newProductRequest: (state) => {
      state.loading = true;
    },
    newProductSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.products = action.payload.product;
    },
    newProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    newProductReset: (state) => {
      state.success = false;
      state.error = null;
    },
    clearErrors: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(newProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(newProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.products = action.payload.product;
      })
      .addCase(newProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  updateField,
  newProductRequest,
  newProductSuccess,
  newProductFail,
  newProductReset,
} = newProductSlice.actions;

export default newProductSlice.reducer;

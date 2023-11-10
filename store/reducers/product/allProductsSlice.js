import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../../../shared/constants';


const initialState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchAllProducts = createAsyncThunk('allProducts/fetchAllProducts', async (_, { dispatch }) => {
    try {
      dispatch(allProductsRequest());
      const token = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');
      const userCreds = JSON.parse(user);
      // console.log(userCreds)
      const storeId = userCreds.store.storeId;

      if(!storeId){
        dispatch(allProductsFail('Login First'));
      }
      if (!token) {
        dispatch(allProductsFail('Login First'));
      }
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };
      const { data } = await axios.get(`${BACKEND_URL}/api/v1/admin/store/${storeId}/products`,config);
    //   console.log(data.products);
      dispatch(allProductsSuccess(data.products));
      return data.products;
    } catch (error) {
      dispatch(allProductsFail(error.response.data.message))
      throw error.response.data.message;
    }
  });

const allProductsSlice = createSlice({
  name: 'allProducts',
  initialState,
  reducers: {
    allProductsRequest: (state) => {
      state.loading = true;
    },
    allProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    allProductsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    clearProducts: (state) => {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  allProductsRequest,
  allProductsSuccess,
  allProductsFail,
  clearErrors,
  clearProducts
} = allProductsSlice.actions;

export default allProductsSlice.reducer;

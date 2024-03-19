import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { BACKEND_URL } from '../../../shared/constants';


const initialState = {
  cartItems: [],
  success: false,
  loading: false,
  error: null,
};



export const inventoryCheckout = createAsyncThunk('cart/inventoryCheckout', async ({ cartItems, totalPrice }, { dispatch }) => {
  try {

    dispatch(checkoutRequest());
    const token = await AsyncStorage.getItem('token');

    if (!token) {
        dispatch(newProductFail('Login First'));
      }
    const formattedCartItems = cartItems.map(product => ({
        _id: product._id,
        name: product.name,
        price: product.sellPrice,
        image: product.images?.[0]?.url,
        storeId: product?.store?.storeId,
        storeName: product.store?.name,
        quantity: product.quantity, 
    }));

    const order = {
        orderItems: formattedCartItems, 
        totalPrice: totalPrice,
    };
  
    const config = {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(`${BACKEND_URL}/api/v1/order/new-inventory-order`, order, { config });
    dispatch(checkoutSuccess(data.success));
    return data;
  } catch (error) {
    throw error.response.data.message;
  }
}
);



const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        checkoutRequest: (state) => {
            state.loading = true;
        },
        checkoutSuccess: (state, action) => {
            state.success = action.payload;
            state.loading = false;
        },
        checkoutFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        checkoutReset: (state) => {
            state.success = false;
            state.error = null;
        },
        clearErrors: (state) => {
            state.success = false;
            state.error = null;
        },
    },
});

export const { checkoutRequest, checkoutSuccess, checkoutFail, checkoutReset, clearErrors } = inventorySlice.actions;

export default inventorySlice.reducer;

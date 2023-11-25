import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';4
import { useNavigation } from '@react-navigation/native';
import { BACKEND_URL } from '../../../shared/constants';


const initialState = {
  cartItems: [],
  receipt: [],
  success: false,
  loading: false,
};

export const addItemToCart = createAsyncThunk('cart/addItemToCart', async ({ id, quantity }, { dispatch }) => {
  try {
    const { data } = await axios.get(`${BACKEND_URL}/api/v1/product/${id}`);
    const cartItem = {
      id: data.product._id,
      name: data.product.name,
      price: data.product.sellPrice,
      image: data.product.images[0].url,
      storeId: data.product.store.storeId,
      storeName: data.product.store.name,
      quantity,
    };
    dispatch(addToCart(cartItem));
    return cartItem;
  } catch (error) {
    throw error.response.message;
  }
}
);

export const checkoutCart = createAsyncThunk('cart/createOrder', async ({ cartItems, totalPrice }, { dispatch }) => {
  try {
    dispatch(checkoutRequest());
    const token = await AsyncStorage.getItem('token');
    const user = await AsyncStorage.getItem('user');
    const userCreds = JSON.parse(user);
    const userId = userCreds?._id;
    const userName = `${userCreds?.fname} ${userCreds?.lname}`;
  
    const order = {
      orderItems: cartItems,
      user: {
        id: userId,
        name: userName
      },
      totalPrice
    }
    if (!token) {
      dispatch(newProductFail('Login First'));
    }
    const config = {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(`${BACKEND_URL}/api/v1/order/new`, order, { config });
    dispatch(showReceipt(data.order));
    dispatch(checkoutSuccess(data.success));
    dispatch(clearCart());
    return data;
  } catch (error) {
    throw error.response.data.message;
  }
}
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItemFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cartItems.find((i) => i.id === item.id);

      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) => (i.id === isItemExist.id ? { ...i, quantity: i.quantity + 1 } : i));
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    },
    increaseItemQuantity: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
    },
    decreaseItemQuantity: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity - 1, 0) } // Ensure quantity is at least 0
          : item
      ).filter((item) => item.quantity > 0);
    },
    checkoutRequest: (state) => {
      state.loading = true;
    },
    checkoutSuccess: (state, action) => {
      state.success = action.payload
      state.loading = false;
    },
    showReceipt: (state, action) => {
      state.receipt = action.payload
    },
  },
});

export const { clearCart, saveShippingInfo, removeItemFromCart, addToCart, increaseItemQuantity,
  decreaseItemQuantity, checkoutRequest, checkoutSuccess, showReceipt } = cartSlice.actions;

export default cartSlice.reducer;

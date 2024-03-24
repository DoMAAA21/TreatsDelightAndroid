import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; 4
import { useNavigation } from '@react-navigation/native';
import { BACKEND_URL } from '../../../shared/constants';


const initialState = {
  cartItems: [],
  receipt: [],
  success: false,
  addToCartSuccess: false,
  loading: false,
  qrCode: null,
  error: null,
};

export const addItemToCart = createAsyncThunk('cart/addItemToCart', async ({ id, quantity }, { dispatch }) => {
  try {
    const { data } = await axios.get(`${BACKEND_URL}/api/v1/product/${id}`);
    const cartItem = {
      _id: data.product._id,
      name: data.product.name,
      price: data.product.sellPrice,
      image: data.product.images[0].url,
      storeId: data.product.store.storeId,
      storeName: data.product.store.name,
      category: data.product.category,
      stock: data.product.stock,
      quantity,
    };
    dispatch(addToCart(cartItem));
    return cartItem;
  } catch (error) {
    throw error.response.message;
  }
}
);

export const checkoutCart = createAsyncThunk(
  'cart/createOrder',
  async ({ cartItems, totalPrice, isReserve }, { dispatch }) => {
    try {
      dispatch(checkoutRequest());
      const user = await AsyncStorage.getItem('user');
      const userCreds = JSON.parse(user);
      const userId = userCreds?._id;
      const userName = `${userCreds?.fname} ${userCreds?.lname}`;
      const order = {
        orderItems: cartItems,
        user: {
          id: userId,
          name: userName,
        },
        totalPrice,
        isReserve,
      };
      const { data } = await axios.post(`${BACKEND_URL}/api/v1/order/new`, order);
      console.log(data);
      dispatch(showReceipt(data.order));
      dispatch(checkoutSuccess(data.success));
      dispatch(setQrCode(data.qrCodeURL));
      dispatch(clearCart());
      return data;
    } catch (error) {
      throw error.response.data.message;
    }
  },
  {
    // Configure retry behavior
    retries: 3, // Number of retries
    retryDelay: 1000, // Delay between retries in milliseconds
    // Optionally, you can provide a condition for retries:
    // retryCondition: (error, retries) => retries < 3 && error.response.status === 500,
  }
);

export const kioskCheckout = createAsyncThunk('cart/kioskCheckout', async ({ cartItems, totalPrice }, { dispatch }) => {
  try {
    dispatch(checkoutRequest());
    const order = {
      orderItems: cartItems,
      totalPrice
    }
    dispatch(showReceipt(order));
    dispatch(checkoutSuccess(true));
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
      state.cartItems = state.cartItems.filter((i) => i._id !== action.payload);
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cartItems.find((i) => i._id === item._id);
      if (isItemExist) {
        const totalQuantity = isItemExist.quantity + item.quantity;
        if (item.category.toLowerCase() !== "meals") {
          if (totalQuantity <= item.stock) {
            state.cartItems = state.cartItems.map((i) => (i._id === isItemExist._id ? { ...i, quantity: totalQuantity } : i));
            state.addToCartSuccess = true;
          } else {
            state.error = "Cannot add more quantity. Insufficient stock.";
            return;
          }
        } else {
          state.cartItems = state.cartItems.map((i) => (i._id === isItemExist._id ? { ...i, quantity: totalQuantity } : i));
          state.addToCartSuccess = true;
        }
      } else {
        state.cartItems = [...state.cartItems, item];
        state.addToCartSuccess = true;
      }
    },
    increaseItemQuantity: (state, action) => {
      const id = action.payload;
      const itemToUpdate = state.cartItems.find((item) => item._id === id);
      if (itemToUpdate) {
        if (itemToUpdate.category.toLowerCase() !== "meals" && itemToUpdate.quantity + 1 <= itemToUpdate.stock) {
          state.cartItems = state.cartItems.map((item) =>
            item._id === id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else if (itemToUpdate.category.toLowerCase() === "meals") {
          state.cartItems = state.cartItems.map((item) =>
            item._id === id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          state.error = "Cannot increase quantity. Insufficient stock.";
        }
      }
    },
    decreaseItemQuantity: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems
        .map((item) =>
          item._id === id ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
        )
        .filter((item) => item.quantity > 0);
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
    resetAddToCartSuccess: (state) => {
      state.addToCartSuccess = false;
    },
    resetCheckOut: (state) =>{
      state.success = false;
    },
    clearError: (state) => {
      state.error = false;
    },
    setQrCode: (state, action) => {
      state.qrCode = action.payload
    },
  },
});

export const { clearCart, saveShippingInfo, removeItemFromCart, addToCart, resetAddToCartSuccess, clearError, increaseItemQuantity,
  decreaseItemQuantity, checkoutRequest, checkoutSuccess, setQrCode, showReceipt, resetCheckOut } = cartSlice.actions;

export default cartSlice.reducer;

import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_URL } from '../../../shared/constants';


const initialState = { 
     cartItems: [],
     shippingInfo: {} 
};

export const addItemToCart = createAsyncThunk('cart/addItemToCart',async ({ id, quantity }, { dispatch }) => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/v1/product/${id}`);
      const cartItem = {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
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



const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
    },
    removeItemFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.product !== action.payload);
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cartItems.find((i) => i.product === item.product);

      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) => (i.product === isItemExist.product ? item : i));
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    },
  },
});

export const { clearCart, saveShippingInfo, removeItemFromCart, addToCart } = cartSlice.actions;
export default cartSlice.reducer;

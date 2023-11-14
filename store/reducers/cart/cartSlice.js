import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
     cartItems: [],
     shippingInfo: {} 
};



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

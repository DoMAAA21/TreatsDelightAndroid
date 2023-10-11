import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_URL } from '../../../constants/constants';

const initialState = {
  store: {},
  loading: false,
  error: null,
};

export const getStoreDetails = createAsyncThunk('storeDetails/getStoreDetails',async (id, { dispatch }) => {
      try {
        dispatch(storeDetailsRequest()); 
        const { data } = await axios.get(`${BACKEND_URL}/api/v1/admin/store/${id}`,);
  
        dispatch(storeDetailsSuccess(data.store));
        return data.store;
      } catch (error) {
        dispatch(storeDetailsFail(error.response.data.message))
        throw error.response.data.message;
      }
    }
  );

const storeDetailsSlice = createSlice({
  name: 'storeDetails',
  initialState,
  reducers: {
    storeDetailsRequest: (state) => {
      state.loading = true;
    },
    storeDetailsSuccess: (state, action) => {
      state.loading = false;
      state.store = action.payload;
    },
    storeDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    storeUpdated: (state) => {
      state.error = null;
      state.store = {};
    },
  },
});

export const {
  storeDetailsRequest,
  storeDetailsSuccess,
  storeDetailsFail,
  clearErrors,
  storeUpdated
} = storeDetailsSlice.actions;

export default storeDetailsSlice.reducer;

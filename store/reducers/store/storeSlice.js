import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_URL } from '../../../constants/constants';

const initialState = {
  loading: false,
  isUpdated: false,
  isDeleted: false,
  error: null,
};


export const deleteStore = createAsyncThunk('store/deleteStore',async (id,{dispatch}) => {
      try {
        const { data } = await axios.delete(`${BACKEND_URL}/api/v1/admin/store/${id}`, { withCredentials: true });
        dispatch(deleteStoreSuccess( data.success))
        return data.success;

      } catch (error) {
        dispatch(deleteStore( error.response.data.message))
        throw error.response.data.message;
      }
    }
);

export const updateStore = createAsyncThunk('store/updateStore',async ({id,storeData},{dispatch}) => {
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          };
      const { data } = await axios.put(`${BACKEND_URL}/api/v1/admin/store/${id}`, storeData ,config);
      dispatch(updateStoreSuccess(data.success))
      return data.success;

    } catch (error) {
      dispatch(updateStoreFail(error.response.data.message))
      throw error.response.data.message;
    }
  }
);


  

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    updateStoreRequest: (state) => {
      state.loading = true;
    },
    updateStoreSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    deleteStoreSuccess: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    updateStoreReset: (state) => {
      state.isUpdated = false;
      state.error = null;
    },
    deleteStoreReset: (state) => {
      state.isDeleted = false;
    },
    updateStoreFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  updateStoreRequest,
  updateStoreSuccess,
  deleteStoreSuccess,
  updateStoreReset,
  deleteStoreReset,
  updateStoreFail,
  clearErrors,
} = storeSlice.actions;

export default storeSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_URL } from '../../../constants/constants';

const initialState = {
  loading: false,
  isUpdated: false,
  isDeleted: false,
  error: null,
};


export const deleteUser = createAsyncThunk('user/deleteUser', async (id, thunkAPI) => {
  try {
    const { data } = await axios.delete(`${BACKEND_URL}/api/v1/admin/user/${id}`);
    thunkAPI.dispatch(deleteUserSuccess(data.success));
    return data.success;
  } catch (error) {
    throw error.response.data.message;
  }
});


export const updateUser = createAsyncThunk('user/updateUser', async (payload, {dispatch}) => {
  const { id, userData } = payload;
  try {

    dispatch(updateUserRequest())
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.put(`${BACKEND_URL}/api/v1/admin/user/${id}`, userData, config);

    dispatch(updateUserSuccess(data.success));
  
    return data.success;
  } catch (error) {
    dispatch(updateUserFail(error.response.data.message));
    throw error.response.data.message;
  }
});


  

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserRequest: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    updateUserReset: (state) => {
      state.isUpdated = false;
      state.error = null;
    },
    deleteUserReset: (state) => {
      state.isDeleted = false;
    },
    updateUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  updateUserRequest,
  updateUserSuccess,
  deleteUserSuccess,
  updateUserReset,
  deleteUserReset,
  updateUserFail,
  clearErrors,
} = userSlice.actions;

export default userSlice.reducer;

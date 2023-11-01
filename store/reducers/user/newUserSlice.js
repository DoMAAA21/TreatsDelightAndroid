import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../../../shared/constants';

const initialState = {
  loading: false,
  success: false,
  error: null,
  users: [], 
};

export const newUser = createAsyncThunk('newUser/newUser', async (userData, { dispatch }) => {
  try {
    dispatch(newUserRequest());

    const token = await AsyncStorage.getItem('token');
    if (!token) {
      dispatch(newUserFail('Login First'));
      throw error.response.data.message;
    }
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.post(`${BACKEND_URL}/api/v1/admin/user/new`, userData, config);
    dispatch(newUserSuccess(data));
    return data;
  } catch (error) {
    dispatch(newUserFail(error.response.data.message))
    throw error.response.data.message;
  }
});


const newUserSlice = createSlice({
  name: 'newUser',
  initialState,
  reducers: {
    updateField: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
    newUserRequest: (state) => {
      state.loading = true;
    },
    newUserSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.users = action.payload.user;
    },
    newUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    newUserReset: (state) => {
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
      .addCase(newUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(newUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.users = action.payload.product;
      })
      .addCase(newUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  updateField,
  newUserRequest,
  newUserSuccess,
  newUserFail,
  newUserReset,
} = newUserSlice.actions;

export default newUserSlice.reducer;

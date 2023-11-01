import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../../../shared/constants';

const initialState = {
  user: {},
  loading: false,
  error: null,
};

export const getUserDetails = createAsyncThunk('userDetails/getUserDetails', async (id, { dispatch }) => {
  try {
    dispatch(userDetailsRequest()); 
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      dispatch(userDetailsFail('Login First'));
      throw error.response.data.message;
    }
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.get(
      `${BACKEND_URL}/api/v1/admin/user/${id}`,config);

    dispatch(userDetailsSuccess(data.user));
    return data.user;
  } catch (error) {
    dispatch(userDetailsFail(error.response.data.message))
    throw error.response.data.message;
  }
}
);

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    userDetailsRequest: (state) => {
      state.loading = true;
    },
    userDetailsSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    userDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    userUpdated: (state) => {
      state.error = null;
      state.user = {};
    },
  },
});

export const {
  userDetailsRequest,
  userDetailsSuccess,
  userDetailsFail,
  clearErrors,
  userUpdated
} = userDetailsSlice.actions;

export default userDetailsSlice.reducer;

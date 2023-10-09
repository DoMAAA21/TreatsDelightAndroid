import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {BACKEND_URL} from '../../../constants/constants'



const initialState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchAllUsers = createAsyncThunk('allUsers/fetchAllUsers',async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/v1/admin/users`);
      thunkAPI.dispatch(allUsersSuccess(data.users));
      return data.users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error.response.data.message; 
    }
  }
);

const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState,
  reducers: {
    allUsersRequest: (state) => {
      state.loading = true;
    },
    allUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    allUsersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  allUsersRequest,
  allUsersSuccess,
  allUsersFail,
  clearErrors,
} = allUsersSlice.actions;

export default allUsersSlice.reducer;

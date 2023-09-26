import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {REACT_APP_API} from "@env"
const initialState = {
  loading: false,
  isUpdated: false,
  isDeleted: false,
  error: null,
};


export const deleteUser = createAsyncThunk('user/deleteUser', async (id, thunkAPI) => {
  try {
    const { data } = await axios.delete(`${REACT_APP_API}/api/v1/admin/user/${id}`, { withCredentials: true });
    // console.log(data);
    thunkAPI.dispatch(deleteUserSuccess(data.success));
    return data.success;
  } catch (error) {
    throw error.response.data.message;
  }
});


export const updateUser = createAsyncThunk('user/updateUser',async ({id,userData},{dispatch,rejectWithValue}) => {

  console.log(userData)


    try {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          };
      const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/admin/user/${id}`, userData,{ withCredentials: true },config);
      dispatch(updateUserSuccess( data.success))
      return data.success;

    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);


  

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

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../../../constants/constants';


const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  role: null,
};

export const login = createAsyncThunk('auth/login', async ({ email, password }, { dispatch }) => {
  try {
    dispatch(loginRequest());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    const { data } = await axios.post(`${BACKEND_URL}/api/v1/login`, { email, password }, config);

    // await AsyncStorage.setItem('user', JSON.stringify(data.user));
    // await AsyncStorage.setItem('role', data.user.role);

    dispatch(loginSuccess(data.user));
    return data.user;
  } catch (error) {
    dispatch(loginFail(error.response.data.message));
    throw error.response.data.message;
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, {  dispatch }) => {
  try {
    const { data } = await axios.get(`${BACKEND_URL}/api/v1/logout`, { withCredentials: true });

    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('role');

    return dispatch(logoutSuccess(data.success));
  } catch (error) {
    dispatch(logoutFail(error.response.data.message));
    throw error.response.data.message;
  }
});


// export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue, dispatch }) => {
//   try {
//     dispatch(registerUserRequest())
//     const config = {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//       withCredentials: true,
//     };
//     const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/register`, userData, { withCredentials: true }, config);
//     const data = response.data;
//     localStorage.setItem('user', JSON.stringify(data.user));
//     dispatch(registerUserSuccess(data.user))
//     return data.user;
//   } catch (error) {
//     dispatch(registerUserFail(error.response.data.message))
//     return rejectWithValue(error.response.data.message);
//   }
// }
// );




const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFail(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.isEmployee = false;
      state.error = action.payload;
    },
    googleLoginRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
    },
    googleLoginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    googleLoginFail(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    registerUserRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
    },
    registerUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    registerUserFail(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    loadUserRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
    },
    loadUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loadUserFail(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    clearErrors(state) {
      state.error = null;
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.loading = false;
      state.isEmployee = false;
      state.user = null;
    },
    logoutFail(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFail,
  googleLoginRequest,
  googleLoginSuccess,
  googleLoginFail,
  registerUserRequest,
  registerUserSuccess,
  registerUserFail,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  clearErrors,
  logoutSuccess,
  logoutFail,
} = authSlice.actions;

export default authSlice.reducer;

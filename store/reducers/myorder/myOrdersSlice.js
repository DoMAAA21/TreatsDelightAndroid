import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../../../shared/constants'


const initialState = {
    orders: [],
    loading: false,
    error: null,
};

export const fetchAllMyOrders = createAsyncThunk('allOrders/fetchAllMyOrders', async (_, { dispatch }) => {
    try {
        dispatch(allMyOrdersRequest());
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
        const userCreds = JSON.parse(user);
        const userId = userCreds._id;
        if (!token) {
            dispatch(allMyOrdersFail('Login First'));
        }
        const config = {
            headers: {
                Authorization: `${token}`,
            },
        };
        const { data } = await axios.get(`${BACKEND_URL}/api/v1/user/${userId}/transactions`, config);
        
        dispatch(allMyOrdersSuccess(data.orders));
        return data.orders;
    } catch (error) {
        dispatch(allMyOrdersFail(error.response.data.message))
        throw error.response.data.message;
    }
}
);

const allMyOrdersSlice = createSlice({
    name: 'allMyOrders',
    initialState,
    reducers: {
        allMyOrdersRequest: (state) => {
            state.loading = true;
        },
        allMyOrdersSuccess: (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        },
        allMyOrdersFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
        clearOrder: (state) => {
            state.orders = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllMyOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllMyOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchAllMyOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    allMyOrdersRequest,
    allMyOrdersSuccess,
    allMyOrdersFail,
    clearErrors,
    clearOrder,
} = allMyOrdersSlice.actions;

export default allMyOrdersSlice.reducer;

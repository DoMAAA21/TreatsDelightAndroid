import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../../../shared/constants';

const initialState = {
    loading: false,
    success: false,
    error: null,
    scanOrders: [],
};


export const newScanOrder = createAsyncThunk('newScanOrder/newScanOrder', async (id, { dispatch }) => {
    try {
        dispatch(newScanOrderRequest());
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
        const userCreds = JSON.parse(user);
        const storeId = userCreds?.store?.storeId;

        if (!token) {
            dispatch(newScanOrderFail('Login First'));
            throw error.response.data.message;
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`,
            },
        };
        const { data } = await axios.patch(`${BACKEND_URL}/api/v1/admin/transaction/scan-update`, { id, storeId }, config);
        dispatch(newScanOrderSuccess(data));
        return data;
    } catch (error) {
        dispatch(newScanOrderFail(error.response.data.message))
        throw error.response.data.message;
    }
});


const newScanOrderSlice = createSlice({
    name: 'newScanOrder',
    initialState,
    reducers: {
        updateField: (state, action) => {
            state[action.payload.name] = action.payload.value;
        },
        newScanOrderRequest: (state) => {
            state.loading = true;
        },
        newScanOrderSuccess: (state, action) => {
            state.loading = false;
            state.success = action.payload.success;
            state.scanOrders = action.payload.order;
        },
        newScanOrderFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        newScanOrderReset: (state) => {
            state.success = false;
            state.error = null;
        },
        clearErrors: (state) => {
            state.success = false;
            state.error = null;
        },
    }
});

export const {
    updateField,
    newScanOrderRequest,
    newScanOrderSuccess,
    newScanOrderFail,
    newScanOrderReset,
    clearErrors
} = newScanOrderSlice.actions;

export default newScanOrderSlice.reducer;

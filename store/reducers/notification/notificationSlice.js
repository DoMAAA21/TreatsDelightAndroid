import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../../../shared/constants';

const initialState = {
    loading: false,
    isUpdated: false,
    error: null,
};

export const updateNotification = createAsyncThunk('notification/updateNotification', async (id, { dispatch }) => {
    try {
        dispatch(updateNotificationRequest())
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            dispatch(updateNotificationFail('Login First'));
            throw error.response.data.message;
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`,
            },
        };
        const { data } = await axios.put(`${BACKEND_URL}/api/v1/notification/read/`, { id }, config);
        dispatch(updateNotificationSuccess(data.success));

        return data.success;
    } catch (error) {
        dispatch(updateNotificationFail(error.response.data.message));
        throw error.response.data.message;
    }
});




const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        updateNotificationRequest: (state) => {
            state.loading = true;
        },
        updateNotificationSuccess: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        },
        updateNotificationReset: (state) => {
            state.isUpdated = false;
            state.error = null;
        },
        updateNotificationFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    updateNotificationRequest,
    updateNotificationSuccess,
    updateNotificationReset,
    updateNotificationFail,
    clearErrors,
} = notificationSlice.actions;

export default notificationSlice.reducer;

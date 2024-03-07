import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../../../shared/constants';

const initialState = {
    loading: false,
    success: false,
    error: null,
    maintenances: [],
};


export const newMaintenance = createAsyncThunk('newMaintenance/newMaintenance', async (maintenanceData, { dispatch }) => {
    try {
        dispatch(newMaintenanceRequest())
        const token = await AsyncStorage.getItem('token');

        if (!token) {
            dispatch(newMaintenanceFail('Login First'));
        }
        const config = {
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(`${BACKEND_URL}/api/v1/admin/maintenance/new`, maintenanceData, config);
        dispatch(newMaintenanceSuccess(data))
        return data;
    } catch (error) {
        dispatch(newMaintenanceFail(error.response.data.message));
        throw error.response.data.message;
    }
});

const newMaintenanceSlice = createSlice({
    name: 'newMaintenance',
    initialState,
    reducers: {
        newMaintenanceRequest: (state) => {
            state.loading = true;
        },
        newMaintenanceSuccess: (state, action) => {
            state.loading = false;
            state.success = action.payload.success;
            state.maintenances = action.payload.maintenance;
        },
        newMaintenanceFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        newMaintenanceReset: (state) => {
            state.success = false;
            state.error = null;
        },
        clearErrors: (state) => {
            state.success = false;
            state.error = null;
        },
    },
});

export const {
    newMaintenanceRequest,
    newMaintenanceSuccess,
    newMaintenanceFail,
    newMaintenanceReset,
} = newMaintenanceSlice.actions;

export default newMaintenanceSlice.reducer;

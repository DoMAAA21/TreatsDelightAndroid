import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../../../shared/constants';

const initialState = {
    loading: false,
    isDeleted: false,
    isRestored: false,
    error: null,
};

export const deleteMaintenance = createAsyncThunk('maintenance/deleteMaintenance', async (id, { dispatch }) => {
    try {
        const token = await AsyncStorage.getItem('token');

        if (!token) {
            dispatch(deleteMaintenanceReset());
        }
        const config = {
            headers: {
                Authorization: `${token}`,
            },
        };
        const { data } = await axios.delete(`${BACKEND_URL}/api/v1/admin/maintenance/${id}`, config);
        dispatch(deleteMaintenanceSuccess(data.success))
        return data.success;

    } catch (error) {
        dispatch(deleteMaintenanceFail(error.response.data.message))
        throw error.response.data.message;
    }
}
);

export const restoreMaintenance = createAsyncThunk('maintenance/restoreMaintenance', async (id, { dispatch }) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            dispatch(restoreMaintenanceReset());
        }
        const config = {
            headers: {
                Authorization: `${token}`,
            },
        };
        const { data } = await axios.put(`${BACKEND_URL}/api/v1/admin/maintenance/restore`, { id }, config);
        dispatch(restoreMaintenanceSuccess(data.success))
        return data.success;

    } catch (error) {
        dispatch(restoreMaintenanceFail(error.response.data.message))
        throw error.response.data.message;
    }
}
);


const maintenanceSlice = createSlice({
    name: 'maintenance',
    initialState,
    reducers: {
        deleteMaintenanceSuccess: (state, action) => {
            state.loading = false;
            state.isDeleted = action.payload;
        },
        deleteMaintenanceReset: (state) => {
            state.isDeleted = false;
            state.error = null;
        },
        deleteMaintenanceFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        restoreMaintenanceSuccess: (state, action) => {
            state.loading = false;
            state.isRestored = action.payload;
        },
        restoreMaintenanceReset: (state) => {
            state.isRestored = false;
            state.error = null;
        },
        restoreMaintenanceFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    deleteMaintenanceSuccess,
    deleteMaintenanceReset,
    deleteMaintenanceFail,
    restoreMaintenanceSuccess,
    restoreMaintenanceReset,
    restoreMaintenanceFail,
    clearErrors,
} = maintenanceSlice.actions;

export default maintenanceSlice.reducer;

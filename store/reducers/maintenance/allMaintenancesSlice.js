import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../../../shared/constants';


const initialState = {
    maintenances: [],
    loading: false,
    error: null,
};

export const fetchAllMaintenances = createAsyncThunk('allMaintenances/fetchAllMaintenances', async (id, { dispatch }) => {
    try {
        dispatch(allMaintenancesRequest());
        const token = await AsyncStorage.getItem('token');

        if (!token) {
            dispatch(allMaintenancesFail('Login First'));
        }
        const config = {
            headers: {
                Authorization: `${token}`,
            },
        };
        const { data } = await axios.get(`${BACKEND_URL}/api/v1/admin/maintenance/store/${id}`, config);
        dispatch(allMaintenancesSuccess(data.maintenances));
        return data.maintenances;
    } catch (error) {
        dispatch(allMaintenancesFail(error.response.data.message))
        throw error.response.data.message;
    }
});

export const fetchArchivedMaintenances = createAsyncThunk('allMaintenances/fetchArchivedMaintenances', async (id, { dispatch }) => {
    
    try {
        dispatch(allMaintenancesRequest());
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            dispatch(allMaintenancesFail('Login First'));
        }
        const config = {
            headers: {
                Authorization: `${token}`,
            },
        };
     
        const { data } = await axios.get(`${BACKEND_URL}/api/v1/admin/maintenance/store/${id}/archived`, config);
        dispatch(allMaintenancesSuccess(data.maintenances));
        return data.maintenances;
    } catch (error) {
        dispatch(allMaintenancesFail(error.response.data.message))
        throw error.response.data.message;
    }
});

const allMaintenancesSlice = createSlice({
    name: 'allMaintenances',
    initialState,
    reducers: {
        allMaintenancesRequest: (state) => {
            state.loading = true;
        },
        allMaintenancesSuccess: (state, action) => {
            state.loading = false;
            state.maintenances = action.payload;
        },
        allMaintenancesFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
        clearMaintenances: (state) => {
            state.maintenances = [];
        },
    },
});

export const {
    allMaintenancesRequest,
    allMaintenancesSuccess,
    allMaintenancesFail,
    clearErrors,
    clearMaintenances
} = allMaintenancesSlice.actions;

export default allMaintenancesSlice.reducer;

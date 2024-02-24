import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../../../shared/constants';


const initialState = {
    electricity: [],
    loading: false,
    error: null,
};

export const fetchAllElectricity = createAsyncThunk('allElectricity/fetchAllElectricity', async (id, { dispatch }) => {
    try {
        dispatch(allElectricityRequest());
        const token = await AsyncStorage.getItem('token');

        if (!token) {
            dispatch(allElectricityFail('Login First'));
        }
        const config = {
            headers: {
                Authorization: `${token}`,
            },
        };
        const { data } = await axios.get(`${BACKEND_URL}/api/v1/admin/electricity/store/${id}`, config);

        dispatch(allElectricitySuccess(data.electricity));
        return data.electricity;
    } catch (error) {
        dispatch(allElectricityFail(error.response.data.message))
        throw error.response.data.message;
    }
});

export const fetchArchivedElectricity = createAsyncThunk('allElectricity/fetchArchivedElectricity', async (id, { dispatch }) => {

    try {
        dispatch(allElectricityRequest());
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            dispatch(allElectricityFail('Login First'));
        }
        const config = {
            headers: {
                Authorization: `${token}`,
            },
        };

        const { data } = await axios.get(`${BACKEND_URL}/api/v1/admin/electricity/store/${id}/archived`, config);
        dispatch(allElectricitySuccess(data.electricity));
        return data.electricity;
    } catch (error) {
        dispatch(allElectricityFail(error.response.data.message))
        throw error.response.data.message;
    }
});

const allElectricitySlice = createSlice({
    name: 'allElectricity',
    initialState,
    reducers: {
        allElectricityRequest: (state) => {
            state.loading = true;
        },
        allElectricitySuccess: (state, action) => {
            state.loading = false;
            state.electricity = action.payload;
        },
        allElectricityFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
        clearElectricity: (state) => {
            state.electricity = [];
        },
    },
});

export const {
    allElectricityRequest,
    allElectricitySuccess,
    allElectricityFail,
    clearErrors,
    clearElectricity
} = allElectricitySlice.actions;

export default allElectricitySlice.reducer;

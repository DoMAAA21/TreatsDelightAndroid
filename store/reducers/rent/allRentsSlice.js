import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../../../shared/constants';


const initialState = {
    rents: [],
    loading: false,
    error: null,
};

export const fetchAllRents = createAsyncThunk('allRents/fetchAllRents', async (id, { dispatch }) => {
    try {
        dispatch(allRentsRequest());
        const token = await AsyncStorage.getItem('token');

        if (!token) {
            dispatch(allRentsFail('Login First'));
        }
        const config = {
            headers: {
                Authorization: `${token}`,
            },
        };
        const { data } = await axios.get(`${BACKEND_URL}/api/v1/admin/rent/store/${id}`, config);
        dispatch(allRentsSuccess(data.rents));
        return data.rents;
    } catch (error) {
        dispatch(allRentsFail(error.response.data.message))
        throw error.response.data.message;
    }
});

export const fetchArchivedRents = createAsyncThunk('allRents/fetchArchivedRents', async (id, { dispatch }) => {
    
    try {
        dispatch(allRentsRequest());
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            dispatch(allRentsFail('Login First'));
        }
        const config = {
            headers: {
                Authorization: `${token}`,
            },
        };
     
        const { data } = await axios.get(`${BACKEND_URL}/api/v1/admin/rent/store/${id}/archived`, config);
        dispatch(allRentsSuccess(data.rents));
        return data.rents;
    } catch (error) {
        dispatch(allRentsFail(error.response.data.message))
        throw error.response.data.message;
    }
});

const allRentsSlice = createSlice({
    name: 'allRents',
    initialState,
    reducers: {
        allRentsRequest: (state) => {
            state.loading = true;
        },
        allRentsSuccess: (state, action) => {
            state.loading = false;
            state.rents = action.payload;
        },
        allRentsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
        clearRents: (state) => {
            state.rents = [];
        },
    },
});

export const {
    allRentsRequest,
    allRentsSuccess,
    allRentsFail,
    clearErrors,
    clearRents
} = allRentsSlice.actions;

export default allRentsSlice.reducer;

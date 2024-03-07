import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../../../shared/constants';


const initialState = {
    waters: [],
    loading: false,
    error: null,
};

export const fetchAllWaters = createAsyncThunk('allWaters/fetchAllWaters', async (id, { dispatch }) => {
    try {
        dispatch(allWatersRequest());
        const token = await AsyncStorage.getItem('token');

        if (!token) {
            dispatch(allWatersFail('Login First'));
        }
        const config = {
            headers: {
                Authorization: `${token}`,
            },
        };
        const { data } = await axios.get(`${BACKEND_URL}/api/v1/admin/water/store/${id}`, config);
        dispatch(allWatersSuccess(data.waters));
        return data.waters;
    } catch (error) {
        dispatch(allWatersFail(error.response.data.message))
        throw error.response.data.message;
    }
});

export const fetchArchivedWaters = createAsyncThunk('allWaters/fetchArchivedWaters', async (id, { dispatch }) => {
    
    try {
        dispatch(allWatersRequest());
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            dispatch(allWatersFail('Login First'));
        }
        const config = {
            headers: {
                Authorization: `${token}`,
            },
        };
     
        const { data } = await axios.get(`${BACKEND_URL}/api/v1/admin/water/store/${id}/archived`, config);
        dispatch(allWatersSuccess(data.waters));
        return data.waters;
    } catch (error) {
        dispatch(allWatersFail(error.response.data.message))
        throw error.response.data.message;
    }
});

const allWatersSlice = createSlice({
    name: 'allWaters',
    initialState,
    reducers: {
        allWatersRequest: (state) => {
            state.loading = true;
        },
        allWatersSuccess: (state, action) => {
            state.loading = false;
            state.waters = action.payload;
        },
        allWatersFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
        clearWaters: (state) => {
            state.waters = [];
        },
    },
});

export const {
    allWatersRequest,
    allWatersSuccess,
    allWatersFail,
    clearErrors,
    clearWaters
} = allWatersSlice.actions;

export default allWatersSlice.reducer;

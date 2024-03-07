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

export const deleteWater = createAsyncThunk('water/deleteWater', async (id, { dispatch }) => {
    try {
        const token = await AsyncStorage.getItem('token');

        if (!token) {
            dispatch(deleteWaterReset());
        }
        const config = {
            headers: {
                Authorization: `${token}`,
            },
        };
        const { data } = await axios.delete(`${BACKEND_URL}/api/v1/admin/water/${id}`, config);
        dispatch(deleteWaterSuccess(data.success))
        return data.success;

    } catch (error) {
        dispatch(deleteWaterFail(error.response.data.message))
        throw error.response.data.message;
    }
}
);

export const restoreWater = createAsyncThunk('water/restoreWater', async (id, { dispatch }) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            dispatch(restoreWaterReset());
        }
        const config = {
            headers: {
                Authorization: `${token}`,
            },
        };
        const { data } = await axios.put(`${BACKEND_URL}/api/v1/admin/water/restore`, { id }, config);
        dispatch(restoreWaterSuccess(data.success))
        return data.success;

    } catch (error) {
        dispatch(restoreWaterFail(error.response.data.message))
        throw error.response.data.message;
    }
}
);


const waterSlice = createSlice({
    name: 'water',
    initialState,
    reducers: {
        deleteWaterSuccess: (state, action) => {
            state.loading = false;
            state.isDeleted = action.payload;
        },
        deleteWaterReset: (state) => {
            state.isDeleted = false;
            state.error = null;
        },
        deleteWaterFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        restoreWaterSuccess: (state, action) => {
            state.loading = false;
            state.isRestored = action.payload;
        },
        restoreWaterReset: (state) => {
            state.isRestored = false;
            state.error = null;
        },
        restoreWaterFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    deleteWaterSuccess,
    deleteWaterReset,
    deleteWaterFail,
    restoreWaterSuccess,
    restoreWaterReset,
    restoreWaterFail,
    clearErrors,
} = waterSlice.actions;

export default waterSlice.reducer;

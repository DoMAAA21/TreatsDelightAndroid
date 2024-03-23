import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../../../shared/constants';


const initialState = {
    loading: false,
    isDeleted: false,
    isRestored: false,
    isUpdated: false,
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


export const updateWaterStatus = createAsyncThunk('water/updateWaterStatus', async ({id, storeId}, { dispatch }) => {
    try {
        const token = await AsyncStorage.getItem('token');
        

        if (!token) {
            dispatch(updateWaterReset());
        }
        const config = {
            headers: {
                Authorization: `${token}`,
            },
        };
        const { data } = await axios.patch(`${BACKEND_URL}/api/v1/admin/water/update-status`, { id, storeId }, config);
        dispatch(updateWaterSuccess(data.success))
        return data.success;

    } catch (error) {
        dispatch(updateWaterFail(error.response.data.message))
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
        updateWaterSuccess: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        },
        updateWaterReset: (state) => {
            state.isUpdated = false;
            state.error = null;
        },
        updateWaterFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateWaterReset: (state) => {
            state.isUpdated = false;
            state.error = null;
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
    updateWaterSuccess,
    updateWaterFail,
    updateWaterReset,
    clearErrors,
} = waterSlice.actions;

export default waterSlice.reducer;

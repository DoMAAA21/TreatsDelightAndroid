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

export const deleteRent = createAsyncThunk('rent/deleteRent', async (id, { dispatch }) => {
    try {
        const token = await AsyncStorage.getItem('token');

        if (!token) {
            dispatch(deleteRentReset());
        }
        const config = {
            headers: {
                Authorization: `${token}`,
            },
        };
        const { data } = await axios.delete(`${BACKEND_URL}/api/v1/admin/rent/${id}`, config);
        dispatch(deleteRentSuccess(data.success))
        return data.success;

    } catch (error) {
        dispatch(deleteRentFail(error.response.data.message))
        throw error.response.data.message;
    }
}
);

export const restoreRent = createAsyncThunk('rent/restoreRent', async (id, { dispatch }) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            dispatch(restoreRentReset());
        }
        const config = {
            headers: {
                Authorization: `${token}`,
            },
        };
        const { data } = await axios.put(`${BACKEND_URL}/api/v1/admin/rent/restore`, { id }, config);
        dispatch(restoreRentSuccess(data.success))
        return data.success;

    } catch (error) {
        dispatch(restoreRentFail(error.response.data.message))
        throw error.response.data.message;
    }
}
);

export const updateRentStatus = createAsyncThunk('rent/updateRentStatus', async ({id, storeId}, { dispatch }) => {
    try {
        const token = await AsyncStorage.getItem('token');
        

        if (!token) {
            dispatch(updateRentReset());
        }
        const config = {
            headers: {
                Authorization: `${token}`,
            },
        };
        const { data } = await axios.patch(`${BACKEND_URL}/api/v1/admin/rent/update-status`, { id, storeId }, config);
        dispatch(updateRentSuccess(data.success))
        return data.success;

    } catch (error) {
        dispatch(updateRentFail(error.response.data.message))
        throw error.response.data.message;
    }
}
);


const rentSlice = createSlice({
    name: 'rent',
    initialState,
    reducers: {
        deleteRentSuccess: (state, action) => {
            state.loading = false;
            state.isDeleted = action.payload;
        },
        deleteRentReset: (state) => {
            state.isDeleted = false;
            state.error = null;
        },
        deleteRentFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        restoreRentSuccess: (state, action) => {
            state.loading = false;
            state.isRestored = action.payload;
        },
        restoreRentReset: (state) => {
            state.isRestored = false;
            state.error = null;
        },
        restoreRentFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateRentSuccess: (state, action) => {
            state.loading = false;
            state.isUpdated = true;
        },
        updateRentReset: (state) => {
            state.isUpdated = false;
            state.error = null;
        },
        updateRentFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    deleteRentSuccess,
    deleteRentReset,
    deleteRentFail,
    restoreRentSuccess,
    restoreRentReset,
    restoreRentFail,
    updateRentSuccess,
    updateRentReset,
    updateRentFail,
    clearErrors,
} = rentSlice.actions;

export default rentSlice.reducer;

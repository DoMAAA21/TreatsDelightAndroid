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

export const deleteElectricity = createAsyncThunk('electricity/deleteElectricity', async (id, { dispatch }) => {
    try {
        const token = await AsyncStorage.getItem('token');

        if (!token) {
            dispatch(deleteElectricityReset());
        }
        const config = {
            headers: {
                Authorization: `${token}`,
            },
        };
        const { data } = await axios.delete(`${BACKEND_URL}/api/v1/admin/electricity/${id}`, config);
        dispatch(deleteElectricitySuccess(data.success))
        return data.success;

    } catch (error) {
        dispatch(deleteElectricityFail(error.response.data.message))
        throw error.response.data.message;
    }
}
);

export const restoreElectricity = createAsyncThunk('electricity/restoreElectricity', async (id, { dispatch }) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            dispatch(restoreElectricityReset());
        }
        const config = {
            headers: {
                Authorization: `${token}`,
            },
        };
        const { data } = await axios.put(`${BACKEND_URL}/api/v1/admin/electricity/restore`, { id }, config);
        dispatch(restoreElectricitySuccess(data.success))
        return data.success;

    } catch (error) {
        dispatch(restoreElectricityFail(error.response.data.message))
        throw error.response.data.message;
    }
}
);

export const updateElectricityStatus = createAsyncThunk('electricity/updateElectricityStatus', async ({id, storeId}, { dispatch }) => {
    try {
        const token = await AsyncStorage.getItem('token');
        

        if (!token) {
            dispatch(updateElectricityReset());
        }
        const config = {
            headers: {
                Authorization: `${token}`,
            },
        };
        console.log('asdas');
        const { data } = await axios.patch(`${BACKEND_URL}/api/v1/admin/electricity/update-status`, { id, storeId }, config);
        console.log(data);
        dispatch(updateElectricitySuccess(data.success))
        return data.success;

    } catch (error) {
        dispatch(updateElectricityFail(error.response.data.message))
        throw error.response.data.message;
    }
}
);


const electricitySlice = createSlice({
    name: 'electricity',
    initialState,
    reducers: {
        deleteElectricitySuccess: (state, action) => {
            state.loading = false;
            state.isDeleted = action.payload;
        },
        deleteElectricityReset: (state) => {
            state.isDeleted = false;
            state.error = null;
        },
        deleteElectricityFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        restoreElectricitySuccess: (state, action) => {
            state.loading = false;
            state.isRestored = action.payload;
        },
        restoreElectricityReset: (state) => {
            state.isRestored = false;
            state.error = null;
        },
        restoreElectricityFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateElectricitySuccess: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        },
        updateElectricityReset: (state) => {
            state.isUpdated = false;
            state.error = null;
        },
        updateElectricityFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    deleteElectricitySuccess,
    deleteElectricityReset,
    deleteElectricityFail,
    restoreElectricitySuccess,
    restoreElectricityReset,
    restoreElectricityFail,
    updateElectricitySuccess,
    updateElectricityReset,
    updateElectricityFail,
    clearErrors,
} = electricitySlice.actions;

export default electricitySlice.reducer;

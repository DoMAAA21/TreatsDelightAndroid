import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../../../shared/constants'

const initialState = {
    notifications: [],
    loading: false,
    unReadLoading: false,
    error: null,
    totalPages: 1,
    currentPage: 1,
    unRead: 0,
    hasMore: true
};

export const fetchAllNotifications = createAsyncThunk('allNotifications/fetchAllNotifications', async ({ page }, { dispatch }) => {
    try {
        dispatch(allNotificationsRequest());
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
        const userCreds = JSON.parse(user);
        const userId = userCreds._id;

        if (!token) {
            dispatch(allNotificationsFail('Login First'));
        }
        const config = {
            headers: {
                Authorization: `${token}`,
            },
        };
        const { data } = await axios.get(`${BACKEND_URL}/api/v1/notification/user/${userId}?page=${page}`, config);
        dispatch(allNotificationsSuccess(data));
        return data;
    } catch (error) {
        dispatch(allNotificationsFail(error.response.data.message))
        throw error.response.data.message;
    }
}
);

const allNotificationsSlice = createSlice({
    name: 'allNotifications',
    initialState,
    reducers: {
        allNotificationsRequest: (state) => {
            state.loading = true;
        },

        allNotificationsSuccess: (state, action) => {
            state.loading = false;
            state.notifications = action.payload.notifications;
            state.unRead = action.payload.totalUnreadNotifications;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
            state.hasMore = action.payload.hasMore
        },
        allNotificationsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        concatNotifications: (state, action) => {
            state.notifications = state.notifications.concat(action.payload.notifications);
            state.hasMore = action.payload.hasMore;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
            state.loading = false;
        },
        prependNotifications: (state, action) => {
            state.notifications = state.notifications.concat(action.payload.notifications);
            state.hasMore = action.payload.hasMore;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
            state.loading = false;
        },
        allUnreadNotificationsRequest: (state) => {
            state.unReadLoading = true;
        },

        allUnreadNotificationsSuccess: (state, action) => {
            state.unRead = action.payload;
        },
        allUnreadNotificationsFail: (state, action) => {
            state.unReadLoading = false;
            state.error = action.payload;
        },
        clearNotifications: (state) => {
            state.notifications = [];
            state.unRead = 0;
            state.totalPages = 1;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },

});
export const {
    allNotificationsRequest,
    allNotificationsSuccess,
    allNotificationsFail,
    concatNotifications,
    allUnreadNotificationsRequest,
    allUnreadNotificationsSuccess,
    allUnreadNotificationsFail,
    clearNotifications,
    prependNotifications,
    clearErrors,
} = allNotificationsSlice.actions;

export default allNotificationsSlice.reducer;

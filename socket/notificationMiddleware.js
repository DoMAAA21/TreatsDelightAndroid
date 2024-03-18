import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchAllUnreadNotifications, fetchAllNotifications } from "../store/reducers/notification/allNotificationSlice";
import io from "socket.io-client";
import { BACKEND_URL } from "../shared/constants";
import { topNotificationMsg } from "../shared/toast";
import { useDispatch } from "react-redux";
import { Audio } from 'expo-av';


const NotificationMiddleware = () => {
    const dispatch = useDispatch();
    const socket = io(BACKEND_URL, {
        transports: ["websocket"],
        withCredentials: true,
    });

    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(fetchAllUnreadNotifications());
    }, [dispatch]);



    useEffect(() => {

        const playNotificationSound = async () => {
            try {
                const { sound } = await Audio.Sound.createAsync(require('../assets/sounds/notification-pop.mp3'));
                await sound.playAsync();
            } catch (error) {
                console.error("Failed to play the sound:", error);
            }
        };


        socket.on("connection", () => {
            console.log("Connected to Socket io");
        });

        socket.on("new_user_login", (data) => {
            console.log("test");
            topNotificationMsg(data.message);

        });

        socket.on(`notification/${user?._id}`, (data) => {
            topNotificationMsg(data.message);
            dispatch(fetchAllUnreadNotifications());
            dispatch(fetchAllNotifications({ page: 1 }));
            playNotificationSound();
        });

        socket.on(`notification`, (data) => {
            topNotificationMsg(data.message);
            playNotificationSound();
        });

    }, [socket]);



    return null;
}

export default NotificationMiddleware
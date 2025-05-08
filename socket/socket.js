import { io } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ENDPOINT = 'http://172.172.21.193:8080'; 
let socket = null;

export const connectSocket = async () => {
    try {
        const authData = await AsyncStorage.getItem('@auth');
        if (authData && !socket) {
            const { user } = JSON.parse(authData);
            const userId = user?._id;

            if (userId) {
                socket = io(ENDPOINT, {
                    transports: ['websocket'],
                    autoConnect: true,
                });

                socket.on('connect', () => {
                    console.log('✅ Socket connected:', socket.id);
                    socket.emit('join', userId); // Gửi userId để join room
                });

                socket.on('disconnect', () => {
                    console.log('❌ Socket disconnected');
                    socket = null;
                });

                socket.on('connect_error', (error) => {
                    console.error('Socket connect error:', error);
                    socket = null;
                });

                socket.on('error', (error) => {
                    console.error('Socket error:', error);
                });
            } else {
                console.log('⚠️ UserId not found in @auth during socket connection.');
            }
        }
    } catch (error) {
        console.error('Error connecting socket:', error);
    }
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};

export const getSocket = () => {
    return socket;
};
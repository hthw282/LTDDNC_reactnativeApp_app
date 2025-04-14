import { io } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ENDPOINT = 'http://172.172.13.2:8080'; // Thay thế bằng endpoint server của bạn
let socket = null;

export const connectSocket = async () => {
    try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId && !socket) {
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
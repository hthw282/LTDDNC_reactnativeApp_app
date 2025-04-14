import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getSocket, connectSocket, disconnectSocket } from '../../socket/socket';
import Layout from '../../components/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { addNotificationRealtime, getNotificationsByUser } from '../../redux/features/notificationActions';
import Toast from 'react-native-toast-message';

const Notifications = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { notifications } = useSelector((state) => state.notification);
    const socket = getSocket(); // Lấy socket instance

    useEffect(() => {
        connectSocket(); // Gọi connectSocket khi component mount

        if (user?._id) {
            dispatch(getNotificationsByUser(user._id));

            const handleNewNotification = (notification) => {
                dispatch(addNotificationRealtime(notification));

                Toast.show({
                    type: 'success',
                    text1: 'New Notification',
                    text2: notification.message,
                    position: 'top',
                    visibilityTime: 4000,
                });
            };

            if (socket) {
                socket.on('notification', handleNewNotification);

                return () => {
                    if (socket) {
                        socket.off('notification', handleNewNotification);
                        disconnectSocket(); // Ngắt kết nối khi component unmount
                    }
                };
            }
        }
    }, [dispatch, user]);

    return (
        <Layout>
            <View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10 }}>Notifications</Text>
                <FlatList
                    data={notifications}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <View style={{ padding: 10, borderBottomWidth: 1 }}>
                            <Text>{item.message}</Text>
                            <Text style={{ fontSize: 12, color: 'gray' }}>{item.createdAt}</Text>
                        </View>
                    )}
                    extraData={notifications} // Thêm extraData
                />
            </View>
        </Layout>
    );
};

export default Notifications;
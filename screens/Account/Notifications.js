import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getSocket, connectSocket, disconnectSocket } from '../../socket/socket';
import { useDispatch, useSelector } from 'react-redux';
import { addNotificationRealtime, getNotificationsByUser, markNotificationAsRead } from '../../redux/features/notificationActions';
import Toast from 'react-native-toast-message';
import { Card, Avatar, Badge } from 'react-native-paper';
import moment from 'moment';

const Notifications = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { notifications, loading, error } = useSelector((state) => state.notification);
    const socket = getSocket();
    const [refreshFlag, setRefreshFlag] = useState(false); // State để force re-render
     const [localNotifications, setLocalNotifications] = useState(notifications);

    useEffect(() => {
        if (!user?._id) return;

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

        connectSocket();
        socket?.on('new-notification', handleNewNotification);

        return () => {
            socket?.off('new-notification', handleNewNotification);
            disconnectSocket();
        };
    }, [user?._id, dispatch]);

      useEffect(() => {
        setLocalNotifications(notifications);
    }, [notifications]);

    const handleNotificationPress = (notificationId) => {
        dispatch(markNotificationAsRead(notificationId))
            .then(() => {
               const updatedNotifications = localNotifications.map(n =>
                    n._id === notificationId ? { ...n, isRead: true } : n
                );
                setLocalNotifications(updatedNotifications);
                setRefreshFlag(prev => !prev);
            });
    };

    // Function to render each notification item
      const renderNotificationItem = ({ item }) => {
        const isRead = item.isRead;

        return (
            <TouchableOpacity onPress={() => handleNotificationPress(item._id)}>
                <Card style={styles.notificationCard}>
                    <Card.Content style={styles.cardContent}>
                        <Avatar.Icon
                            icon="bell"
                            size={40}
                            color="#fff"
                            style={styles.avatar}
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.messageText}>{item.message}</Text>
                            <Text style={styles.createdAtText}>{moment(item.createdAt).fromNow()}</Text>
                            <Badge
                                visible={!isRead} // Use the local isRead
                                style={styles.unreadBadge}
                                size={8}
                            />
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading notifications...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    if (!localNotifications || localNotifications.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No notifications to display.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notifications</Text>
            <FlatList
                data={localNotifications}
                keyExtractor={(item) => item._id}
                renderItem={renderNotificationItem}
                extraData={refreshFlag} // Sử dụng cờ refresh
            />
            <Toast />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 15,
        color: '#2c3e50',
        textAlign: 'center'
    },
    notificationCard: {
        marginVertical: 8,
        elevation: 2,
        borderRadius: 12,
        backgroundColor: '#fff',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    avatar: {
        backgroundColor: '#3498db',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    messageText: {
        fontSize: 16,
        color: '#34495e',
        lineHeight: 22,
    },
    createdAtText: {
        fontSize: 12,
        color: '#7f8c8d',
        marginTop: 4,
    },
    unreadBadge: {
        backgroundColor: '#ff6b6b',
        position: 'absolute',
        top: 20,
        right: 10,
        borderRadius: 4,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 18,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#7f8c8d',
        textAlign: 'center',
    },
});

export default Notifications;


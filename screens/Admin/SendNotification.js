import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { sendNotificationToAll, sendNotificationToUser } from '../../redux/features/notificationActions';

const SendNotification = () => {
    const dispatch = useDispatch();
    const [notificationMessage, setNotificationMessage] = useState('');
    const [selectedUser, setSelectedUser] = useState('');

    const handleSendNotificationToUser = () => {
        if (notificationMessage && selectedUser) {
            const notificationData = {
                type: 'general',
                message: notificationMessage,
                data: {},
                receiver: selectedUser,
            };
            dispatch(sendNotificationToUser(notificationData));
            setNotificationMessage('');
            setSelectedUser('');
        } else {
            alert('Vui lòng nhập tin nhắn và chọn người nhận.');
        }
    };

    const handleSendNotificationToAll = () => {
        if (notificationMessage) {
            const notificationData = {
                type: 'general',
                message: notificationMessage,
                data: {},
            };
            dispatch(sendNotificationToAll(notificationData));
            setNotificationMessage('');
        } else {
            alert('Vui lòng nhập tin nhắn.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Send Notification</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Notification:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Input notification..."
                    value={notificationMessage}
                    onChangeText={setNotificationMessage}
                    multiline
                    numberOfLines={3}
                />

                <Text style={styles.label}>Send to (User ID):</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Input user ID (optional)"
                    value={selectedUser}
                    onChangeText={setSelectedUser}
                />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.sendButton} onPress={handleSendNotificationToUser}>
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sendToAllButton} onPress={handleSendNotificationToAll}>
                        <Text style={styles.sendButtonText}>Send To All</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 20,
    },
    heading: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#2c3e50',
    },
    inputContainer: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#34495e',
    },
    input: {
        height: 50,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
        fontSize: 16,
        backgroundColor: '#ffffff',
        color: '#2c3e50',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    sendButton: {
        backgroundColor: '#3498db',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
    },
    sendToAllButton: {
        backgroundColor: '#2ecc71',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        flex: 1,
        marginLeft: 10,
    },
    sendButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default SendNotification;

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Layout from '../../components/Layout/Layout';
import Header from '../../components/Layout/Header';
// import Footer from '../../components/Layout/Footer'; // Bạn có thể sử dụng Footer nếu muốn

const Dashboard = () => {
    const navigation = useNavigation();

    const handleGoToNotificationScreen = () => {
        navigation.navigate('sendNotification');
    };

    const handleManageProductsScreen = () => {
        // Navigate to manage products screen
    };

    const handleManageCategoriesScreen = () => {
        // Navigate to manage categories screen
    };

    const handleManageUsersScreen = () => {
        // Navigate to manage users screen
    };

    const handleManageOrdersScreen = () => {
        // Navigate to manage orders screen
    };

    const handleAppInfoScreen = () => {
        // Navigate to app info screen
    };

    return (
        <Layout>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
                <View style={styles.sectionContainer}>
                    <Text style={styles.heading}>Admin Dashboard</Text>
                    <TouchableOpacity style={styles.button} onPress={handleGoToNotificationScreen}>
                        <AntDesign name="bell" size={20} color="#3498db" style={styles.icon} />
                        <Text style={styles.buttonText}>Send Notification</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleManageProductsScreen}>
                        <AntDesign name="box" size={20} color="#3498db" style={styles.icon} />
                        <Text style={styles.buttonText}>Manage Products</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleManageCategoriesScreen}>
                        <AntDesign name="tags" size={20} color="#3498db" style={styles.icon} />
                        <Text style={styles.buttonText}>Manage Categories</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleManageUsersScreen}>
                        <AntDesign name="user" size={20} color="#3498db" style={styles.icon} />
                        <Text style={styles.buttonText}>Manage Users</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleManageOrdersScreen}>
                        <AntDesign name="bars" size={20} color="#3498db" style={styles.icon} />
                        <Text style={styles.buttonText}>Manage Orders</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleAppInfoScreen}>
                        <AntDesign name="info" size={20} color="#3498db" style={styles.icon} />
                        <Text style={styles.buttonText}>Application Information</Text>
                    </TouchableOpacity>
                    {/* Bạn có thể thêm các chức năng quản lý khác vào đây */}
                </View>
            </ScrollView>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 20,
    },
    sectionContainer: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        marginTop: 20, // Thêm margin top để tách biệt khỏi header
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 25,
        borderBottomWidth: 1,
        borderColor: '#e0e0e0',
        paddingBottom: 15,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 8,
        marginBottom: 15,
        backgroundColor: '#f0f0f0',
    },
    icon: {
        marginRight: 15,
        marginStart: 20,
        color: '#3498db',
    },
    buttonText: {
        fontSize: 18,
        color: '#2c3e50',
    },
});

export default Dashboard;
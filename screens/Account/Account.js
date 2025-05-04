import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../../redux/features/auth/userActions';
import Layout from '../../components/Layout/Layout';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

const Account = () => {
    const { user } = useSelector((state) => state.user);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await dispatch(logout());
            Alert.alert("Logout", "You have been successfully logged out.", [
                {
                    text: "OK",
                    onPress: () => {
                        navigation.replace("home");
                    },
                },
            ]);
            console.log("Logout successful");
        } catch (error) {
            console.error("Logout failed:", error);
            Alert.alert("Logout Error", "Something went wrong during logout.");
        }
    };

    return (
        <Layout>
            <Header /> {/* Thêm Header nếu bạn muốn */}
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}>
                {/* Nội dung hiện tại của trang Account */}
                <View style={styles.headerContainer}>
                    <Image
                        source={{ uri: user?.profilePic?.url || 'https://via.placeholder.com/100' }}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.userInfoContainer}>
                        <Text style={styles.name}>
                            Hi <Text style={styles.highlightedName}>{user ? user.name : 'User'}</Text> 👋
                        </Text>
                        <Text style={styles.email}>Email: {user ? user.email : 'N/A'}</Text>
                        <Text style={styles.contact}>Contact: {user ? user.phone : 'N/A'}</Text>
                    </View>
                </View>
    
                <View style={styles.sectionContainer}>
                    <Text style={styles.heading}>Account Settings</Text>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('profile', { id: user?._id })}>
                        <AntDesign name="edit" size={20} color="#3498db" style={styles.icon} />
                        <Text style={styles.buttonText}>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('my-orders', { id: user?._id })}>
                        <AntDesign name="bars" size={20} color="#3498db" style={styles.icon} />
                        <Text style={styles.buttonText}>My Orders</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('financial-summary', { id: user?._id })}>
                        <AntDesign name="bars" size={20} color="#3498db" style={styles.icon} />
                        <Text style={styles.buttonText}>Financial Summary</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('notifications')}>
                        <AntDesign name="bars" size={20} color="#3498db" style={styles.icon} />
                        <Text style={styles.buttonText}>Notifications</Text>
                    </TouchableOpacity>
                    {user?.role === 'admin' && (
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('admin-panel')}>
                            <AntDesign name="laptop" size={20} color="#3498db" style={styles.icon} />
                            <Text style={styles.buttonText}>Admin Panel</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <AntDesign name="logout" size={20} color="#fff" style={styles.icon} />
                        <Text style={styles.logoutButtonText}>Logout</Text>
                    </TouchableOpacity>
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
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 20,
        borderColor: '#e0e0e0',
        borderWidth: 2,
    },
    userInfoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 8,
    },
    highlightedName: {
        color: '#3498db',
    },
    email: {
        fontSize: 16,
        color: '#7f8c8d',
        marginBottom: 4,
    },
    contact: {
        fontSize: 16,
        color: '#7f8c8d',
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
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#e74c3c',
        marginTop: 20,
    },
    logoutButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default Account;
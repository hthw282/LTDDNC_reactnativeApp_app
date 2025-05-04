import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { sendCheckOTP, saveRegisterData } from '../../redux/features/auth/userActions';
import { useReduxStateHook } from '../../hooks/customeHook';

const ForgotPassword = ({ navigation }) => {
    const dispatch = useDispatch();
    const loading = useReduxStateHook(navigation, "resetPassword");
    const [email, setEmail] = useState('');

    const handleForgotPassword = () => {
        if (!email) {
            alert('Please fill in your email address.');
            return;
        }
        const formData = { email };
        dispatch(saveRegisterData(formData));
        dispatch(sendCheckOTP(email));
    };

    return (
        <ImageBackground
            source={require('../../assets/auth-background.png')}
            style={styles.backgroundImage}
        >
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={30} color="#fff" />
            </TouchableOpacity>
            <View style={styles.container}>
                <Image source={require('../../assets/logo.png')} style={styles.logo} />
                <Text style={styles.title}>Forgot Password</Text>
                <TextInput
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    autoComplete="email"
                    style={styles.input}
                    placeholderTextColor="#b0bec5"
                />
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.sendButton} onPress={handleForgotPassword} disabled={loading}>
                        <Text style={styles.sendButtonText}>{loading ? 'Sending...' : 'Send Reset Code'}</Text>
                    </TouchableOpacity>
                     <TouchableOpacity style={styles.backButtonBottom} onPress={() => navigation.goBack()}>
                        <Text style={styles.backButtonBottomText}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%',
    },
    logo: {
        height: 200,
        width: 180,
        resizeMode: 'contain',
        marginBottom: 30,
        marginTop: 50,
    },
    title: {
        color: '#CC3366',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 40,
        marginTop: 80,
    },
    input: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        marginBottom: 16,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        color: '#333',
    },
    btnContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    sendButton: {
        backgroundColor: '#2196f3',
        width: '80%',
        height: 50,
        borderRadius: 10,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    backButtonBottom: {
        marginTop: 20,
        alignSelf: 'center',
    },
    backButtonBottomText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    }
});

export default ForgotPassword;

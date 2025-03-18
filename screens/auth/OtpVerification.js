import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp, register, resetRegisterData } from '../../redux/features/auth/userActions';
import { useReduxStateHook } from '../../hooks/customeHook'

const OtpVerification = ({ navigation }) => {
    const dispatch = useDispatch();
    const loading = useReduxStateHook(navigation, "login")

    const registerData = useSelector((state) => state.user.registerData);
    const [otp, setOtp] = useState('');

    const handleVerifyOtp = () => {
        if (!otp) {
            Alert.alert("Error", "Please enter OTP");
            return;
        }
    
        dispatch(verifyOtp(registerData, otp));
        dispatch(resetRegisterData());
    };
    
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>OTP Verification</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                keyboardType="number-pad"
                value={otp}
                onChangeText={setOtp}
            />
            <TouchableOpacity style={styles.button} onPress={handleVerifyOtp} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Verifying...' : 'Verify'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#000',
        padding: 15,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }
});

export default OtpVerification;

import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp, resetRegisterData } from '../../redux/features/auth/userActions';
import { useReduxStateHook } from '../../hooks/customeHook';

const OtpVerification = ({ navigation }) => {
    const dispatch = useDispatch();
    const loading = useReduxStateHook(navigation, "login");
    const registerData = useSelector((state) => state.user.registerData);
    const [otp, setOtp] = useState('');

    const handleVerifyOtp = () => {
        if (!otp) {
            alert("Please enter OTP");
            return;
        }

        dispatch(verifyOtp(registerData, otp));
        dispatch(resetRegisterData());
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
                <Text style={styles.title}>OTP Verification</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter OTP"
                    keyboardType="number-pad"
                    value={otp}
                    onChangeText={setOtp}
                    placeholderTextColor="#b0bec5"
                />
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOtp} disabled={loading}>
                        <Text style={styles.verifyButtonText}>{loading ? 'Verifying...' : 'Verify'}</Text>
                    </TouchableOpacity>
                     <TouchableOpacity style={styles.backButtonBottom} onPress={() => navigation.navigate("home")}>
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
        marginBottom: 80,
        marginTop: 80,
    },
    title: {
        color: '#CC3366',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
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
    verifyButton: {
        backgroundColor: '#2196f3',
        width: '80%',
        height: 50,
        borderRadius: 10,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
    },
    verifyButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    errorText: {
        color: '#ff5252',
        marginTop: 10,
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

export default OtpVerification;

import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { sendOtp, saveRegisterData } from '../../redux/features/auth/userActions';
import { useReduxStateHook } from '../../hooks/customeHook';

const Register = ({ navigation }) => {
    const dispatch = useDispatch();
    const loading = useReduxStateHook(navigation, "otpVerification");

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [country] = useState('Vietnam');

    const handleRegister = () => {
        if (!email || !password || !name || !address || !city || !phone) {
            return Alert.alert('Error', 'Please fill all the fields');
        }

        const formData = { email, password, name, address, city, phone, country };

        // Lưu thông tin vào Redux trước khi gửi OTP
        dispatch(saveRegisterData(formData));

        // Gửi yêu cầu gửi OTP
        dispatch(sendOtp(formData));
    };

    return (
        <ImageBackground
            source={require('../../assets/register-background.png')}
            style={styles.backgroundImage}
        >
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={30} color="#fff" />
            </TouchableOpacity>
            <View style={styles.container}>
                <Image source={require('../../assets/logo.png')} style={styles.logo} />
                <Text style={styles.title}>Register</Text>
                <TextInput
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    autoComplete="email"
                    style={styles.input}
                    placeholderTextColor="#b0bec5"
                />
                <TextInput
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    style={styles.input}
                    placeholderTextColor="#b0bec5"
                />
                <TextInput
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                    autoComplete="name"
                    style={styles.input}
                    placeholderTextColor="#b0bec5"
                />
                <TextInput
                    placeholder="Enter your address"
                    value={address}
                    onChangeText={setAddress}
                    autoComplete="address-line1"
                    style={styles.input}
                    placeholderTextColor="#b0bec5"
                />
                <TextInput
                    placeholder="Enter your city"
                    value={city}
                    onChangeText={setCity}
                    autoComplete="country"
                    style={styles.input}
                    placeholderTextColor="#b0bec5"
                />
                <TextInput
                    placeholder="Enter your contact number"
                    value={phone}
                    onChangeText={setPhone}
                    autoComplete="tel"
                    style={styles.input}
                    placeholderTextColor="#b0bec5"
                />

                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.registerBtn} onPress={handleRegister} disabled={loading}>
                        <Text style={styles.registerBtnText}>{loading ? 'Processing...' : 'Register'}</Text>
                    </TouchableOpacity>
                    <Text style={styles.text}>
                        Have an account already?{" "}
                        <Text style={styles.link} onPress={() => navigation.navigate('login')}>
                            Login here
                        </Text>
                    </Text>
                </View>
                 <TouchableOpacity style={styles.backButtonBottom} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonBottomText}>Go Back</Text>
                </TouchableOpacity>
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
        justifyContent: 'center',
    },
    logo: {
        height: 150,
        width: 180,
        resizeMode: 'contain',
        marginBottom: 30,
        // marginTop: 50,
    },
    title: {
        color: '#CC3366',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        marginBottom: 12,
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
    registerBtn: {
        backgroundColor: '#2196f3',
        width: '80%',
        height: 50,
        borderRadius: 10,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
    },
    registerBtnText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    text: {
        color: '#003366',
        marginTop: 12,
        fontSize: 15,
    },
    link: {
        color: '#FF3399',
        fontWeight: 'bold',
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

export default Register;

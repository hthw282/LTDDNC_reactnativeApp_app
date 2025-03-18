import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import InputBox from '../../components/Form/InputBox';
import { useDispatch } from 'react-redux';
import { sendOtp, saveRegisterData } from '../../redux/features/auth/userActions';
import { useReduxStateHook } from '../../hooks/customeHook'

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
        <View style={styles.container}>
            <Image source={{ uri: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" }} style={styles.image} />
            <InputBox placeholder="Enter your email" value={email} setValue={setEmail} autoComplete="email" />
            <InputBox placeholder="Enter your password" value={password} setValue={setPassword} secureTextEntry={true} />
            <InputBox placeholder="Enter your name" value={name} setValue={setName} autoComplete="name" />
            <InputBox placeholder="Enter your address" value={address} setValue={setAddress} autoComplete="address-line1" />
            <InputBox placeholder="Enter your city" value={city} setValue={setCity} autoComplete="country" />
            <InputBox placeholder="Enter your contact number" value={phone} setValue={setPhone} autoComplete="tel" />

            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.loginBtn} onPress={handleRegister} disabled={loading}>
                    <Text style={styles.loginBtnText}>{loading ? 'Processing...' : 'Register'}</Text>
                </TouchableOpacity>
                <Text>
                    Have an account already? <Text style={styles.link} onPress={() => navigation.navigate('login')}>Login here</Text>
                </Text>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        height: '100%',
        paddingHorizontal: 20,
    },
    image: {
        height: 200,
        width: '100%',
        resizeMode: 'contain',
    },
    btnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginBtn: {
        backgroundColor: '#000',
        width: '80%',
        justifyContent: 'center',
        height: 40,
        borderRadius: 10,
        marginVertical: 20,
    },
    loginBtnText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 16,
        textTransform: 'uppercase',
    },
    link: {
        color: 'blue',
    },
});


export default Register;

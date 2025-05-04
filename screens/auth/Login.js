import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

//redux hooks
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/features/auth/userActions';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //hooks
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { loading, error, isAuth } = useSelector(state => state.user);

    useEffect(() => {
        if (isAuth) {
            navigation.replace("account");
        }
    }, [isAuth, navigation]);

    //login function
    const handleLogin = async () => {
        if (!email || !password) {
            alert('Please fill all fields');
            return;
        }
        try {
            const data = await dispatch(login(email, password));
            if (data) {
                navigation.replace('account');
            }
        } catch (error) {
            console.error("Login error:", error);
            alert(error.message);
        }
    }


    return (
        <ImageBackground
            source={require('../../assets/auth-background.png')}
            style={styles.backgroundImage}
        >
            <TouchableOpacity style={styles.backButtonTop} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={30} color="#fff" />
            </TouchableOpacity>
            <View style={styles.container}>
                <Image source={require('../../assets/logo.png')} style={styles.logo} />
                <Text style={styles.title}>Login</Text>
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
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} disabled={loading}>
                        <Text style={styles.loginBtnText}>{loading ? 'Loading...' : 'Login'}</Text>
                    </TouchableOpacity>
                    {error && <Text style={styles.errorText}>{error}</Text>}
                    <Text style={styles.text}>
                        Forgot your password?{" "}
                        <Text style={styles.link} onPress={() => navigation.navigate('forgotPassword')}>
                            Click here
                        </Text>
                    </Text>
                    <Text style={styles.text}>
                        Don't have an account?{" "}
                        <Text style={styles.link} onPress={() => navigation.navigate('register')}>
                            Register here
                        </Text>
                    </Text>
                </View>
                <TouchableOpacity style={styles.backButtonBottom} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonBottomText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    backButtonTop: {
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
        height: 200,
        width: 200,
        resizeMode: 'contain',
        marginBottom: 50,
        marginTop: 40,
    },
    title: {
        color: '#CC3366',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 30,
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
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    loginBtn: {
        backgroundColor: '#2196f3',
        width: '80%',
        height: 50,
        borderRadius: 10,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
    },
    loginBtnText: {
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

export default Login;
